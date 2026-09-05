import React from 'react';
import Box from '@mui/material/Box';

import HeaderBar from '../components/HeaderBar';
import LeftNavDrawer from '../components/LeftNavDrawer';

import LogoBox from '../components/LogoBox';
import ThemeToggle from '../components/ThemeToggle';

const DRAWER_WIDTH = 240;

interface AppLayoutProps {
  pageTitle?: string;
  currentPath?: string;
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, pageTitle, currentPath }) => {
  return (
    <Box sx={{
      display: 'flex',
      height: '100vh',
      bgcolor: 'background.default',
      overflow: 'hidden',
    }}
    >

      <HeaderBar
        title={pageTitle}
        drawerWidth={DRAWER_WIDTH}
        actions={<ThemeToggle />}
      />

      <LeftNavDrawer
        width={DRAWER_WIDTH}
        branding={<LogoBox width={DRAWER_WIDTH * 0.8} />}
        currentPath={currentPath}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          mt: '64px',
          height: 'calc(100vh - 64px)',
          overflowY: 'scroll',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;
