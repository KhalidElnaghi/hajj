import { useMutation, useQueryClient } from '@tanstack/react-query';

import { bulkAssignTags, BulkAssignTagsPayload } from '../../api/pilgrims';
import { queryKeys } from '../../shared/query-keys';

interface UseBulkAssignTagsOptions {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useBulkAssignTags = (options?: UseBulkAssignTagsOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError } = options || {};

  return useMutation({
    mutationFn: (payload: BulkAssignTagsPayload) => bulkAssignTags(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pilgrims.lists() });

      if (variables?.taggable_ids?.length) {
        variables.taggable_ids.forEach((id) => {
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
