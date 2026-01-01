import { useMutation, useQueryClient } from '@tanstack/react-query';

import { assignPilgrimSupervisors, AssignPilgrimSupervisorsPayload } from '../../api/pilgrims';
import { queryKeys } from '../../shared/query-keys';

interface UseAssignPilgrimSupervisorsOptions {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useAssignPilgrimSupervisors = (options?: UseAssignPilgrimSupervisorsOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError } = options || {};

  return useMutation({
    mutationFn: (payload: AssignPilgrimSupervisorsPayload) => assignPilgrimSupervisors(payload),
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
