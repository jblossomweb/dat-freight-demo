import type { DrawerState } from '@/types/DrawerState';

import { useState } from 'react';

import { getDrawerState, setDrawerState } from '@/services/drawerState';

export const DEFAULT_DRAWER_STATE: DrawerState = 'open';
export const DEFAULT_DRAWER_WIDTH_OPEN = 240;
export const DEFAULT_DRAWER_WIDTH_COLLAPSED = 90;

export interface UseDrawerSettings {
  defaultState?: DrawerState;
  widthOpen?: number;
  widthCollapsed?: number;
}

const useDrawer = ({
  defaultState,
  widthOpen = DEFAULT_DRAWER_WIDTH_OPEN,
  widthCollapsed = DEFAULT_DRAWER_WIDTH_COLLAPSED,
}: UseDrawerSettings = {}) => {

  const [open, setOpen] = useState(() => (
    getDrawerState(defaultState ?? DEFAULT_DRAWER_STATE) === 'open'
  ));

  return {
    open,
    width: open ? widthOpen : widthCollapsed,
    toggle: () => {
      setOpen(!open);
      setDrawerState(!open ? 'open' : 'closed');
    },
  };
};

export default useDrawer;
