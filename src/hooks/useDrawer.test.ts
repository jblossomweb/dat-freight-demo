// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import useDrawer, {
  DEFAULT_DRAWER_WIDTH_COLLAPSED,
  DEFAULT_DRAWER_WIDTH_OPEN,
} from './useDrawer';

describe('useDrawer', () => {
  it('uses the default open state and widths', () => {
    const { result } = renderHook(() => useDrawer());

    expect(result.current.open).toBe(true);
    expect(result.current.width).toBe(DEFAULT_DRAWER_WIDTH_OPEN);
  });

  it('uses the collapsed width when the default state is closed', () => {
    const { result } = renderHook(() => useDrawer({ defaultState: 'closed' }));

    expect(result.current.open).toBe(false);
    expect(result.current.width).toBe(DEFAULT_DRAWER_WIDTH_COLLAPSED);
  });

  it('uses custom open and collapsed widths', () => {
    const { result } = renderHook(() => useDrawer({ widthOpen: 300, widthCollapsed: 72 }));

    expect(result.current.open).toBe(true);
    expect(result.current.width).toBe(300);
  });

  it('toggles between open and collapsed states', () => {
    const { result } = renderHook(() => useDrawer({ widthOpen: 300, widthCollapsed: 72 }));

    act(() => {
      result.current.toggle();
    });

    expect(result.current.open).toBe(false);
    expect(result.current.width).toBe(72);
  });
});
