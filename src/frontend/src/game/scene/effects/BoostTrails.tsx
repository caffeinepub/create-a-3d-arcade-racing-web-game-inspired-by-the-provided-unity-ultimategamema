import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function BoostTrails() {
  const leftTrailRef = useRef<THREE.Mesh>(null);
  const rightTrailRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    [leftTrailRef, rightTrailRef].forEach((ref) => {
      if (ref.current && ref.current.material instanceof THREE.Material) {
        ref.current.material.opacity = 0.5 + Math.sin(time * 10) * 0.3;
      }
    });
  });

  return (
    <>
      <mesh ref={leftTrailRef} position={[-0.4, 0.1, -1]}>
        <coneGeometry args={[0.15, 0.8, 8]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.7} />
      </mesh>
      <mesh ref={rightTrailRef} position={[0.4, 0.1, -1]}>
        <coneGeometry args={[0.15, 0.8, 8]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.7} />
      </mesh>
      
      <pointLight position={[-0.4, 0.1, -1]} intensity={1} distance={3} color="#00ffff" />
      <pointLight position={[0.4, 0.1, -1]} intensity={1} distance={3} color="#00ffff" />
    </>
  );
}
