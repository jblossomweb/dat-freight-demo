import React from 'react';
import Box from '@mui/material/Box';

import logo from '@/assets/dat-tm-logo.svg';

interface LogoBoxProps {
  width?: number;
}

const LogoBox: React.FC<LogoBoxProps> = ( { width }) => (
  <Box
    component="img"
    src={logo}
    alt="DAT Freight & Analytics Logo"
    sx={{
      height: 'auto',
      width,
      display: 'block',
      objectFit: 'contain',
    }}
  />
);

export default LogoBox;
