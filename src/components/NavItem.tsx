import React from 'react';

import { Link } from '@tanstack/react-router';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

interface NavItemProps {
  title: string;
  link?: string;
  icon?: React.ReactNode;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ title, link, icon, active = false }) => (
  <ListItem disablePadding sx={{ mb: 1 }}>
    <ListItemButton
      selected={active}
      aria-current={active ? 'page' : undefined}
      component={Link}
      to={link}
      sx={{ borderRadius: 1.5 }}
    >
      <ListItemIcon sx={{ color: 'common.white', minWidth: 40 }}>
        { icon }
      </ListItemIcon>
      <ListItemText
        primary={title}
        slotProps={{
          primary: { sx: { fontWeight: 500 } },
        }}
      />
    </ListItemButton>
  </ListItem>
);

export default NavItem;
