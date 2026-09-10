import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface HeaderBarProps {
  title?: string;
  actions?: React.ReactNode;
  drawerWidth?: number;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  title = '',
  actions = null,
  drawerWidth = 0,
}) => (
  <AppBar
    position="fixed"
    elevation={0}
    sx={(theme) => ({
      width: `calc(100% - ${String(drawerWidth)}px)`,
      ml: `${String(drawerWidth)}px`,
      transition: theme.transitions.create(['width', 'margin-left'], {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeInOut,
      }),
      borderBottom: 1,
      borderColor: 'divider',
      bgcolor: 'background.paper',
      color: 'text.primary',
    })}
  >
    {/* component="header" provides semantic HTML5 validation mapping */}
    <Toolbar
      component="header"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', // Centers items vertically inside the bar
        width: '100%',
      }}
    >
      <Typography
        variant="h6"
        noWrap
        component="h1"
        sx={{ fontWeight: 600 }}
      >
        {title}
      </Typography>

      { actions }
    </Toolbar>
  </AppBar>
);

export default HeaderBar;
