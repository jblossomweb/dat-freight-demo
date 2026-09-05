import React from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';

import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import NavItem from './NavItem';

interface LeftNavDrawerProps {
  width: number;
  branding?: React.ReactNode;
  currentPath?: string;
}

const LeftNavDrawer: React.FC<LeftNavDrawerProps> = ({
  width,
  branding = null,
  currentPath,
}) => (
  <Drawer
    variant="permanent"
    anchor="left"
    aria-label="Main Application Navigation"
    sx={{
      width,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width,
      },
    }}
  >
    <Toolbar sx={{ display: 'flex', alignItems: 'center', px: 3 }}>
      {branding}
    </Toolbar>

    <Box component="nav" sx={{ px: 2, mt: 2 }}>
      <List>
        <NavItem
          title="Home"
          link="/"
          active={currentPath === '/'}
          icon={<PeopleIcon />}
        />
        <NavItem
          title="Freight Loads"
          link="/freight-loads"
          active={currentPath === '/freight-loads'}
          icon={<LocalShippingIcon />}
        />
        <NavItem
          title="Style Guide"
          link="/style-guide"
          active={currentPath === '/style-guide'}
          icon={<SettingsIcon />}
        />
      </List>
    </Box>
  </Drawer>
);

export default LeftNavDrawer;
