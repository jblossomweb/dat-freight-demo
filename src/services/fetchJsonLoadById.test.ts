import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { Load } from '@/types/Load';

import fetchJsonLoadById from './fetchJsonLoadById';
import fetchJsonLoads from './fetchJsonLoads';

vi.mock('./fetchJsonLoads', () => ({
  default: vi.fn(),
}));

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

const fetchJsonLoadsMock = vi.mocked(fetchJsonLoads);

beforeEach(() => {
  fetchJsonLoadsMock.mockReset();
});

describe('fetchJsonLoadById', () => {
  it('returns the load matching the requested ID', async () => {
    fetchJsonLoadsMock.mockResolvedValue(loads);

    await expect(fetchJsonLoadById('LD-001')).resolves.toEqual(loads[0]);
    expect(fetchJsonLoadsMock).toHaveBeenCalledOnce();
  });

  it('throws when no load matches the requested ID', async () => {
    fetchJsonLoadsMock.mockResolvedValue(loads);

    await expect(fetchJsonLoadById('LD-404')).rejects.toThrow(
      'Load id LD-404 not found.',
    );
    expect(fetchJsonLoadsMock).toHaveBeenCalledOnce();
  });
});
