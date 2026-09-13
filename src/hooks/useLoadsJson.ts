import { useQuery } from '@tanstack/react-query';

import fetchJsonLoads from '@/services/fetchJsonLoads';

const useLoadsJson = (enabled: boolean) => {
  const query = useQuery({
    queryKey: ['json-loads'],
    queryFn: fetchJsonLoads,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    enabled,
  });

  return {
    loads: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
};

export default useLoadsJson;
