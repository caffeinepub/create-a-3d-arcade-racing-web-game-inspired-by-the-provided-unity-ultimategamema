import { useCarPhysics } from '../sim/useCarPhysics';
import { useRivalAI } from '../sim/useRivalAI';
import { useScoringStore } from '../sim/scoring';
import { useTimerStore } from '../sim/useRaceTimer';
import { useNitroStore } from '../sim/useNitro';
import { useHighScore } from '../persistence/useHighScore';
import { calculatePosition } from '../sim/progress';
import { Progress } from '../../components/ui/progress';
import { useGameState } from '../state/gameState';
import LoginButton from '../../auth/LoginButton';

export default function HUD() {
  const { gameStatus } = useGameState();
  const { playerPosition, speed } = useCarPhysics(gameStatus === 'paused');
  const { rivalPosition } = useRivalAI(gameStatus === 'paused');
  const { score } = useScoringStore();
  const { raceTime } = useTimerStore();
  const { currentNitro, maxNitro } = useNitroStore();
  const { highScore } = useHighScore();

  const position = calculatePosition(playerPosition.z, rivalPosition.z);
  const speedKmh = Math.round(speed * 3.6);
  const minutes = Math.floor(raceTime / 60);
  const seconds = Math.floor(raceTime % 60);

  if (gameStatus === 'ready') return null;

  return (
    <>
      {/* Top HUD */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 z-10 p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3 rounded-lg bg-black/60 px-4 py-2 backdrop-blur-sm">
              <img src="/assets/generated/coin-icon.dim_256x256.png" alt="Score" className="h-6 w-6" />
              <span className="text-2xl font-bold text-white">{score}</span>
            </div>
            <div className="rounded-lg bg-black/60 px-4 py-2 backdrop-blur-sm">
              <div className="text-xs text-gray-400">HIGH SCORE</div>
              <div className="text-xl font-bold text-yellow-400">{highScore}</div>
            </div>
          </div>

          <div className="pointer-events-auto">
            <LoginButton />
          </div>

          <div className="space-y-2 text-right">
            <div className="rounded-lg bg-black/60 px-4 py-2 backdrop-blur-sm">
              <div className="text-xs text-gray-400">POSITION</div>
              <div className="text-3xl font-bold text-white">{position}</div>
            </div>
            <div className="rounded-lg bg-black/60 px-4 py-2 backdrop-blur-sm">
              <div className="text-xs text-gray-400">TIME</div>
              <div className="font-mono text-xl font-bold text-white">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom HUD */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 p-6">
        <div className="mx-auto max-w-md space-y-3">
          <div className="rounded-lg bg-black/60 px-6 py-3 text-center backdrop-blur-sm">
            <div className="text-sm text-gray-400">SPEED</div>
            <div className="text-4xl font-bold text-white">{speedKmh} <span className="text-2xl">KM/H</span></div>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-black/60 px-6 py-3 backdrop-blur-sm">
            <img src="/assets/generated/nitro-icon.dim_256x256.png" alt="Nitro" className="h-8 w-8" />
            <div className="flex-1">
              <div className="mb-1 text-xs text-gray-400">NITRO</div>
              <Progress value={(currentNitro / maxNitro) * 100} className="h-3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
