import { usePickups } from '../../sim/usePickups';
import * as THREE from 'three';

interface PickupsProps {
  playerPosition: THREE.Vector3;
}

export default function Pickups({ playerPosition }: PickupsProps) {
  const { coins, nitroRefills } = usePickups(playerPosition);

  return (
    <>
      {coins.map((coin) => (
        <group key={coin.id} position={[coin.position.x, coin.position.y, coin.position.z]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
            <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} emissive="#ffd700" emissiveIntensity={0.5} />
          </mesh>
          <pointLight intensity={0.5} distance={3} color="#ffd700" />
        </group>
      ))}

      {nitroRefills.map((nitro) => (
        <group key={nitro.id} position={[nitro.position.x, nitro.position.y, nitro.position.z]}>
          <mesh>
            <boxGeometry args={[0.4, 0.6, 0.4]} />
            <meshStandardMaterial color="#00ffff" metalness={0.8} roughness={0.2} emissive="#00ffff" emissiveIntensity={0.8} />
          </mesh>
          <pointLight intensity={1} distance={5} color="#00ffff" />
        </group>
      ))}
    </>
  );
}
