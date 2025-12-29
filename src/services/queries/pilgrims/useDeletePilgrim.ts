'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePilgrim, DeletePilgrimResponse } from '../../api/pilgrims';

export const useDeletePilgrim = () => {
  const queryClient = useQueryClient();

  return useMutation<DeletePilgrimResponse, Error, number>({
    mutationFn: (id: number) => deletePilgrim(id),
    onSuccess: () => {
      // Invalidate and refetch pilgrims list
      queryClient.invalidateQueries({ queryKey: ['pilgrims'] });
    },
  });
};
