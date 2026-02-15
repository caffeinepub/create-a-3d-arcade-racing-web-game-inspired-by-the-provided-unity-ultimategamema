import { useEffect, useRef } from 'react';

export function useKeyboardDrivingControls() {
  const keys = useRef({
    left: false,
    right: false,
    brake: false,
    boost: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.current.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.current.right = true;
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') keys.current.brake = true;
      if (e.key === ' ') keys.current.boost = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.current.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.current.right = false;
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') keys.current.brake = false;
      if (e.key === ' ') keys.current.boost = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const steerInput = keys.current.left ? -1 : keys.current.right ? 1 : 0;

  return {
    steerInput,
    brakeInput: keys.current.brake,
    boostInput: keys.current.boost,
  };
}
