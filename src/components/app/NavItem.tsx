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
  collapsed?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  title,
  link,
  icon,
  active = false,
  collapsed = false,
}) => (
  <ListItem disablePadding sx={{ mb: 1 }}>
    <ListItemButton
      selected={active}
      aria-current={active ? 'page' : undefined}
      component={Link}
      to={link}
      sx={{
        borderRadius: 1.5,
        justifyContent: collapsed ? 'center' : 'flex-start',
        px: collapsed ? 1 : 2,
      }}
    >
      <ListItemIcon sx={{ color: 'common.white', minWidth: collapsed ? 0 : 40 }}>
        { icon }
      </ListItemIcon>
      <ListItemText
        primary={title}
        sx={(theme) => ({
          minWidth: 0,
          width: collapsed ? 0 : 'auto',
          flex: collapsed ? '0 0 0px' : '1 1 auto',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          opacity: collapsed ? 0 : 1,
          transition: theme.transitions.create(['opacity', 'width'], {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.easeInOut,
          }),
          transitionDelay: collapsed ? '0ms' : `${String(theme.transitions.duration.shorter)}ms`,
        })}
        slotProps={{
          primary: { sx: { fontWeight: 500 } },
        }}
      />
    </ListItemButton>
  </ListItem>
);

export default NavItem;
