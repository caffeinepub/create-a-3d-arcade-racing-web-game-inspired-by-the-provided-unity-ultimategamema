import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScoringStore } from './scoring';
import { useNitro } from './useNitro';
import { SCORING_CONSTANTS } from './constants';

interface Pickup {
  id: string;
  position: THREE.Vector3;
  collected: boolean;
}

export function usePickups(playerPosition: THREE.Vector3) {
  const { addScore } = useScoringStore();
  const { refillNitro } = useNitro(false);

  const coins = useRef<Pickup[]>(
    Array.from({ length: 20 }, (_, i) => ({
      id: `coin-${i}`,
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        0.5,
        i * 10 + 10
      ),
      collected: false,
    }))
  );

  const nitroRefills = useRef<Pickup[]>(
    Array.from({ length: 5 }, (_, i) => ({
      id: `nitro-${i}`,
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        0.5,
        i * 40 + 30
      ),
      collected: false,
    }))
  );

  useFrame(() => {
    coins.current.forEach((coin) => {
      if (!coin.collected && playerPosition.distanceTo(coin.position) < 1) {
        coin.collected = true;
        addScore(SCORING_CONSTANTS.COIN_VALUE);
      }
    });

    nitroRefills.current.forEach((nitro) => {
      if (!nitro.collected && playerPosition.distanceTo(nitro.position) < 1) {
        nitro.collected = true;
        refillNitro();
      }
    });
  });

  const visibleCoins = useMemo(
    () => coins.current.filter((c) => !c.collected),
    [coins.current.filter((c) => !c.collected).length]
  );

  const visibleNitroRefills = useMemo(
    () => nitroRefills.current.filter((n) => !n.collected),
    [nitroRefills.current.filter((n) => !n.collected).length]
  );

  return {
    coins: visibleCoins,
    nitroRefills: visibleNitroRefills,
  };
}
