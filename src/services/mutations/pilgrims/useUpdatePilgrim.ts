import { useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../../shared/functions/axios';
import { queryKeys } from '../../shared/query-keys';
import { Pilgrim } from '../../api/pilgrims';

export interface UpdatePilgrimData {
  // Add your update pilgrim data type fields here
  [key: string]: any;
}

export const useUpdatePilgrim = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string | number; data: UpdatePilgrimData }) => {
      return API.put<Pilgrim>(`/pilgrims/${id}`, data);
    },
    onSuccess: (_, variables) => {
      // Invalidate and refetch pilgrims list and specific pilgrim details
      queryClient.invalidateQueries({ queryKey: queryKeys.pilgrims.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.pilgrims.detail(variables.id) });
    },
  });
};

