import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { create } from 'zustand';

interface TimerState {
  raceTime: number;
  setRaceTime: (time: number) => void;
  resetTimer: () => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  raceTime: 0,
  setRaceTime: (time) => set({ raceTime: time }),
  resetTimer: () => set({ raceTime: 0 }),
}));

export function useRaceTimer(isPaused: boolean) {
  const { raceTime, setRaceTime } = useTimerStore();

  useFrame((state, delta) => {
    if (isPaused) return;
    setRaceTime(raceTime + delta);
  });

  return { raceTime };
}
