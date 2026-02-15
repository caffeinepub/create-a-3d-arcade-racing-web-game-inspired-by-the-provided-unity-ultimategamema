import { useEffect, useState } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '../../hooks/useQueries';

export function useHighScore() {
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();
  const [localHighScore, setLocalHighScore] = useState(() => {
    const stored = localStorage.getItem('highScore');
    return stored ? parseInt(stored, 10) : 0;
  });

  const isAuthenticated = !!identity;
  const backendHighScore = userProfile?.highScore ? Number(userProfile.highScore) : 0;
  const highScore = isAuthenticated ? backendHighScore : localHighScore;

  const saveHighScore = async (score: number) => {
    if (score <= highScore) return;

    if (isAuthenticated && userProfile) {
      await saveProfile.mutateAsync({
        ...userProfile,
        highScore: BigInt(score),
      });
    } else {
      setLocalHighScore(score);
      localStorage.setItem('highScore', score.toString());
    }
  };

  return {
    highScore,
    saveHighScore,
  };
}
