import type { SvgIconComponent } from '@mui/icons-material';

import { createElement } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface LabelBoxProps {
  text: string;
  color: string;
  icon: SvgIconComponent | React.ElementType;
}

const LabelBox: React.FC<LabelBoxProps> = ({
  text,
  color,
  icon,
}) => (
  <Box
    component="span"
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      verticalAlign: 'middle',
      gap: 0.75,
      color,
      whiteSpace: 'nowrap',
    }}
  >
    {createElement(icon, {
      'aria-hidden': true,
      sx: { fontSize: 18, flexShrink: 0 },
    })}

    <Typography component="span" variant="body2" sx={{ lineHeight: 1 }}>
      {text}
    </Typography>
  </Box>
);

export default LabelBox;
