import { useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../../shared/functions/axios';
import { queryKeys } from '../../shared/query-keys';

export const useDeletePilgrim = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | number) => {
      return API.delete(`/pilgrims/pilgrims/${id}`);
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pilgrims.lists() });
      queryClient.removeQueries({ queryKey: queryKeys.pilgrims.detail(id) });
    },
  });
};
