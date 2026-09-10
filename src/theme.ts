import type { StatusPalette, EquipmentPalette, LinkPalette } from './types/Theme';

import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    equipment: EquipmentPalette;
    status: StatusPalette;
    link: LinkPalette;
  }

  interface PaletteOptions {
    equipment: EquipmentPalette;
    status: StatusPalette;
    link: LinkPalette;
  }
}

export const accessibleTheme = createTheme({
  // compile to native CSS custom properties
  cssVariables: {
    colorSchemeSelector: 'class',
  },

  colorSchemes: {
    // ☀️ Light Mode
    light: {
      palette: {
        primary: { main: '#0053ec', dark: '#003cb3', contrastText: '#ffffff' },
        secondary: { main: '#293851', dark: '#1e293b', contrastText: '#ffffff' },
        background: { default: '#f3f4f6', paper: '#ffffff' },
        text: { primary: '#111827', secondary: '#4b5563' },
        warning: { main: '#e65100', dark: '#ba4100' },
        equipment: {
          van: '#512da8',
          flatbed: '#ad1457',
          reefer: '#00695c',
        },
        status: {
          available: 'var(--mui-palette-info-dark)',
          inTransit: 'var(--mui-palette-warning-dark)',
          delivered: 'var(--mui-palette-success-dark)',
        },
        link: {
          main: 'var(--mui-palette-primary-main)',
          hover: 'var(--mui-palette-primary-dark)',
        },
      },
    },

    // 🌙 Dark Mode
    dark: {
      palette: {
        primary: { main: '#0053ec', dark: '#003cb3', light: '#a2c2fd', contrastText: '#ffffff' },
        secondary: { main: '#293851', dark: '#1e293b', contrastText: '#ffffff' },
        background: { default: '#070d14', paper: '#0e1722' },
        text: { primary: '#f9fafb', secondary: '#9ca3af' },
        equipment: {
          van: '#b39ddb',
          flatbed: '#f48fb1',
          reefer: '#80cbc4',
        },
        status: {
          available: 'var(--mui-palette-info-light)',
          inTransit: 'var(--mui-palette-warning-light)',
          delivered: 'var(--mui-palette-success-light)',
        },
        link: {
          main: 'var(--mui-palette-info-light)',
          hover: 'var(--mui-palette-info-main)',
        },
      },
    },
  },

  typography: {
    fontFamily: '"Archivo", "Helvetica Neue", Arial, sans-serif',

    h1: { fontFamily: '"Public Sans", sans-serif', fontWeight: 800, fontSize: '2.5rem', letterSpacing: '-0.04em' },
    h2: { fontFamily: '"Public Sans", sans-serif', fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.03em' },
    h3: { fontFamily: '"Public Sans", sans-serif', fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.02em' },
    h4: { fontFamily: '"Public Sans", sans-serif', fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.02em' },
    h5: { fontFamily: '"Public Sans", sans-serif', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.01em' },
    h6: { fontFamily: '"Public Sans", sans-serif', fontWeight: 600, fontSize: '1rem', letterSpacing: '-0.01em' },

    body1: { fontSize: '0.95rem', letterSpacing: '0.01em', lineHeight: 1.45 },
    body2: { fontSize: '0.85rem', letterSpacing: '0.01em', lineHeight: 1.4 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.02em' },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          padding: '8px 16px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--mui-palette-secondary-main)',
          color: 'var(--mui-palette-secondary-contrastText)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'var(--mui-palette-secondary-main)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--mui-palette-secondary-main)',
          color: 'var(--mui-palette-primary-contrastText)',
          border: '2px solid transparent',
          boxSizing: 'border-box',
          '&:hover': {
            backgroundColor: 'var(--mui-palette-secondary-dark)',
          },

          '&.Mui-selected': {
            backgroundColor: 'var(--mui-palette-primary-main)',
            color: 'var(--mui-palette-primary-contrastText)',
            '&:hover': {
              backgroundColor: 'var(--mui-palette-primary-main)',
            },
          },
          '&:focus-visible': {
            borderColor: 'var(--mui-palette-info-main)',
            backgroundColor: 'var(--mui-palette-secondary-main)',
            outline: 'none',
          },
          '.MuiDrawer-paper &:focus-visible': {
            borderColor: 'var(--mui-palette-info-main)',
            backgroundColor: 'var(--mui-palette-secondary-main)',
            outline: 'none',
          },
          '&.Mui-selected:focus-visible': {
            backgroundColor: 'var(--mui-palette-primary-main)',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            opacity: 0.6,
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: 'var(--mui-palette-text-primary)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--mui-palette-info-main)',
          },
        },
      },
    },
  },
});
