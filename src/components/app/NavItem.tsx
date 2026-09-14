import React from 'react';

import { useNavigate } from '@tanstack/react-router';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

interface NavItemProps {
  title: string;
  link?: string;
  search?: Record<string, string | undefined>;
  icon?: React.ReactNode;
  active?: boolean;
  collapsed?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  title,
  link,
  search,
  icon,
  active = false,
  collapsed = false,
}) => {
  const navigate = useNavigate();

  // Navigate programmatically to keep persistent app state mounted across route changes.
  const handleClick = () => {
    if (link) {
      void navigate({ to: link, search });
    }
  };

  return (
    <ListItem disablePadding sx={{ mb: 1 }}>
      <ListItemButton
        selected={active}
        aria-current={active ? 'page' : undefined}
        onClick={handleClick}
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
            primary: { sx: { fontWeight: 500, color: 'common.white' } },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default NavItem;
