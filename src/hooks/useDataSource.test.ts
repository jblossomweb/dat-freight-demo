// @vitest-environment jsdom

import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import useDataSource from './useDataSource';

const storageKey = 'dat-freight-demo:data-source';

interface SearchState { q?: string; dataSource?: 'api' | 'json' }
interface NavigateOptions {
  to: string;
  search: (prev: SearchState) => SearchState;
  replace: true;
}
type Navigate = (options: NavigateOptions) => void;

const routerState = vi.hoisted(() => ({
  pathname: '/freight-loads',
  search: {},
  navigate: vi.fn<Navigate>(),
}));

const getNavigateOptions = (): NavigateOptions => {
  const navigateOptions = routerState.navigate.mock.calls.at(-1)?.[0];

  if (!navigateOptions) {
    throw new Error('Expected navigate to have been called.');
  }

  return navigateOptions;
};

vi.mock('@tanstack/react-router', () => ({
  useLocation: () => ({ pathname: routerState.pathname }),
  useNavigate: () => routerState.navigate,
  useSearch: () => routerState.search,
}));

beforeEach(() => {
  window.localStorage.clear();
  routerState.pathname = '/freight-loads';
  routerState.search = {};
  routerState.navigate.mockReset();
});

describe('useDataSource', () => {
  it('uses the URL data source before local storage and persists it', async () => {
    window.localStorage.setItem(storageKey, 'json');
    routerState.search = { dataSource: 'api' };

    const { result } = renderHook(() => useDataSource());

    expect(result.current[0]).toBe('api');

    await waitFor(() => {
      expect(window.localStorage.getItem(storageKey)).toBe('api');
    });
    expect(routerState.navigate).not.toHaveBeenCalled();
  });

  it('uses local storage when the URL data source is missing and writes it to the URL', async () => {
    window.localStorage.setItem(storageKey, 'api');
    routerState.search = { q: 'Denver' };

    const { result } = renderHook(() => useDataSource());

    expect(result.current[0]).toBe('api');

    await waitFor(() => {
      expect(routerState.navigate).toHaveBeenCalledTimes(1);
    });

    const navigateOptions = getNavigateOptions();

    expect(navigateOptions.to).toBe('/freight-loads');
    expect(navigateOptions.replace).toBe(true);

    expect(navigateOptions.search({ q: 'Denver' })).toEqual({
      q: 'Denver',
      dataSource: 'api',
    });
  });

  it('defaults to JSON mode when neither URL nor local storage has a data source', async () => {
    const { result } = renderHook(() => useDataSource());

    expect(result.current[0]).toBe('json');

    await waitFor(() => {
      expect(window.localStorage.getItem(storageKey)).toBe('json');
      expect(routerState.navigate).toHaveBeenCalledTimes(1);
    });

    const navigateOptions = getNavigateOptions();

    expect(navigateOptions.to).toBe('/freight-loads');
    expect(navigateOptions.replace).toBe(true);
  });

  it('updates local storage and the current URL when setting the data source', () => {
    routerState.pathname = '/stats';
    routerState.search = { q: 'Seattle', dataSource: 'json' };
    const { result } = renderHook(() => useDataSource());

    act(() => {
      result.current[1]('api');
    });

    expect(window.localStorage.getItem(storageKey)).toBe('api');
    expect(routerState.navigate).toHaveBeenCalledTimes(1);

    const navigateOptions = getNavigateOptions();

    expect(navigateOptions.to).toBe('/stats');
    expect(navigateOptions.replace).toBe(true);

    expect(navigateOptions.search({ q: 'Seattle', dataSource: 'json' })).toEqual({
      q: 'Seattle',
      dataSource: 'api',
    });
  });
});