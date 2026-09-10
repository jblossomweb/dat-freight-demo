import { useColorScheme } from '@mui/material/styles';
import { useMemo } from 'react';

import {
  themeQuartz,
  colorSchemeDark,
} from 'ag-grid-community';

const useGridTheme = () => {
  const { mode, systemMode } = useColorScheme();

  const gridTheme = useMemo(
    () => (mode === 'dark' || (mode === 'system' && systemMode === 'dark'))
      ? themeQuartz.withPart(colorSchemeDark)
      : themeQuartz,
    [mode, systemMode],
  );

  return gridTheme;
};

export default useGridTheme;
