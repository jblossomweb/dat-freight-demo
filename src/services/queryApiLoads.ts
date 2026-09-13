import type { QueryClient } from '@tanstack/react-query';

import type { FilterModel } from '@/types/Filter';
import type { SortModel } from '@/types/Sort';

import getApiLoadsQueryKey from '@/utils/getApiLoadsQueryKey';
import fetchApiLoads from '@/services/fetchApiLoads';

interface QueryApiLoadsArgs {
  client: QueryClient,
  startRow: number,
  endRow: number,
  sortModel: SortModel,
  filterModel: FilterModel,
  quickSearch: string,
}

const queryApiLoads = ({
  client,
  startRow,
  endRow,
  sortModel,
  filterModel,
  quickSearch,
}: QueryApiLoadsArgs): ReturnType<typeof fetchApiLoads> => {

  const trimmedQuickSearch = quickSearch.trim();

  const query = client.query({
    queryKey: getApiLoadsQueryKey({
      startRow,
      endRow,
      sortModel,
      filterModel,
      quickSearch: trimmedQuickSearch,
    }),
    queryFn: () => fetchApiLoads({
      startRow,
      endRow,
      sortModel,
      filterModel,
      quickSearch: trimmedQuickSearch,
    }),
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // fail fast
  });

  return query;
};

export default queryApiLoads;
