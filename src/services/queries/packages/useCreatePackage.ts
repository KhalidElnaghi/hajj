import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPackage, CreatePackagePayload, CreatePackageResponse } from '../../api/packages';
import { queryKeys } from '../../shared/query-keys';

interface UseCreatePackageOptions {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useCreatePackage = (options?: UseCreatePackageOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError } = options || {};

  return useMutation<CreatePackageResponse, any, CreatePackagePayload>({
    mutationFn: async (data: CreatePackagePayload) => {
      return createPackage(data);
    },
    onSuccess: () => {
      // Invalidate and refetch packages list
      queryClient.invalidateQueries({ queryKey: queryKeys.packages.lists() });

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error);
      }
    },
  });
};


