import { useGameState } from '../state/gameState';
import { Button } from '../../components/ui/button';
import { Play } from 'lucide-react';

export default function StartOverlay() {
  const { startRace } = useGameState();

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="space-y-6 text-center">
        <h2 className="text-6xl font-bold text-white">READY TO RACE?</h2>
        <Button onClick={startRace} size="lg" className="gap-3 px-12 text-xl">
          <Play className="h-6 w-6" />
          START
        </Button>
      </div>
    </div>
  );
}
