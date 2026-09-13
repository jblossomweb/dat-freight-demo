import { useQuery } from '@tanstack/react-query';

import fetchApiStats from '@/services/fetchApiStats';

const useStatsApi = (enabled: boolean) => {
  const query = useQuery({
    queryKey: ['api-stats'],
    queryFn: fetchApiStats,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: false,
    enabled,
  });

  return {
    totals: query.data?.stats.totals,
    isLoading: enabled && query.isLoading,
    error: enabled ? query.error : null,
  };
};

export default useStatsApi;
