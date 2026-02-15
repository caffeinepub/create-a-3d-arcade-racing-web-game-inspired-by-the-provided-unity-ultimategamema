import { useGameState } from '../state/gameState';
import { Button } from '../../components/ui/button';
import { Play, RotateCcw, Home } from 'lucide-react';

export default function PauseOverlay() {
  const { resumeRace, restartRace, returnToGarage } = useGameState();

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="space-y-6 text-center">
        <h2 className="text-6xl font-bold text-white">PAUSED</h2>
        <div className="flex flex-col gap-3">
          <Button onClick={resumeRace} size="lg" className="gap-2 px-8">
            <Play className="h-5 w-5" />
            RESUME
          </Button>
          <Button onClick={restartRace} size="lg" variant="outline" className="gap-2 px-8">
            <RotateCcw className="h-5 w-5" />
            RESTART
          </Button>
          <Button onClick={returnToGarage} size="lg" variant="outline" className="gap-2 px-8">
            <Home className="h-5 w-5" />
            GARAGE
          </Button>
        </div>
      </div>
    </div>
  );
}
