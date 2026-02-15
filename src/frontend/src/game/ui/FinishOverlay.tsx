import { useEffect, useState } from 'react';
import { useGameState } from '../state/gameState';
import { useScoringStore } from '../sim/scoring';
import { useTimerStore } from '../sim/useRaceTimer';
import { useNitroStore } from '../sim/useNitro';
import { useHighScore } from '../persistence/useHighScore';
import { Button } from '../../components/ui/button';
import { RotateCcw, Home, Trophy } from 'lucide-react';

export default function FinishOverlay() {
  const { restartRace, returnToGarage } = useGameState();
  const { score, resetScore } = useScoringStore();
  const { raceTime, resetTimer } = useTimerStore();
  const { setNitro } = useNitroStore();
  const { highScore, saveHighScore } = useHighScore();
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  useEffect(() => {
    if (score > highScore) {
      setIsNewHighScore(true);
      saveHighScore(score);
    }
  }, [score, highScore, saveHighScore]);

  const handleRestart = () => {
    resetScore();
    resetTimer();
    setNitro(100);
    restartRace();
  };

  const handleGarage = () => {
    resetScore();
    resetTimer();
    setNitro(100);
    returnToGarage();
  };

  const minutes = Math.floor(raceTime / 60);
  const seconds = Math.floor(raceTime % 60);

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div className="space-y-8 text-center">
        <div className="space-y-2">
          <h2 className="text-7xl font-bold text-white">RACE COMPLETE!</h2>
          {isNewHighScore && (
            <div className="flex items-center justify-center gap-2 text-3xl font-bold text-yellow-400">
              <Trophy className="h-8 w-8" />
              NEW HIGH SCORE!
            </div>
          )}
        </div>

        <div className="space-y-4 rounded-lg bg-white/10 p-8 backdrop-blur-sm">
          <div>
            <div className="text-sm text-gray-400">FINAL SCORE</div>
            <div className="text-5xl font-bold text-white">{score}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">TIME</div>
            <div className="font-mono text-3xl font-bold text-white">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400">HIGH SCORE</div>
            <div className="text-3xl font-bold text-yellow-400">{highScore}</div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={handleRestart} size="lg" className="gap-2 px-8">
            <RotateCcw className="h-5 w-5" />
            RACE AGAIN
          </Button>
          <Button onClick={handleGarage} size="lg" variant="outline" className="gap-2 px-8">
            <Home className="h-5 w-5" />
            GARAGE
          </Button>
        </div>
      </div>
    </div>
  );
}
