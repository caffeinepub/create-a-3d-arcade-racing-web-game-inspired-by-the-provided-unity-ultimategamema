import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { create } from 'zustand';
import { SCORING_CONSTANTS } from './constants';
import { useGameState } from '../state/gameState';

interface ScoringState {
  score: number;
  addScore: (points: number) => void;
  resetScore: () => void;
}

export const useScoringStore = create<ScoringState>((set) => ({
  score: 0,
  addScore: (points) => set((state) => ({ score: state.score + points })),
  resetScore: () => set({ score: 0 }),
}));

export function useScoring(playerPosition: THREE.Vector3, isPaused: boolean) {
  const hasFinished = useRef(false);
  const { finishRace } = useGameState();

  useFrame(() => {
    if (isPaused || hasFinished.current) return;

    if (playerPosition.z >= SCORING_CONSTANTS.FINISH_LINE_DISTANCE) {
      hasFinished.current = true;
      finishRace();
    }
  });

  useEffect(() => {
    return () => {
      hasFinished.current = false;
    };
  }, []);
}
