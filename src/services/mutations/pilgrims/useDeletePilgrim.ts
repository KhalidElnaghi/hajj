import { useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../../shared/functions/axios';
import { queryKeys } from '../../shared/query-keys';

export const useDeletePilgrim = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | number) => {
      return API.delete(`/pilgrims/${id}`);
    },
    onSuccess: () => {
      // Invalidate and refetch pilgrims list
      queryClient.invalidateQueries({ queryKey: queryKeys.pilgrims.lists() });
    },
  });
};

