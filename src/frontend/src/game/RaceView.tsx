import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';
import { useGameState } from './state/gameState';
import RaceScene from './scene/RaceScene';
import HUD from './ui/HUD';
import PauseOverlay from './ui/PauseOverlay';
import StartOverlay from './ui/StartOverlay';
import FinishOverlay from './ui/FinishOverlay';
import ControlsHelp from './ui/ControlsHelp';

export default function RaceView() {
  const { gameStatus, pauseRace, resumeRace } = useGameState();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (gameStatus === 'running') {
          pauseRace();
        } else if (gameStatus === 'paused') {
          resumeRace();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStatus, pauseRace, resumeRace]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <Canvas shadows>
        <RaceScene />
      </Canvas>

      <HUD />
      <ControlsHelp />

      {gameStatus === 'ready' && <StartOverlay />}
      {gameStatus === 'paused' && <PauseOverlay />}
      {gameStatus === 'finished' && <FinishOverlay />}
    </div>
  );
}
