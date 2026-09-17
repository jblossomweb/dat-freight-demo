import type { Load } from '@/types/Load';

import getApiBaseUrl from '@/utils/getApiBaseUrl';

interface ApiErrorResponse {
  error?: { code?: string; message?: string };
}

interface ApiLoadResponse {
  result: Load;
}

const fetchApiLoadById = async (id: string): Promise<Load> => {
  const url = new URL(`${getApiBaseUrl()}/load/${encodeURIComponent(id)}`);
  const response = await fetch(url);

  if (!response.ok) {
    const body = await response.json().catch(() => null) as ApiErrorResponse | null;

    throw new Error(
      body?.error?.message ?? `Unable to load freight load (${String(response.status)}).`,
    );
  }

  const payload = await response.json() as ApiLoadResponse;

  return payload.result;
};

export default fetchApiLoadById;
