import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import type { PerspectiveCamera as PerspectiveCameraType } from 'three';
import * as THREE from 'three';

interface CameraRigProps {
  target: THREE.Vector3;
  isBoosting: boolean;
  isDrifting: boolean;
  isPaused: boolean;
}

export default function CameraRig({ target, isBoosting, isDrifting, isPaused }: CameraRigProps) {
  const cameraRef = useRef<PerspectiveCameraType>(null);
  const shakeOffset = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    if (!cameraRef.current || isPaused) return;

    const shakeIntensity = isBoosting ? 0.15 : isDrifting ? 0.05 : 0;
    
    if (shakeIntensity > 0) {
      shakeOffset.current.set(
        (Math.random() - 0.5) * shakeIntensity,
        (Math.random() - 0.5) * shakeIntensity,
        (Math.random() - 0.5) * shakeIntensity
      );
    } else {
      shakeOffset.current.lerp(new THREE.Vector3(0, 0, 0), delta * 5);
    }

    const idealOffset = new THREE.Vector3(0, 2.5, -6);
    const idealPosition = target.clone().add(idealOffset).add(shakeOffset.current);

    cameraRef.current.position.lerp(idealPosition, delta * 5);
    
    const lookAtTarget = target.clone().add(new THREE.Vector3(0, 0.5, 2));
    cameraRef.current.lookAt(lookAtTarget);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 2.5, -6]} fov={75} />;
}
