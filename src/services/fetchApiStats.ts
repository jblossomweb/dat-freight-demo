import type { ApiStatsResponse } from '@/types/Stats';

import getApiBaseUrl from '@/utils/getApiBaseUrl';

interface FetchApiStatsParams {
  quickSearch?: string;
}

const fetchApiStats = async (
  { quickSearch }: FetchApiStatsParams = {},
): Promise<ApiStatsResponse> => {
  const url = new URL(`${getApiBaseUrl()}/loads/stats`);

  if (quickSearch) {
    url.searchParams.set('quickSearch', quickSearch);
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Unable to load freight stats (${String(response.status)}).`);
  }

  return response.json() as Promise<ApiStatsResponse>;
};

export default fetchApiStats;
