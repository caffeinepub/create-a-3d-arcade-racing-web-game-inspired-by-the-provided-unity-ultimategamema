import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { UserProfile } from '../backend';
import { unwrapOption, normalizeBigIntOption } from '../utils/candidOption';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const result = await actor.getCallerUserProfile();
      
      // Normalize the result to ensure consistent shape
      if (result === null || result === undefined) {
        return null;
      }
      
      // Ensure optional fields are properly unwrapped
      return {
        highScore: result.highScore,
        lastSelectedCarIndex: normalizeBigIntOption(result.lastSelectedCarIndex),
      };
    },
    enabled: !!actor && !actorFetching && !!identity,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      
      // Ensure optional fields are properly encoded for Candid
      const candidProfile: UserProfile = {
        highScore: profile.highScore,
        lastSelectedCarIndex: profile.lastSelectedCarIndex, // undefined is correct for opt-none
      };
      
      await actor.saveCallerUserProfile(candidProfile);
    },
    onSuccess: (_, profile) => {
      // Immediately update the cache with the saved profile
      queryClient.setQueryData(['currentUserProfile'], profile);
      // Also invalidate to ensure consistency
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}
