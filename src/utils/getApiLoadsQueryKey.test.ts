import { describe, expect, it } from 'vitest';

import type { FilterModel } from '@/types/Filter';
import type { SortModel } from '@/types/Sort';

import getApiLoadsQueryKey from './getApiLoadsQueryKey';

describe('getApiLoadsQueryKey', () => {
  it('includes pagination, sorting, filtering, and quick-search state', () => {
    const sortModel: SortModel = [{ colId: 'date', sort: 'desc' }];
    const filterModel: FilterModel = {
      status: { filterType: 'text', type: 'equals', filter: 'Available' },
    };

    expect(getApiLoadsQueryKey({
      startRow: 25,
      endRow: 50,
      sortModel,
      filterModel,
      quickSearch: 'Salt Lake',
    })).toEqual([
      'api-loads',
      25,
      50,
      sortModel,
      filterModel,
      'Salt Lake',
    ]);
  });
});
