import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * Procedural stand-in avatar built from primitives — a friendly stylized
 * figure. Shown when no /public/models/avatar.glb is present so the scene
 * never looks broken. Swap in your own model to replace it (see README).
 *
 * It gently idles (breathing bob) and leans forward toward a "desk" as the
 * scroll progress approaches 1.
 */
export default function PlaceholderAvatar({ progressRef, reducedMotion }) {
  const group = useRef();
  const t = useRef(0);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const p = progressRef?.current ?? 0;

    // Idle breathing bob (skipped for reduced motion).
    t.current += delta;
    const bob = reducedMotion ? 0 : Math.sin(t.current * 1.4) * 0.03;

    // Hero (p≈0): faces forward, upright.
    // Scrolled (p≈1): leans forward + down as if working at a desk.
    const targetRotX = p * 0.5;
    const targetPosY = -0.2 + bob - p * 0.35;
    const targetRotY = reducedMotion ? 0 : Math.sin(t.current * 0.5) * 0.15;

    g.rotation.x += (targetRotX - g.rotation.x) * 0.08;
    g.rotation.y += (targetRotY - g.rotation.y) * 0.08;
    g.position.y += (targetPosY - g.position.y) * 0.08;
  });

  const skin = '#f4c9b0';
  const hair = '#2b2130';
  const lips = '#c65b7a';
  const blush = '#ff9ec7';
  const outfit = '#ff8fce';
  const outfitDark = '#c65b93';

  return (
    <group ref={group} position={[0, -0.35, 0]}>
    <group scale={0.82}>
      {/* Long hair falling down the back (sits behind everything else) */}
      <mesh position={[0, 0.95, -0.14]} castShadow>
        <capsuleGeometry args={[0.48, 0.7, 8, 16]} />
        <meshStandardMaterial color={hair} roughness={0.65} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.06, 0]}>
        <cylinderGeometry args={[0.13, 0.15, 0.22, 20]} />
        <meshStandardMaterial color={skin} roughness={0.55} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.42, 0]} castShadow>
        <sphereGeometry args={[0.46, 48, 48]} />
        <meshStandardMaterial color={skin} roughness={0.55} />
      </mesh>

      {/* Hair cap + fringe */}
      <mesh position={[0, 1.46, -0.02]}>
        <sphereGeometry args={[0.5, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
        <meshStandardMaterial color={hair} roughness={0.65} />
      </mesh>

      {/* Hair strands framing the face, flowing past the shoulders */}
      <mesh position={[-0.4, 1.0, 0.06]} rotation={[0, 0, 0.14]}>
        <capsuleGeometry args={[0.1, 0.75, 8, 16]} />
        <meshStandardMaterial color={hair} roughness={0.65} />
      </mesh>
      <mesh position={[0.4, 1.0, 0.06]} rotation={[0, 0, -0.14]}>
        <capsuleGeometry args={[0.1, 0.75, 8, 16]} />
        <meshStandardMaterial color={hair} roughness={0.65} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.16, 1.44, 0.4]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#20141c" roughness={0.3} />
      </mesh>
      <mesh position={[0.16, 1.44, 0.4]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#20141c" roughness={0.3} />
      </mesh>

      {/* Blush */}
      <mesh position={[-0.27, 1.36, 0.36]} scale={[1, 0.7, 0.4]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color={blush} roughness={0.8} transparent opacity={0.55} />
      </mesh>
      <mesh position={[0.27, 1.36, 0.36]} scale={[1, 0.7, 0.4]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color={blush} roughness={0.8} transparent opacity={0.55} />
      </mesh>

      {/* Lips */}
      <mesh position={[0, 1.25, 0.44]} scale={[0.7, 0.4, 0.4]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color={lips} roughness={0.4} />
      </mesh>

      {/* Torso / chest */}
      <mesh position={[0, 0.76, 0]}>
        <capsuleGeometry args={[0.3, 0.35, 12, 24]} />
        <meshStandardMaterial color={outfit} roughness={0.5} />
      </mesh>

      {/* Flared dress skirt (defines the waist + silhouette) */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.28, 0.62, 0.9, 32]} />
        <meshStandardMaterial color={outfitDark} roughness={0.55} />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.46, 0.5, 0.02]} rotation={[0, 0, 0.28]}>
        <capsuleGeometry args={[0.085, 0.55, 8, 16]} />
        <meshStandardMaterial color={skin} roughness={0.55} />
      </mesh>
      <mesh position={[0.46, 0.5, 0.02]} rotation={[0, 0, -0.28]}>
        <capsuleGeometry args={[0.085, 0.55, 8, 16]} />
        <meshStandardMaterial color={skin} roughness={0.55} />
      </mesh>

      {/* Hands */}
      <mesh position={[-0.58, 0.06, 0.02]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={skin} roughness={0.55} />
      </mesh>
      <mesh position={[0.58, 0.06, 0.02]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={skin} roughness={0.55} />
      </mesh>
    </group>
    </group>
  );
}
