import { useQuery } from '@tanstack/react-query';

import fetchApiStats from '@/services/fetchApiStats';

const useStatsApi = (search: string, enabled: boolean) => {
  const trimmedSearch = search.trim();

  const query = useQuery({
    queryKey: ['api-stats', trimmedSearch],
    queryFn: () => fetchApiStats({ quickSearch: trimmedSearch }),
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
