import type { Load } from '@/types/Load';
import type { FilterModel } from '@/types/Filter';
import type { GridSortRule } from '@/components/tables/TableGrid';

import getApiBaseUrl from '@/utils/getApiBaseUrl';

interface FetchApiLoadsParams {
  startRow: number;
  endRow: number;
  sortModel?: GridSortRule[];
  filterModel?: FilterModel;
  quickSearch?: string;
}

interface FetchApiLoadsResult {
  rows: Load[];
  lastRow: number;
  numTotal: number;
}

interface ApiErrorResponse {
  error?: { code?: string; message?: string };
}

interface ApiListResponse {
  rows: Load[];
  lastRow: number;
  meta: { numTotal: number };
}

// mirrors AG Grid's own IGetRowsParams shape, so it maps 1:1 onto the server-side row model
const fetchApiLoads = async ({
  startRow,
  endRow,
  sortModel,
  filterModel,
  quickSearch,
}: FetchApiLoadsParams): Promise<FetchApiLoadsResult> => {
  const url = new URL('/loads', getApiBaseUrl());

  url.searchParams.set('startRow', String(startRow));
  url.searchParams.set('endRow', String(endRow));

  if (sortModel?.length) {
    url.searchParams.set('sortModel', JSON.stringify(sortModel));
  }

  if (filterModel && Object.keys(filterModel).length > 0) {
    url.searchParams.set('filterModel', JSON.stringify(filterModel));
  }

  if (quickSearch) {
    url.searchParams.set('quickSearch', quickSearch);
  }

  const response = await fetch(url);

  if (!response.ok) {
    const body = await response.json().catch(() => null) as ApiErrorResponse | null;

    throw new Error(
      body?.error?.message ?? `Unable to load freight loads (${String(response.status)}).`,
    );
  }

  const payload = await response.json() as ApiListResponse;

  return {
    rows: payload.rows,
    lastRow: payload.lastRow,
    numTotal: payload.meta.numTotal,
  };
};

export default fetchApiLoads;
