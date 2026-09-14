import { describe, expect, it } from 'vitest';

import type { Load } from '@/types/Load';

import quickSearchLoads from './quickSearchLoads';

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
  {
    id: 'LD-002',
    companyName: 'North Star Freight',
    origin: 'Chicago, IL',
    destination: 'New York, NY',
    weight: 28000,
    equipmentType: 'Reefer',
    date: '2024-06-16',
    price: 3200,
    distance: 790,
    status: 'In Transit',
  },
];

describe('quickSearchLoads', () => {
  it('matches case-insensitive substrings across load fields', () => {
    expect(quickSearchLoads(loads, 'salt')).toEqual([loads[0]]);
  });

  it('treats quoted text as one phrase', () => {
    expect(quickSearchLoads(loads, '"Salt Lake"')).toEqual([loads[0]]);
  });

  it('returns loads matching any space-delimited search term', () => {
    expect(quickSearchLoads(loads, 'Swift Reefer')).toEqual(loads);
  });

  it('returns all loads when the search is empty', () => {
    expect(quickSearchLoads(loads, '   ')).toBe(loads);
  });
});
