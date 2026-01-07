import { useMutation, useQueryClient } from '@tanstack/react-query';

import { bulkAutoAssignHousing, BulkAutoAssignHousingPayload } from '../../api/pilgrims';
import { queryKeys } from '../../shared/query-keys';

interface UseBulkAutoAssignHousingOptions {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useBulkAutoAssignHousing = (options?: UseBulkAutoAssignHousingOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError } = options || {};

  return useMutation({
    mutationFn: (payload: BulkAutoAssignHousingPayload) => bulkAutoAssignHousing(payload),
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
