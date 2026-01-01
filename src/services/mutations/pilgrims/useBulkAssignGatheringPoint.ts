import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  bulkAssignGatheringPoint,
  BulkAssignGatheringPointPayload,
} from '../../api/pilgrims';
import { queryKeys } from '../../shared/query-keys';

interface UseBulkAssignGatheringPointOptions {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useBulkAssignGatheringPoint = (options?: UseBulkAssignGatheringPointOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError } = options || {};

  return useMutation({
    mutationFn: (payload: BulkAssignGatheringPointPayload) =>
      bulkAssignGatheringPoint(payload),
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
