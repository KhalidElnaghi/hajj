import { useQuery } from '@tanstack/react-query';
import { getPilgrimInitData } from '../../api/pilgrims';
import { queryKeys } from '../../shared/query-keys';

export const useFetchPilgrimInitData = () => {
  return useQuery({
    queryKey: queryKeys.pilgrims.initData(),
    queryFn: () => getPilgrimInitData(),
    staleTime: 5 * 60 * 1000, // 5 minutes - this data doesn't change often
  });
};

