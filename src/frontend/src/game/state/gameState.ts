import { create } from 'zustand';

export type GameView = 'garage' | 'race';
export type GameStatus = 'ready' | 'running' | 'paused' | 'finished';

interface GameState {
  currentView: GameView;
  gameStatus: GameStatus;
  setView: (view: GameView) => void;
  setStatus: (status: GameStatus) => void;
  startRace: () => void;
  pauseRace: () => void;
  resumeRace: () => void;
  finishRace: () => void;
  restartRace: () => void;
  returnToGarage: () => void;
}

export const useGameState = create<GameState>((set) => ({
  currentView: 'garage',
  gameStatus: 'ready',
  setView: (view) => set({ currentView: view }),
  setStatus: (status) => set({ gameStatus: status }),
  startRace: () => set({ currentView: 'race', gameStatus: 'running' }),
  pauseRace: () => set({ gameStatus: 'paused' }),
  resumeRace: () => set({ gameStatus: 'running' }),
  finishRace: () => set({ gameStatus: 'finished' }),
  restartRace: () => set({ gameStatus: 'running' }),
  returnToGarage: () => set({ currentView: 'garage', gameStatus: 'ready' }),
}));
