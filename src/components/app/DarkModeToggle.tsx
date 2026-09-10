import React from 'react';
import { useColorScheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const DarkModeToggle: React.FC = () => {
  const { mode, systemMode, setMode } = useColorScheme();

  if (!mode) {
    return <Box sx={{ width: 64, height: 34 }} />;
  }

  const isDarkMode = mode === 'dark' || (mode === 'system' && systemMode === 'dark');

  return (
    <ButtonBase
      onClick={() => { setMode(isDarkMode ? 'light' : 'dark'); }}
      aria-label="Dark Mode"
      aria-checked={isDarkMode}
      role="switch"
      sx={{
        width: 64,
        height: 34,
        borderRadius: '17px',
        p: '3px',
        display: 'inline-flex',
        alignItems: 'center',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        bgcolor: isDarkMode ? 'secondary.main' : 'grey.300',
        border: '1px solid',
        borderColor: isDarkMode ? 'secondary.dark' : 'grey.400',

        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'info.main',
          outlineOffset: '2px',
        },
      }}
    >
      {/* Background Track Icons */}
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', px: '6px', color: 'grey.500', zIndex: 0 }}>
        <LightModeIcon sx={{ fontSize: 14 }} />
        <DarkModeIcon sx={{ fontSize: 14 }} />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: '2px',
          left: '2px',
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
          transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1), background-color 250ms, border-color 250ms',
          transform: isDarkMode ? 'translateX(30px)' : 'translateX(0px)',
          bgcolor: isDarkMode ? 'primary.main' : 'background.paper',
          border: '1px solid',
          borderColor: isDarkMode ? 'background.paper' : 'primary.main',
          boxShadow: isDarkMode
            ? '0px 2px 4px rgba(0,0,0,0.4), inset 0px 1px 0px rgba(255,255,255,0.2)'
            : '0px 2px 4px rgba(0,0,0,0.15)',
        }}
      >
        {isDarkMode ? (
          <DarkModeIcon sx={{ fontSize: 14, color: 'common.white' }} />
        ) : (
          <LightModeIcon sx={{ fontSize: 14, color: '#f59e0b' }} />
        )}
      </Box>
    </ButtonBase>
  );
};

export default DarkModeToggle;
