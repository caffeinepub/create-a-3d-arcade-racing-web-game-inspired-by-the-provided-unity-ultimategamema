import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RainEffectProps {
  playerPosition: THREE.Vector3;
}

export default function RainEffect({ playerPosition }: RainEffectProps) {
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 1000;
  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = Math.random() * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 1] -= delta * 20;
      
      if (positions[i * 3 + 1] < 0) {
        positions[i * 3 + 1] = 20;
        positions[i * 3] = playerPosition.x + (Math.random() - 0.5) * 30;
        positions[i * 3 + 2] = playerPosition.z + (Math.random() - 0.5) * 30;
      }
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef} geometry={particleGeometry}>
      <pointsMaterial size={0.1} color="#aaccff" transparent opacity={0.6} />
    </points>
  );
}
