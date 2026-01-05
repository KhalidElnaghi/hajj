import { useQuery } from '@tanstack/react-query';
import { getPackages, GetPackagesParams } from '../../api/packages';
import { queryKeys } from '../../shared/query-keys';

export const useFetchPackages = (params: GetPackagesParams = {}) => {
  return useQuery({
    queryKey: queryKeys.packages.list(params),
    queryFn: () => getPackages(params),
    staleTime: 30_000,
  });
};

