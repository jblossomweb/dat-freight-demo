import { describe, expect, it } from 'vitest';

import type { FilterModel } from '@/types/Filter';

import getFilterAnnouncement from './getFilterAnnouncement';

const baseArgs = {
  filterModel: {} as FilterModel,
  filteredRowCount: 25,
  totalRowCount: 100,
  rowUnits: 'loads',
};

describe('getFilterAnnouncement', () => {
  it('announces the search query and result count', () => {
    expect(getFilterAnnouncement({
      ...baseArgs,
      searchQuery: 'Chicago',
    })).toEqual(expect.stringContaining('Search Query: "Chicago".'));
    expect(getFilterAnnouncement({
      ...baseArgs,
      searchQuery: 'Chicago',
    })).toEqual(expect.stringContaining('Showing 25 of 100 total loads'));
  });

  it('announces when a previous search is cleared', () => {
    expect(getFilterAnnouncement({
      ...baseArgs,
      searchQuery: '',
      lastSearch: 'Chicago',
    })).toEqual(expect.stringContaining('Search Cleared.'));
    expect(getFilterAnnouncement({
      ...baseArgs,
      searchQuery: '',
      lastSearch: 'Chicago',
    })).toEqual(expect.stringContaining('Showing 25 of 100 total loads'));
  });

  it('announces active filters and result count', () => {
    const filterModel: FilterModel = {
      status: {
        filterType: 'text',
        type: 'equals',
        filter: 'Available',
      },
    };

    expect(getFilterAnnouncement({
      ...baseArgs,
      filterModel,
    })).toEqual(expect.stringContaining('Filtering by: status = "Available".'));
    expect(getFilterAnnouncement({
      ...baseArgs,
      filterModel,
    })).toEqual(expect.stringContaining('Showing 25 of 100 total loads'));
  });

  it('announces search, filters, and result count together', () => {
    const filterModel: FilterModel = {
      equipmentType: {
        filterType: 'set',
        values: ['Van', 'Reefer'],
      },
    };

    expect(getFilterAnnouncement({
      ...baseArgs,
      searchQuery: 'freight',
      filterModel,
      filteredRowCount: 2,
    })).toEqual(expect.stringContaining('Search Query: "freight".'));
    expect(getFilterAnnouncement({
      ...baseArgs,
      searchQuery: 'freight',
      filterModel,
      filteredRowCount: 2,
    })).toEqual(expect.stringContaining('Filtering by: equipmentType is "Van", "Reefer".'));
    expect(getFilterAnnouncement({
      ...baseArgs,
      searchQuery: 'freight',
      filterModel,
      filteredRowCount: 2,
    })).toEqual(expect.stringContaining('Showing 2 of 100 total loads'));
  });
});
