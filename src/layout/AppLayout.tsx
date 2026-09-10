import { useState } from 'react';
import Box from '@mui/material/Box';

import AriaAnnouncement from '@/components/app/AriaAnnouncement';

import HeaderBar from '@/components/app/HeaderBar';
import LeftNavDrawer from '@/components/app/LeftNavDrawer';

import LogoBox from '@/components/app/LogoBox';
import DarkModeToggle from '@/components/app/DarkModeToggle';

const DRAWER_WIDTH = 240;
const DRAWER_WIDTH_COLLAPSED = 90;

interface AppLayoutProps {
  pageTitle?: string;
  currentPath?: string;
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, pageTitle, currentPath }) => {

  const [drawerOpen, setDrawerOpen] = useState(true); // default to open
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerWidth = drawerOpen ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED;

  console.log({ currentPath });

  return (
    <Box sx={{
      display: 'flex',
      height: '100vh',
      bgcolor: 'background.default',
      overflow: 'hidden',
    }}
    >
      <AriaAnnouncement atomic alert>
        {pageTitle ? `${pageTitle} page loaded` : ''}
      </AriaAnnouncement>

      <HeaderBar
        title={pageTitle}
        drawerWidth={drawerWidth}
        actions={<DarkModeToggle />}
      />

      <LeftNavDrawer
        width={drawerWidth}
        branding={<LogoBox width={drawerWidth * 0.6} />}
        currentPath={currentPath}
        open={drawerOpen}
        toggleDrawer={toggleDrawer}
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
