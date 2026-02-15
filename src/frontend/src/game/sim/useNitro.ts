import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboardDrivingControls } from '../controls/useKeyboardDrivingControls';
import { NITRO_CONSTANTS } from './constants';
import { create } from 'zustand';

interface NitroState {
  currentNitro: number;
  maxNitro: number;
  setNitro: (value: number) => void;
}

export const useNitroStore = create<NitroState>((set) => ({
  currentNitro: NITRO_CONSTANTS.MAX_NITRO,
  maxNitro: NITRO_CONSTANTS.MAX_NITRO,
  setNitro: (value) => set({ currentNitro: value }),
}));

export function useNitro(isPaused: boolean) {
  const { boostInput } = useKeyboardDrivingControls();
  const { currentNitro, maxNitro, setNitro } = useNitroStore();
  const isBoosting = useRef(false);

  useFrame((state, delta) => {
    if (isPaused) return;

    if (boostInput && currentNitro > 0) {
      isBoosting.current = true;
      setNitro(Math.max(0, currentNitro - NITRO_CONSTANTS.DEPLETION_RATE * delta));
    } else {
      isBoosting.current = false;
      if (currentNitro < maxNitro) {
        setNitro(Math.min(maxNitro, currentNitro + NITRO_CONSTANTS.REGENERATION_RATE * delta));
      }
    }
  });

  return {
    isBoosting: isBoosting.current,
    currentNitro,
    maxNitro,
    refillNitro: () => setNitro(maxNitro),
  };
}
