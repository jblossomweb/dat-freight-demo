import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { Load } from '@/types/Load';

import fetchApiLoads from './fetchApiLoads';

vi.mock('@/utils/getApiBaseUrl', () => ({
  default: () => 'https://api.example.com',
}));

const load: Load = {
  id: 'LD-001',
  companyName: 'Swift Transport',
  origin: 'Salt Lake City, UT',
  destination: 'Denver, CO',
  weight: 42000,
  equipmentType: 'Van',
  date: '2024-06-15',
  price: 2850,
  distance: 525,
  status: 'Available',
};

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  fetchMock = vi.fn();
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('fetchApiLoads', () => {
  it('serializes load request parameters and returns the API response shape', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({
      rows: [load],
      lastRow: 100,
      meta: { numTotal: 100 },
    })));

    await expect(fetchApiLoads({
      startRow: 25,
      endRow: 50,
      sortModel: [{ colId: 'date', sort: 'desc' }],
      filterModel: {
        status: { filterType: 'text', type: 'equals', filter: 'Available' },
      },
      quickSearch: 'Salt Lake',
    })).resolves.toEqual({ rows: [load], lastRow: 100, numTotal: 100 });

    expect(fetchMock).toHaveBeenCalledOnce();
    const requestUrl = fetchMock.mock.calls[0][0] as URL;
    expect(requestUrl.href).toBe('https://api.example.com/loads?startRow=25&endRow=50&sortModel=%5B%7B%22colId%22%3A%22date%22%2C%22sort%22%3A%22desc%22%7D%5D&filterModel=%7B%22status%22%3A%7B%22filterType%22%3A%22text%22%2C%22type%22%3A%22equals%22%2C%22filter%22%3A%22Available%22%7D%7D&quickSearch=Salt+Lake');
  });

  it('omits empty optional parameters', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({
      rows: [],
      lastRow: 0,
      meta: { numTotal: 0 },
    })));

    await fetchApiLoads({
      startRow: 0,
      endRow: 25,
      sortModel: [],
      filterModel: {},
      quickSearch: '',
    });

    const requestUrl = fetchMock.mock.calls[0][0] as URL;
    expect(requestUrl.href).toBe('https://api.example.com/loads?startRow=0&endRow=25');
  });

  it('uses an API error message when one is provided', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({
      error: { message: 'Invalid filter model.' },
    }), { status: 400 }));

    await expect(fetchApiLoads({ startRow: 0, endRow: 25 })).rejects.toThrow(
      'Invalid filter model.',
    );
  });

  it('falls back to the response status when no API error message is provided', async () => {
    fetchMock.mockResolvedValue(new Response('', { status: 502 }));

    await expect(fetchApiLoads({ startRow: 0, endRow: 25 })).rejects.toThrow(
      'Unable to load freight loads (502).',
    );
  });
});
