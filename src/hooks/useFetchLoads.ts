import { useQuery } from '@tanstack/react-query';

import fetchLoads from '@/services/fetchLoads';

const useFetchLoads = () => {
  const query = useQuery({
    queryKey: ['loads'],
    queryFn: fetchLoads,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });

  return {
    loads: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
};

export default useFetchLoads;
