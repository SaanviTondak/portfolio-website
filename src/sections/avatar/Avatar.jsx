import { Component, Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';

import AvatarModel, { MODEL_PATH } from './AvatarModel';
import PlaceholderAvatar from './PlaceholderAvatar';

/* Small error boundary: if the GLB fails to load (e.g. file not added yet),
   fall back to the procedural placeholder avatar. */
class ModelBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/**
 * The 3D avatar scene. Lights include a soft pink rim light. Reacts to scroll
 * via `progressRef` (a ref holding 0→1 driven by the Hero's ScrollTrigger).
 *
 * Performance:
 *  - dpr is capped, and lowered further on small screens.
 *  - Under reduced motion we render a single static frame (frameloop="demand").
 */
export default function Avatar({ progressRef, reducedMotion = false }) {
  const [isSmall, setIsSmall] = useState(
    typeof window !== 'undefined' && window.innerWidth < 768
  );

  // Probe for the GLB before trying to load it. This keeps the console clean
  // when no model has been added yet (we just render the placeholder). The
  // ErrorBoundary below is a secondary safety net for a corrupt/invalid file.
  //  - null   = still checking
  //  - true   = file is present → load real model
  //  - false  = missing → use placeholder
  const [modelExists, setModelExists] = useState(null);

  useEffect(() => {
    let alive = true;
    fetch(MODEL_PATH, { method: 'HEAD' })
      .then((res) => {
        const ok =
          res.ok && !(res.headers.get('content-type') || '').includes('text/html');
        if (alive) setModelExists(ok);
      })
      .catch(() => alive && setModelExists(false));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const onResize = () => setIsSmall(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const fallback = (
    <PlaceholderAvatar progressRef={progressRef} reducedMotion={reducedMotion} />
  );

  // No GLB has been added yet — render nothing rather than the crude
  // procedural placeholder. Once /public/models/avatar.glb exists, this
  // swaps in automatically.
  if (modelExists !== true) return null;

  const inner = (
    <ModelBoundary fallback={fallback}>
      <AvatarModel progressRef={progressRef} reducedMotion={reducedMotion} />
    </ModelBoundary>
  );

  return (
    <Canvas
      className="avatar-canvas"
      camera={{ position: [0, 0.4, 5], fov: 38 }}
      dpr={isSmall ? [1, 1.2] : [1, 2]}
      frameloop={reducedMotion ? 'demand' : 'always'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      {/* Base ambient + key light */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={1.1} color="#fff4fb" />

      {/* Soft PINK rim light from behind for that cinematic edge glow */}
      <spotLight
        position={[-4, 2, -4]}
        angle={0.7}
        penumbra={1}
        intensity={2.4}
        color="#ff5fb0"
      />
      <pointLight position={[2, -1, 3]} intensity={0.8} color="#ff8fce" />

      <Suspense fallback={fallback}>
        {reducedMotion ? (
          inner
        ) : (
          <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.4}>
            {inner}
          </Float>
        )}
        <Environment preset="city" />
      </Suspense>

      {/* Grounding shadow */}
      <ContactShadows
        position={[0, -1.6, 0]}
        opacity={0.35}
        scale={8}
        blur={2.6}
        far={4}
        color="#ff5fb0"
      />
    </Canvas>
  );
}
