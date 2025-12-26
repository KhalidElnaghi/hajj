import { useQuery } from '@tanstack/react-query';
import { getPilgrimDetails } from '../../api/pilgrims';
import { queryKeys } from '../../shared/query-keys';

export const useFetchPilgrimDetails = (id: string | number, enabled = true) => {
  return useQuery({
    queryKey: queryKeys.pilgrims.detail(id),
    queryFn: () => getPilgrimDetails(id),
    enabled: enabled && !!id,
    staleTime: 30_000, // 30 seconds
  });
};

