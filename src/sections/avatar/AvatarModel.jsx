import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

/**
 * Loads and displays your GLB/GLTF avatar from /public/models/.
 * ------------------------------------------------------------------
 * To use your own model:
 *   1. Export a .glb from Blender / Spline (stylized 3D girl/woman).
 *   2. Save it as: public/models/avatar.glb
 *   3. That's it — this component loads MODEL_PATH automatically.
 *
 * If the file is missing or fails to load, <Avatar/> catches the error and
 * renders the procedural PlaceholderAvatar instead.
 * ------------------------------------------------------------------
 *
 * The whole model reacts to scroll: upright & forward-facing in the hero,
 * then leaning down toward a "desk" as `progressRef` goes 0 → 1.
 */
export const MODEL_PATH = '/models/avatar.glb';

export default function AvatarModel({ progressRef, reducedMotion }) {
  const { scene } = useGLTF(MODEL_PATH);
  const group = useRef();
  const t = useRef(0);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const p = progressRef?.current ?? 0;

    t.current += delta;
    const idleY = reducedMotion ? 0 : Math.sin(t.current * 0.5) * 0.12;
    const bob = reducedMotion ? 0 : Math.sin(t.current * 1.4) * 0.03;

    // Forward-facing hero → leaning "at desk" as user scrolls.
    const targetRotX = p * 0.5;
    const targetRotY = idleY;
    const targetPosY = -1 + bob - p * 0.4;

    g.rotation.x += (targetRotX - g.rotation.x) * 0.08;
    g.rotation.y += (targetRotY - g.rotation.y) * 0.08;
    g.position.y += (targetPosY - g.position.y) * 0.08;
  });

  return (
    <group ref={group} position={[0, -1, 0]} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

// Preload so the swap-in is instant once the file exists.
useGLTF.preload(MODEL_PATH);
