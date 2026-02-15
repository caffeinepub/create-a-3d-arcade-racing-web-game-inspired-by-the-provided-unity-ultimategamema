import * as THREE from 'three';

export function calculatePosition(playerZ: number, rivalZ: number): '1st' | '2nd' {
  return playerZ > rivalZ ? '1st' : '2nd';
}
