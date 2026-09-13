import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import queryApiLoads from '@/services/queryApiLoads';

const usePrefetchApiLoads = (search: string, shouldFetch = true) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(shouldFetch);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState<Error | undefined>();

  // initiate a pre-fetch with the same query key used by datasource.getRows
  useEffect(() => {
    if (!shouldFetch || isFetched) return;

    void queryApiLoads({
      client: queryClient,
      startRow: 0,
      endRow: 25,
      sortModel: [],
      filterModel: {},
      quickSearch: search,
    }).then(() => {
      setIsFetched(true);
      setIsLoading(false);
    }).catch(() => {
      setError(new Error('Failed to prefetch API loads.'));
      setIsLoading(false);
    });
  }, [queryClient, search, isFetched, shouldFetch]);

  return { isFetched, isLoading, error };
};

export default usePrefetchApiLoads;
