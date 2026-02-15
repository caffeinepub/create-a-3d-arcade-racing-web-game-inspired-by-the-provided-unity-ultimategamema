import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { DAY_NIGHT_CONSTANTS } from './constants';

export function useDayNight(isPaused: boolean) {
  const timeOfDay = useRef(0.5);

  useFrame((state, delta) => {
    if (isPaused) return;
    timeOfDay.current = (timeOfDay.current + delta / DAY_NIGHT_CONSTANTS.DAY_DURATION) % 1;
  });

  const isNight = timeOfDay.current > 0.73 || timeOfDay.current < 0.27;

  return {
    timeOfDay: timeOfDay.current,
    isNight,
  };
}
