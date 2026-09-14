import { afterEach, describe, expect, it, vi } from 'vitest';

import { getDataSource, setDataSource } from './dataSource';

const storageKey = 'dat-freight-demo:data-source';

const stubLocalStorage = (value: string | null) => {
  const localStorage = {
    getItem: vi.fn(() => value),
    setItem: vi.fn(),
  };
  vi.stubGlobal('window', { localStorage });

  return localStorage;
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('dataSource', () => {
  it('defaults to JSON when browser storage is unavailable', () => {
    expect(getDataSource()).toBe('json');
  });

  it('returns a valid persisted data source', () => {
    stubLocalStorage('api');

    expect(getDataSource()).toBe('api');
  });

  it('defaults to JSON for missing or invalid persisted values', () => {
    stubLocalStorage(null);
    expect(getDataSource()).toBe('json');

    stubLocalStorage('unsupported');
    expect(getDataSource()).toBe('json');
  });

  it('persists the selected data source', () => {
    const localStorage = stubLocalStorage(null);

    setDataSource('api');

    expect(localStorage.setItem).toHaveBeenCalledWith(storageKey, 'api');
  });
});
