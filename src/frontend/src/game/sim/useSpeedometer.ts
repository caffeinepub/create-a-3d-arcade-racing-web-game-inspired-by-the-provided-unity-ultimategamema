import { useCarPhysics } from './useCarPhysics';

export function useSpeedometer(isPaused: boolean) {
  const { speed } = useCarPhysics(isPaused);
  const speedKmh = Math.round(speed * 3.6);

  return { speedKmh };
}
