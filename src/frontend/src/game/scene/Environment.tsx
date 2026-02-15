import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function Environment() {
  const roadTexture = useTexture('/assets/generated/road-texture.dim_1024x1024.png');
  const skyTexture = useTexture('/assets/generated/sky-gradient.dim_2048x1024.png');

  roadTexture.wrapS = roadTexture.wrapT = THREE.RepeatWrapping;
  roadTexture.repeat.set(4, 50);

  return (
    <>
      {/* Sky backdrop */}
      <mesh position={[0, 0, -100]} scale={[200, 100, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={skyTexture} side={THREE.DoubleSide} />
      </mesh>

      {/* Road/Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 500]} />
        <meshStandardMaterial map={roadTexture} />
      </mesh>

      {/* Side barriers */}
      {[-10, 10].map((x, i) => (
        <mesh key={i} position={[x, 0.5, 0]}>
          <boxGeometry args={[0.5, 1, 500]} />
          <meshStandardMaterial color="#ff3333" />
        </mesh>
      ))}
    </>
  );
}
