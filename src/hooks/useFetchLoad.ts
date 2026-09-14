import { useQuery, useQueryClient } from '@tanstack/react-query';

import type { Load } from '@/types/Load';
import type { DataSource } from '@/types/DataSource';
import fetchJsonLoadById from '@/services/fetchJsonLoadById';
import fetchApiLoadById from '@/services/fetchApiLoadById';

const useFetchLoad = (id: string, dataSource: DataSource) => {
  const queryClient = useQueryClient();
  const isJson = dataSource === 'json';

  return useQuery<Load>({
    queryKey: ['load', dataSource, id],
    queryFn: () => isJson ? fetchJsonLoadById(id) : fetchApiLoadById(id),
    enabled: Boolean(id) && Boolean(dataSource),
    placeholderData: isJson
      ? () => (
        queryClient
          .getQueryData<Load[]>(['json-loads'])
          ?.find(load => load.id === id)
      )
      : undefined,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export default useFetchLoad;
