import type { ComponentProps, ReactNode } from 'react';

import { createLink } from '@tanstack/react-router';
import MuiLink from '@mui/material/Link';
import type { LinkProps as MuiLinkProps } from '@mui/material/Link';
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

const RouterLink = createLink(ThemedMuiLink);

type RouterLinkProps = ComponentProps<typeof RouterLink>;

type LinkProps =
  | (MuiLinkProps & { href: string; to?: never })
  | (RouterLinkProps & { to: RouterLinkProps['to']; href?: never });

const Link: React.FC<LinkProps & { children?: ReactNode }> = (props) => {
  if ('href' in props) {
    return <ThemedMuiLink {...props} />;
  }

  return <RouterLink {...props} />;
};

export default Link;
