import type { DrawerState } from '@/types/DrawerState';

import { useState } from 'react';

export const DEFAULT_DRAWER_STATE = 'open';
export const DEFAULT_DRAWER_WIDTH_OPEN = 240;
export const DEFAULT_DRAWER_WIDTH_COLLAPSED = 90;

export interface UseDrawerSettings {
  defaultState?: DrawerState;
  widthOpen?: number;
  widthCollapsed?: number;
}

const DEFAULT_SETTINGS: Required<UseDrawerSettings> = {
  defaultState: DEFAULT_DRAWER_STATE,
  widthOpen: DEFAULT_DRAWER_WIDTH_OPEN,
  widthCollapsed: DEFAULT_DRAWER_WIDTH_COLLAPSED,
};

const useDrawer = ({
  defaultState = DEFAULT_SETTINGS.defaultState,
  widthOpen = DEFAULT_SETTINGS.widthOpen,
  widthCollapsed = DEFAULT_SETTINGS.widthCollapsed,
}: UseDrawerSettings = DEFAULT_SETTINGS) => {

  const [open, setOpen] = useState(defaultState === 'open');

  return {
    open,
    width: open ? widthOpen : widthCollapsed,
    toggle: () => {
      setOpen(!open);
    },
  };
};

export default useDrawer;
