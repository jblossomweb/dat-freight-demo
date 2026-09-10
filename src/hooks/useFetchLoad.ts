import { useQuery, useQueryClient } from '@tanstack/react-query';

import type { Load } from '@/types/Load';
import fetchLoadById from '@/services/fetchLoadById';

const useFetchLoad = (id: string) => {
  const queryClient = useQueryClient();

  return useQuery<Load>({
    queryKey: ['load', id],
    // Fetch the load by its ID using the fetchLoadById service
    queryFn: () => fetchLoadById(id),
    enabled: Boolean(id),
    // use cached data from the 'loads' query as placeholder data if it exists
    placeholderData: () => (
      queryClient
        .getQueryData<Load[]>(['loads'])
        ?.find(load => load.id === id)
    ),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export default useFetchLoad;
