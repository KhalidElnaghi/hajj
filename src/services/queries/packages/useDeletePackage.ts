'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deletePackage, DeletePackageResponse } from '../../api/packages';
import { queryKeys } from '../../shared/query-keys';

export const useDeletePackage = () => {
  const queryClient = useQueryClient();

  return useMutation<DeletePackageResponse, Error, number>({
    mutationFn: (id: number) => deletePackage(id),
    onSuccess: () => {
      // Invalidate and refetch packages list
      queryClient.invalidateQueries({ queryKey: queryKeys.packages.lists() });
    },
  });
};


