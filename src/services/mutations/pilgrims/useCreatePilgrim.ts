import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPilgrim, CreatePilgrimData } from '../../api/pilgrims';
import { queryKeys } from '../../shared/query-keys';

export const useCreatePilgrim = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePilgrimData) => {
      return createPilgrim(data);
    },
    onSuccess: () => {
      // Invalidate and refetch pilgrims list
      queryClient.invalidateQueries({ queryKey: queryKeys.pilgrims.lists() });
    },
  });
};

