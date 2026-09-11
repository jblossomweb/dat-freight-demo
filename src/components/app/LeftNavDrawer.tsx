import React from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';

import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

import NavItem from './NavItem';

interface LeftNavDrawerProps {
  width: number;
  branding?: React.ReactNode;
  currentPath?: string;
  open?: boolean;
  toggleDrawer?: () => void;
}

const LeftNavDrawer: React.FC<LeftNavDrawerProps> = ({
  width,
  branding = null,
  currentPath,
  open,
  toggleDrawer,
}) => (
  <Drawer
    variant="permanent"
    anchor="left"
    aria-label="Main Application Navigation"
    sx={(theme) => ({
      width,
      flexShrink: 0,
      transition: theme.transitions.create('width', {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeInOut,
      }),
      '& .MuiDrawer-paper': {
        width,
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          duration: theme.transitions.duration.standard,
          easing: theme.transitions.easing.easeInOut,
        }),
      },
    })}
  >
    <Toolbar sx={{ display: 'flex', alignItems: 'center', px: 3 }}>
      <IconButton
        onClick={toggleDrawer}
        sx={{
          mr: 1,
          width: 40,
          height: 40,
          flex: '0 0 40px',
          borderRadius: 1.5,
          color: 'common.white',
        }}
        aria-label="Toggle Drawer"
      >
        {open ? <MenuOpenIcon aria-label="Collapse Menu" /> : <MenuIcon aria-label="Expand Menu" />}
      </IconButton>
      <Box
        sx={(theme) => ({
          minWidth: 0,
          overflow: 'hidden',
          color: 'common.white',
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transition: 'opacity 150ms ease, visibility 0s linear',
          transitionDelay: open
            ? `${String(theme.transitions.duration.shorter)}ms`
            : '0ms',
        })}
      >
        {branding}
      </Box>
    </Toolbar>

    <Box component="nav" sx={{ px: 2, mt: 2 }}>
      <List>
        <NavItem
          title="Home"
          link="/"
          active={currentPath === '/'}
          collapsed={!open}
          icon={<HomeFilledIcon />}
        />
        <NavItem
          title="Freight Loads"
          link="/freight-loads"
          active={
            currentPath === '/freight-loads' ||
            currentPath?.startsWith('/freight-load/')
          }
          collapsed={!open}
          icon={<LocalShippingIcon />}
        />
        <NavItem
          title="Statistics"
          link="/stats"
          active={currentPath === '/stats'}
          collapsed={!open}
          icon={<LeaderboardIcon />}
        />
      </List>
    </Box>
  </Drawer>
);

export default LeftNavDrawer;
