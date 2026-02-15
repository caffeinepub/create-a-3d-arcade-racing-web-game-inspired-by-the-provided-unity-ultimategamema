import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameState } from '../state/gameState';
import { useCarPhysics } from '../sim/useCarPhysics';
import { useRivalAI } from '../sim/useRivalAI';
import { useDayNight } from '../sim/dayNight';
import { useWeather } from '../sim/weather';
import { useNitro } from '../sim/useNitro';
import { useScoring } from '../sim/scoring';
import { useRaceTimer } from '../sim/useRaceTimer';
import CameraRig from './CameraRig';
import CarModel from './CarModel';
import Environment from './Environment';
import LightingRig from './LightingRig';
import RainEffect from './effects/RainEffect';
import BoostTrails from './effects/BoostTrails';
import Pickups from './pickups/Pickups';
import { useSelectedCar } from '../garage/useSelectedCar';
import type { Group } from 'three';

export default function RaceScene() {
  const { gameStatus } = useGameState();
  const playerCarRef = useRef<Group>(null);
  const rivalCarRef = useRef<Group>(null);

  const { getSelectedCar } = useSelectedCar();
  const selectedCar = getSelectedCar();

  const isPaused = gameStatus === 'paused' || gameStatus === 'ready';

  const { playerPosition, playerRotation, isDrifting, speed } = useCarPhysics(isPaused);
  const { rivalPosition, rivalRotation } = useRivalAI(isPaused);
  const { timeOfDay, isNight } = useDayNight(isPaused);
  const { isRaining } = useWeather(isPaused);
  const { isBoosting } = useNitro(isPaused);

  useScoring(playerPosition, isPaused);
  useRaceTimer(isPaused);

  useFrame(() => {
    if (playerCarRef.current) {
      playerCarRef.current.position.set(playerPosition.x, playerPosition.y, playerPosition.z);
      playerCarRef.current.rotation.set(playerRotation.x, playerRotation.y, playerRotation.z);
    }
    if (rivalCarRef.current) {
      rivalCarRef.current.position.set(rivalPosition.x, rivalPosition.y, rivalPosition.z);
      rivalCarRef.current.rotation.set(rivalRotation.x, rivalRotation.y, rivalRotation.z);
    }
  });

  return (
    <>
      <CameraRig
        target={playerPosition}
        isBoosting={isBoosting}
        isDrifting={isDrifting}
        isPaused={isPaused}
      />
      <LightingRig timeOfDay={timeOfDay} />
      <Environment />

      <group ref={playerCarRef}>
        <CarModel car={selectedCar} showHeadlights={isNight} />
        {isBoosting && <BoostTrails />}
      </group>

      <group ref={rivalCarRef}>
        <CarModel
          car={{ id: 99, name: 'Rival', color: '#666666', accentColor: '#ff0000', baseSpeed: 70 }}
          showHeadlights={isNight}
        />
      </group>

      {isRaining && <RainEffect playerPosition={playerPosition} />}
      <Pickups playerPosition={playerPosition} />
    </>
  );
}
