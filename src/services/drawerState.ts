import type { DrawerState } from '@/types/DrawerState';

export const DRAWER_STATE_STORAGE_KEY = 'dat-freight-demo:drawer-state';
export const DEFAULT_DRAWER_STATE: DrawerState = 'open';

export const getDrawerState = (
  defaultState: DrawerState = DEFAULT_DRAWER_STATE,
): DrawerState => {
  if (typeof window === 'undefined') {
    return defaultState;
  }

  const value = window.localStorage.getItem(DRAWER_STATE_STORAGE_KEY);

  return value === 'open' || value === 'closed' ? value : defaultState;
};

export const setDrawerState = (mode: DrawerState) => {
  window.localStorage.setItem(DRAWER_STATE_STORAGE_KEY, mode);
};
