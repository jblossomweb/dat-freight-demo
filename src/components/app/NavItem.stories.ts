import type { Meta, StoryObj } from '@storybook/tanstack-react';

import { createElement } from 'react';

import DarkBackground from '@/../.storybook/decorators/DarkBackground';

import PeopleIcon from '@mui/icons-material/People';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import NavItem from './NavItem';

const meta = {
  title: 'components/app/NavItem',
  component: NavItem,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    // this component is intended to be used against a dark background
    (Story) => createElement(DarkBackground, { Story }),
  ],
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    link: { control: 'text' },
    icon: { control: false },
    active: { control: 'boolean' },
    collapsed: { control: 'boolean' },
  },
} satisfies Meta<typeof NavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  args: {
    title: 'Home',
    link: '/',
    icon: createElement(PeopleIcon),
    active: false,
    collapsed: false,
  },
};

export const Active: Story = {
  args: {
    title: 'Home',
    link: '/',
    icon: createElement(PeopleIcon),
    active: true,
    collapsed: false,
  },
};

export const Collapsed: Story = {
  args: {
    title: 'Home',
    link: '/',
    icon: createElement(PeopleIcon),
    active: false,
    collapsed: true,
  },
};

export const FreightLoads: Story = {
  args: {
    title: 'Freight Loads',
    link: '/freight-loads',
    icon: createElement(LocalShippingIcon),
    active: false,
    collapsed: false,
  },
};
