'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateDepartureStatus, UpdateDepartureStatusPayload } from '../../api/pilgrims';
import { queryKeys } from '../../shared/query-keys';

interface UseUpdateDepartureStatusOptions {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useUpdateDepartureStatus = (options?: UseUpdateDepartureStatusOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError } = options || {};

  return useMutation({
    mutationFn: (payload: UpdateDepartureStatusPayload) => updateDepartureStatus(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pilgrims.lists() });

      if (variables?.pilgrim_ids?.length) {
        variables.pilgrim_ids.forEach((id) => {
          queryClient.invalidateQueries({ queryKey: queryKeys.pilgrims.detail(id) });
        });
      }

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
