import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPilgrim, CreatePilgrimData } from '../../api/pilgrims';
import { queryKeys } from '../../shared/query-keys';

interface UseCreatePilgrimOptions {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useCreatePilgrim = (options?: UseCreatePilgrimOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError } = options || {};

  return useMutation({
    mutationFn: async (data: CreatePilgrimData) => {
      return createPilgrim(data);
    },
    onSuccess: () => {
      // Invalidate and refetch pilgrims list
      queryClient.invalidateQueries({ queryKey: queryKeys.pilgrims.lists() });
      // Call custom onSuccess if provided
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      // Call custom onError if provided
      if (onError) {
        onError(error);
      }
    },
  });
};

