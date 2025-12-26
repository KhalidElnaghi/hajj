import { useQuery } from '@tanstack/react-query';
import { getPilgrims, GetPilgrimsParams } from '../../api/pilgrims';
import { queryKeys } from '../../shared/query-keys';

export const useFetchPilgrims = (params: GetPilgrimsParams = {}) => {
  return useQuery({
    queryKey: queryKeys.pilgrims.list(params),
    queryFn: () => getPilgrims(params),
    staleTime: 30_000,
  });
};

