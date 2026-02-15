import { useEffect, useRef, useState } from 'react';

export function useTiltSteering() {
  const [enabled, setEnabled] = useState(false);
  const tiltSteer = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null) {
        tiltSteer.current = Math.max(-1, Math.min(1, e.gamma / 30));
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [enabled]);

  return {
    tiltSteer: enabled ? tiltSteer.current : 0,
    tiltEnabled: enabled,
    toggleTilt: () => setEnabled(!enabled),
  };
}
