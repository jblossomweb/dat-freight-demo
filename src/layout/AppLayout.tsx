import type { DataSource } from '@/types/DataSource';

import Box from '@mui/material/Box';

import AriaAnnouncement from '@/components/app/AriaAnnouncement';

import HeaderBar from '@/components/app/HeaderBar';
import LeftNavDrawer from '@/components/app/LeftNavDrawer';

import LogoBox from '@/components/app/LogoBox';
import DarkModeToggle from '@/components/app/DarkModeToggle';

import useAnnouncement from '@/hooks/useAnnouncement';
import useDrawer from '@/hooks/useDrawer';

interface AppLayoutProps {
  pageTitle?: string;
  currentPath?: string;
  quickSearch?: string;
  dataSource?: DataSource;
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  pageTitle,
  currentPath,
  quickSearch,
  dataSource,
}) => {

  const drawer = useDrawer();
  const announcement = useAnnouncement();

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

      <AriaAnnouncement>
        {announcement.text}
      </AriaAnnouncement>

      <HeaderBar
        title={pageTitle}
        drawerWidth={drawer.width}
        actions={<DarkModeToggle />}
      />

      <LeftNavDrawer
        width={drawer.width}
        branding={<LogoBox width={drawer.width * 0.6} />}
        currentPath={currentPath}
        quickSearch={quickSearch}
        dataSource={dataSource}
        open={drawer.open}
        toggleDrawer={() => {
          drawer.toggle();
          announcement.announce(
            drawer.open
              ? 'Navigation drawer closed'
              : 'Navigation drawer opened',
          );
        }}
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
