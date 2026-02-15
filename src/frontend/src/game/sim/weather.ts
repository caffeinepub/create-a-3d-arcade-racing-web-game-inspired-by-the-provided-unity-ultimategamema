import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function useWeather(isPaused: boolean) {
  const isRaining = useRef(false);
  const nextToggleTime = useRef(Math.random() * 30 + 10);

  useFrame((state) => {
    if (isPaused) return;

    if (state.clock.elapsedTime > nextToggleTime.current) {
      isRaining.current = !isRaining.current;
      nextToggleTime.current = state.clock.elapsedTime + Math.random() * 30 + 10;
    }
  });

  return {
    isRaining: isRaining.current,
  };
}
