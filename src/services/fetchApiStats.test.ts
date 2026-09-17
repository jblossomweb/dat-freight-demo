import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import fetchApiStats from './fetchApiStats';

vi.mock('@/utils/getApiBaseUrl', () => ({
  default: () => 'https://api.example.com',
}));

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  fetchMock = vi.fn();
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('fetchApiStats', () => {
  it('serializes quick search and returns API statistics', async () => {
    const response = {
      requestURL: '/loads/stats?quickSearch=Salt+Lake',
      meta: {
        numTotal: 5,
        responseTimeMs: 12,
        timestamp: '2024-06-15T00:00:00Z',
      },
      stats: {
        totals: {
          equipmentType: [{ label: 'Van', value: 3 }],
          status: [{ label: 'Available', value: 5 }],
        },
      },
    };
    fetchMock.mockResolvedValue(new Response(JSON.stringify(response)));

    await expect(fetchApiStats({ quickSearch: 'Salt Lake' })).resolves.toEqual(response);

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock.mock.calls[0][0]).toEqual(
      new URL('https://api.example.com/loads/stats?quickSearch=Salt+Lake'),
    );
  });

  it('omits quick search when it is not provided', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({})));

    await fetchApiStats();

    expect(fetchMock.mock.calls[0][0]).toEqual(
      new URL('https://api.example.com/loads/stats'),
    );
  });

  it('throws when the API returns an error response', async () => {
    fetchMock.mockResolvedValue(new Response('', { status: 503 }));

    await expect(fetchApiStats()).rejects.toThrow(
      'Unable to load freight stats (503).',
    );
  });
});
