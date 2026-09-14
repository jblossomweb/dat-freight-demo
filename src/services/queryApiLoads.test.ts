import { describe, expect, it, vi } from 'vitest';

import type { QueryClient } from '@tanstack/react-query';
import type { FilterModel } from '@/types/Filter';
import type { SortModel } from '@/types/Sort';

import fetchApiLoads from './fetchApiLoads';
import queryApiLoads from './queryApiLoads';

vi.mock('./fetchApiLoads', () => ({
  default: vi.fn(),
}));

interface QueryOptions {
  queryKey: unknown;
  queryFn: () => ReturnType<typeof fetchApiLoads>;
  staleTime: number;
  gcTime: number;
  retry: boolean;
}

describe('queryApiLoads', () => {
  it('uses the trimmed search for both cache identity and the API request', async () => {
    const queryResult = Promise.resolve({ rows: [], lastRow: 0, numTotal: 0 });
    let queryOptions: QueryOptions | undefined;
    const query = vi.fn((options: QueryOptions) => {
      queryOptions = options;
      return queryResult;
    });
    const client = { query } as unknown as QueryClient;
    const sortModel: SortModel = [{ colId: 'date', sort: 'desc' }];
    const filterModel: FilterModel = {
      status: { filterType: 'text', type: 'equals', filter: 'Available' },
    };
    vi.mocked(fetchApiLoads).mockResolvedValue({ rows: [], lastRow: 0, numTotal: 0 });

    const result = queryApiLoads({
      client,
      startRow: 25,
      endRow: 50,
      sortModel,
      filterModel,
      quickSearch: '  Salt Lake  ',
    });

    expect(result).toBe(queryResult);
    expect(queryOptions).toMatchObject({
      queryKey: ['api-loads', 25, 50, sortModel, filterModel, 'Salt Lake'],
      staleTime: 30_000,
      gcTime: 300_000,
      retry: false,
    });

    if (!queryOptions) {
      throw new Error('Expected QueryClient.query to receive options.');
    }

    await queryOptions.queryFn();

    expect(fetchApiLoads).toHaveBeenCalledWith({
      startRow: 25,
      endRow: 50,
      sortModel,
      filterModel,
      quickSearch: 'Salt Lake',
    });
  });
});
