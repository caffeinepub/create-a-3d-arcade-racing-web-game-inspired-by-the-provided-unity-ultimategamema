import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { DirectionalLight } from 'three';

interface LightingRigProps {
  timeOfDay: number;
}

export default function LightingRig({ timeOfDay }: LightingRigProps) {
  const sunRef = useRef<DirectionalLight>(null);

  useFrame(() => {
    if (sunRef.current) {
      const angle = (timeOfDay * 360 - 90) * (Math.PI / 180);
      sunRef.current.position.set(Math.cos(angle) * 50, Math.sin(angle) * 50, 0);
      sunRef.current.lookAt(0, 0, 0);

      const intensity = Math.max(0.2, Math.sin(timeOfDay * Math.PI * 2));
      sunRef.current.intensity = intensity * 2;
    }
  });

  const isNight = timeOfDay > 0.73 || timeOfDay < 0.27;
  const ambientIntensity = isNight ? 0.2 : 0.5;

  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        ref={sunRef}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
    </>
  );
}
