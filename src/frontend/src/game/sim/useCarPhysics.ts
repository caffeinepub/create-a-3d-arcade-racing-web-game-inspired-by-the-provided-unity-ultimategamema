import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useKeyboardDrivingControls } from '../controls/useKeyboardDrivingControls';
import { useTiltSteering } from '../controls/useTiltSteering';
import { useNitro } from './useNitro';
import { useWeather } from './weather';
import { PHYSICS_CONSTANTS } from './constants';
import { useSelectedCar } from '../garage/useSelectedCar';

export function useCarPhysics(isPaused: boolean) {
  const position = useRef(new THREE.Vector3(0, 0.5, 0));
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const rotation = useRef(new THREE.Euler(0, 0, 0));
  const speed = useRef(0);
  const isDrifting = useRef(false);

  const { steerInput, brakeInput } = useKeyboardDrivingControls();
  const { tiltSteer } = useTiltSteering();
  const { isBoosting } = useNitro(isPaused);
  const { isRaining } = useWeather(isPaused);
  const { getSelectedCar } = useSelectedCar();

  const finalSteerInput = Math.abs(steerInput) > 0.01 ? steerInput : tiltSteer;

  useFrame((state, delta) => {
    if (isPaused) return;

    const car = getSelectedCar();
    const maxSpeed = car.baseSpeed * (isBoosting ? PHYSICS_CONSTANTS.BOOST_MULTIPLIER : 1);

    // Forward movement
    if (brakeInput) {
      speed.current = Math.max(0, speed.current - PHYSICS_CONSTANTS.BRAKE_DECELERATION * delta);
    } else {
      speed.current = THREE.MathUtils.lerp(speed.current, maxSpeed, delta * 2);
    }

    // Steering
    rotation.current.y += finalSteerInput * PHYSICS_CONSTANTS.STEER_SPEED * delta;

    // Drift detection
    isDrifting.current = Math.abs(finalSteerInput) > PHYSICS_CONSTANTS.DRIFT_THRESHOLD;

    // Apply velocity
    const forward = new THREE.Vector3(0, 0, 1).applyEuler(rotation.current);
    velocity.current.copy(forward.multiplyScalar(speed.current));

    // Apply grip/drift
    const gripFactor = isDrifting.current
      ? isRaining
        ? PHYSICS_CONSTANTS.DRIFT_GRIP_WET
        : PHYSICS_CONSTANTS.DRIFT_GRIP_DRY
      : PHYSICS_CONSTANTS.NORMAL_GRIP;

    const right = new THREE.Vector3(1, 0, 0).applyEuler(rotation.current);
    const lateralVelocity = right.multiplyScalar(velocity.current.dot(right));
    velocity.current.sub(lateralVelocity.multiplyScalar(1 - gripFactor));

    position.current.add(velocity.current.clone().multiplyScalar(delta));
  });

  return {
    playerPosition: position.current,
    playerRotation: rotation.current,
    isDrifting: isDrifting.current,
    speed: speed.current,
  };
}
