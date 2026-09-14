import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { Load } from '@/types/Load';

import fetchJsonLoads from './fetchJsonLoads';

const loads: Load[] = [
  {
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
  },
];

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  fetchMock = vi.fn();
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe('fetchJsonLoads', () => {
  it('returns the loads payload after the simulated delay', async () => {
    vi.useFakeTimers();
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ loads })));

    const result = fetchJsonLoads();
    await vi.advanceTimersByTimeAsync(400);

    await expect(result).resolves.toEqual(loads);
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it('throws when the JSON response is not successful', async () => {
    fetchMock.mockResolvedValue(new Response('', { status: 404 }));

    await expect(fetchJsonLoads()).rejects.toThrow(
      'Unable to load freight loads (404).',
    );
  });
});
