import { useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../../shared/functions/axios';
import { queryKeys } from '../../shared/query-keys';
import { Pilgrim } from '../../api/pilgrims';

export interface CreatePilgrimData {
  // Add your create pilgrim data type fields here
  [key: string]: any;
}

export const useCreatePilgrim = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePilgrimData) => {
      return API.post<Pilgrim>('/pilgrims', data);
    },
    onSuccess: () => {
      // Invalidate and refetch pilgrims list
      queryClient.invalidateQueries({ queryKey: queryKeys.pilgrims.lists() });
    },
  });
};

