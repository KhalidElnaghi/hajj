import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updatePackage, UpdatePackagePayload, CreatePackageResponse } from '../../api/packages';
import { queryKeys } from '../../shared/query-keys';

export const useUpdatePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdatePackagePayload }) => {
      return updatePackage(id, data);
    },
    onSuccess: (_, variables) => {
      // Invalidate and refetch packages list and specific package details
      queryClient.invalidateQueries({ queryKey: queryKeys.packages.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.packages.detail(variables.id) });
    },
  });
};


