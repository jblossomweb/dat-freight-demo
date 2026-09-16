import { afterEach, describe, expect, it, vi } from 'vitest';

import { getDrawerState, setDrawerState } from './drawerState';

const storageKey = 'dat-freight-demo:drawer-state';

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

describe('drawerState', () => {
  it('defaults to open when browser storage is unavailable', () => {
    expect(getDrawerState()).toBe('open');
  });

  it.each(['open', 'closed'] as const)('returns a valid persisted drawer state: %s', (state) => {
    stubLocalStorage(state);

    expect(getDrawerState()).toBe(state);
  });

  it('defaults to open for missing or invalid persisted values', () => {
    stubLocalStorage(null);
    expect(getDrawerState()).toBe('open');

    stubLocalStorage('unsupported');
    expect(getDrawerState()).toBe('open');
  });

  it.each(['open', 'closed'] as const)('persists the selected drawer state: %s', (state) => {
    const localStorage = stubLocalStorage(null);

    setDrawerState(state);

    expect(localStorage.setItem).toHaveBeenCalledWith(storageKey, state);
  });
});
