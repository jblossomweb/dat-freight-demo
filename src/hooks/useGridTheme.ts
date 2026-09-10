import { useColorScheme } from '@mui/material/styles';
import { useMemo } from 'react';

import {
  themeQuartz,
  colorSchemeDark,
} from 'ag-grid-community';

const useGridTheme = () => {
  const { mode } = useColorScheme();

  const gridTheme = useMemo(
    () => mode === 'dark'
      ? themeQuartz.withPart(colorSchemeDark)
      : themeQuartz,
    [mode],
  );

  return gridTheme;
};

export default useGridTheme;
