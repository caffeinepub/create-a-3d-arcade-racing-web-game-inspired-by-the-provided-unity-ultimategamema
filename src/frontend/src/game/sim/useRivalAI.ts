import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function useRivalAI(isPaused: boolean) {
  const position = useRef(new THREE.Vector3(2, 0.5, 5));
  const rotation = useRef(new THREE.Euler(0, 0, 0));
  const speed = 68;

  useFrame((state, delta) => {
    if (isPaused) return;

    const time = state.clock.elapsedTime;
    const lateralOffset = Math.sin(time * 0.5) * 0.3;
    
    position.current.z += speed * delta;
    position.current.x = 2 + lateralOffset;
  });

  return {
    rivalPosition: position.current,
    rivalRotation: rotation.current,
  };
}
