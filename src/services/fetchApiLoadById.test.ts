import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { Load } from '@/types/Load';

import fetchApiLoadById from './fetchApiLoadById';

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

describe('fetchApiLoadById', () => {
  it('encodes the load ID and returns the API result', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ result: load })));

    await expect(fetchApiLoadById('LD/001')).resolves.toEqual(load);

    expect(fetchMock).toHaveBeenCalledWith(
      new URL('https://api.example.com/load/LD%2F001'),
    );
  });

  it('uses an API error message when one is provided', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({
      error: { message: 'Load not found.' },
    }), { status: 404 }));

    await expect(fetchApiLoadById('LD-404')).rejects.toThrow('Load not found.');
  });

  it('falls back to the response status when no API error message is provided', async () => {
    fetchMock.mockResolvedValue(new Response('', { status: 502 }));

    await expect(fetchApiLoadById('LD-001')).rejects.toThrow(
      'Unable to load freight load (502).',
    );
  });
});
