import type { ComponentType } from 'react';

import { createElement } from 'react';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';

const DarkBackground = ({ Story }: { Story: ComponentType }) => {
  const { mode, systemMode } = useColorScheme();
  const isLightMode = mode === 'light'
    || mode === 'system' && systemMode === 'light';

  return createElement(
    Box,
    {
      sx: {
        bgcolor: isLightMode ? 'secondary.main' : 'transparent',
        p: 2,
      },
    },
    createElement(Story),
  );
};

export default DarkBackground;
