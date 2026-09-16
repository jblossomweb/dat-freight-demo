// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { DRAWER_STATE_STORAGE_KEY } from '@/services/drawerState';

import useDrawer, {
  DEFAULT_DRAWER_STATE,
  DEFAULT_DRAWER_WIDTH_COLLAPSED,
  DEFAULT_DRAWER_WIDTH_OPEN,
} from './useDrawer';

beforeEach(() => {
  window.localStorage.clear();
});

describe('useDrawer', () => {
  it('defaults the drawer state to open', () => {
    expect(DEFAULT_DRAWER_STATE).toBe('open');
  });

  it('uses the default open state and widths', () => {
    const { result } = renderHook(() => useDrawer());
    const expectedOpen = DEFAULT_DRAWER_STATE === 'open';

    expect(result.current.open).toBe(expectedOpen);
    expect(result.current.width).toBe(
      expectedOpen ? DEFAULT_DRAWER_WIDTH_OPEN : DEFAULT_DRAWER_WIDTH_COLLAPSED,
    );
  });

  it('falls back to defaults when settings are empty or partial', () => {
    const emptySettings = renderHook(() => useDrawer({}));
    const partialSettings = renderHook(() => useDrawer({ widthCollapsed: 72 }));
    const expectedOpen = DEFAULT_DRAWER_STATE === 'open';

    expect(emptySettings.result.current.open).toBe(expectedOpen);
    expect(emptySettings.result.current.width).toBe(
      expectedOpen ? DEFAULT_DRAWER_WIDTH_OPEN : DEFAULT_DRAWER_WIDTH_COLLAPSED,
    );
    expect(partialSettings.result.current.open).toBe(expectedOpen);
    expect(partialSettings.result.current.width).toBe(
      expectedOpen ? DEFAULT_DRAWER_WIDTH_OPEN : 72,
    );
  });

  it('uses the open width when the default state is explicitly set to open', () => {
    const { result } = renderHook(() => useDrawer({ defaultState: 'open' }));

    expect(result.current.open).toBe(true);
    expect(result.current.width).toBe(DEFAULT_DRAWER_WIDTH_OPEN);
  });

  it('uses the collapsed width when the default state is explicitly set to closed', () => {
    const { result } = renderHook(() => useDrawer({ defaultState: 'closed' }));

    expect(result.current.open).toBe(false);
    expect(result.current.width).toBe(DEFAULT_DRAWER_WIDTH_COLLAPSED);
  });

  it('uses the persisted closed state on initialization', () => {
    window.localStorage.setItem(DRAWER_STATE_STORAGE_KEY, 'closed');

    const { result } = renderHook(() => useDrawer());

    expect(result.current.open).toBe(false);
    expect(result.current.width).toBe(DEFAULT_DRAWER_WIDTH_COLLAPSED);
  });

  it('toggles between open and collapsed states', () => {
    const { result } = renderHook(() => useDrawer({ defaultState: 'open' }));

    act(() => {
      result.current.toggle();
    });

    expect(result.current.open).toBe(false);
    expect(result.current.width).toBe(DEFAULT_DRAWER_WIDTH_COLLAPSED);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.open).toBe(true);
    expect(result.current.width).toBe(DEFAULT_DRAWER_WIDTH_OPEN);
  });

  it('persists the state to localStorage when toggled', () => {
    const { result } = renderHook(() => useDrawer({ defaultState: 'open' }));

    act(() => {
      result.current.toggle();
    });

    expect(window.localStorage.getItem(DRAWER_STATE_STORAGE_KEY)).toBe('closed');

    act(() => {
      result.current.toggle();
    });

    expect(window.localStorage.getItem(DRAWER_STATE_STORAGE_KEY)).toBe('open');
  });

  it('uses custom open and collapsed widths', () => {
    const { result } = renderHook(() => useDrawer({ defaultState: 'open', widthOpen: 300, widthCollapsed: 72 }));

    expect(result.current.open).toBe(true);
    expect(result.current.width).toBe(300);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.open).toBe(false);
    expect(result.current.width).toBe(72);
  });
});
