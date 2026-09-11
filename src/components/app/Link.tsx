import type { ComponentProps, ReactElement, ReactNode } from 'react';

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

type LinkProps = MuiLinkProps & {
  href?: string;
  to?: string;
  params?: Record<string, string>;
};

type LinkComponent = (props: LinkProps & { children?: ReactNode }) => ReactElement;

const Link = ((props: LinkProps & { children?: ReactNode }) => {
  if (props.href !== undefined) {
    return <ThemedMuiLink {...props} />;
  }

  return <RouterLink {...(props as ComponentProps<typeof RouterLink>)} />;
}) as LinkComponent;

export default Link;
