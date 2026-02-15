import { useRef } from 'react';
import type { CarVariant } from '../garage/carLibrary';
import type { Mesh } from 'three';

interface CarModelProps {
  car: CarVariant;
  position?: [number, number, number];
  rotation?: [number, number, number];
  showHeadlights?: boolean;
}

export default function CarModel({ car, position, rotation, showHeadlights = false }: CarModelProps) {
  const bodyRef = useRef<Mesh>(null);

  return (
    <group position={position} rotation={rotation}>
      {/* Car Body */}
      <mesh ref={bodyRef} castShadow position={[0, 0.3, 0]}>
        <boxGeometry args={[1, 0.4, 2]} />
        <meshStandardMaterial color={car.color} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Car Cabin */}
      <mesh castShadow position={[0, 0.7, -0.2]}>
        <boxGeometry args={[0.8, 0.4, 0.8]} />
        <meshStandardMaterial color={car.color} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 0.7, 0.2]}>
        <boxGeometry args={[0.78, 0.38, 0.1]} />
        <meshStandardMaterial color="#88ccff" transparent opacity={0.3} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Wheels */}
      {[
        [-0.5, 0, 0.7],
        [0.5, 0, 0.7],
        [-0.5, 0, -0.7],
        [0.5, 0, -0.7],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.15, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}

      {/* Accent Stripes */}
      <mesh position={[0, 0.51, 0]}>
        <boxGeometry args={[0.3, 0.01, 1.8]} />
        <meshStandardMaterial color={car.accentColor} emissive={car.accentColor} emissiveIntensity={0.5} />
      </mesh>

      {/* Headlights */}
      {showHeadlights && (
        <>
          <pointLight position={[-0.3, 0.3, 1]} intensity={2} distance={10} color="#ffffff" />
          <pointLight position={[0.3, 0.3, 1]} intensity={2} distance={10} color="#ffffff" />
          <mesh position={[-0.3, 0.3, 1]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
          </mesh>
          <mesh position={[0.3, 0.3, 1]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
          </mesh>
        </>
      )}
    </group>
  );
}
