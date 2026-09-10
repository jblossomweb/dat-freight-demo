import type { Preview } from '@storybook/tanstack-react';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import '@fontsource/archivo/400.css';
import '@fontsource/archivo/500.css';
import '@fontsource/archivo/600.css';
import '@fontsource/public-sans/700.css';

import { accessibleTheme } from '../src/theme';
import DarkModeToggle from '../src/components/app/DarkModeToggle';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={accessibleTheme} defaultMode="system">
        <CssBaseline />
        <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1 }}>
          <DarkModeToggle />
        </Box>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
