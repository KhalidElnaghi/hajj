import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePilgrim, UpdatePilgrimData } from '../../api/pilgrims';
import { queryKeys } from '../../shared/query-keys';

export const useUpdatePilgrim = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string | number; data: UpdatePilgrimData }) => {
      return updatePilgrim(id, data);
    },
    onSuccess: (_, variables) => {
      // Invalidate and refetch pilgrims list and specific pilgrim details
      queryClient.invalidateQueries({ queryKey: queryKeys.pilgrims.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.pilgrims.detail(variables.id) });
    },
  });
};
