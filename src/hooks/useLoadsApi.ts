import type { IDatasource, IGetRowsParams } from 'ag-grid-community';
import type { Load } from '@/types/Load';
import type { FilterModel } from '@/types/Filter';

import { useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import queryApiLoads from '@/services/queryApiLoads';

interface UseLoadsApiReturn {
  datasource: IDatasource;
  isLoading: boolean;
  error?: Error | null;
  totalRowCount: number;
}

// new `search` value produces a new datasource, which AG Grid detects and re-fetches from row 0
const useLoadsApi = (
  search: string,
): UseLoadsApiReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [lastSearch, setLastSearch] = useState(search);
  const queryClient = useQueryClient();

  // clear the previous search's stale total immediately, before the new fetch resolves
  if (search !== lastSearch) {
    setLastSearch(search);
    setTotalRowCount(0);
    setError(null);
  }

  const datasource = useMemo<IDatasource>(() => ({
    getRows: (params: IGetRowsParams<Load>) => {
      setIsLoading(true);
      const { startRow, endRow, sortModel } = params;
      const filterModel = params.filterModel as FilterModel;

      queryApiLoads({
        client: queryClient,
        startRow,
        endRow,
        sortModel,
        filterModel,
        quickSearch: search,
      })
        .then(({ rows, lastRow, numTotal }) => {
          setError(null);
          setTotalRowCount(numTotal);
          params.successCallback(rows, lastRow);
        })
        .catch((error: unknown) => {
          setError(error instanceof Error ? error : new Error('Unable to load freight loads.'));
          params.failCallback();
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  }), [search, setTotalRowCount, setError, queryClient]);

  return { datasource, error, isLoading, totalRowCount };
};

export default useLoadsApi;
