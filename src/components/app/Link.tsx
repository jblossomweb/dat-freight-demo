import { createLink } from '@tanstack/react-router';
import MuiLink from '@mui/material/Link';
import { styled } from '@mui/material/styles';

const ThemedMuiLink = styled(MuiLink)(({ theme }) => ({
  '&.MuiTypography-inherit': {
    color: theme.vars?.palette.link.main,
    cursor: 'pointer',
    fontWeight: 500,
    textDecoration: 'none',
  },
  '&.MuiLink-underlineAlways': {
    textDecoration: 'none',
  },

  '&:hover': {
    color: theme.vars?.palette.link.hover,
    textDecoration: 'underline',
  },
}));

const Link = createLink(ThemedMuiLink);

export default Link;
