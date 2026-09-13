import type { ApiStatsResponse } from '@/types/Stats';

import getApiBaseUrl from '@/utils/getApiBaseUrl';

const fetchApiStats = async (): Promise<ApiStatsResponse> => {
  const url = new URL('/loads/stats', getApiBaseUrl());
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Unable to load freight stats (${String(response.status)}).`);
  }

  return response.json() as Promise<ApiStatsResponse>;
};

export default fetchApiStats;
