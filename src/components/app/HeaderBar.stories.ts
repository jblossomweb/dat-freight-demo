import type { Meta, StoryObj } from '@storybook/tanstack-react';

import { createElement } from 'react';

import HeaderBar from './HeaderBar';
import DarkModeToggle from './DarkModeToggle';

const meta = {
  title: 'components/app/HeaderBar',
  component: HeaderBar,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    actions: { control: 'text' },
    drawerWidth: { control: 'number' },
  },
} satisfies Meta<typeof HeaderBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    title: 'Sample Header',
    drawerWidth: 240,
  },
};

export const WithAction: Story = {
  args: {
    title: 'Sample Header',
    drawerWidth: 240,
    actions: 'Action',
  },
};

export const WithDarkModeToggle: Story = {
  args: {
    title: 'Sample Header',
    drawerWidth: 240,
    actions: createElement(DarkModeToggle),
  },
};

export const Collapsed: Story = {
  args: {
    title: 'Sample Header',
    drawerWidth: 90,
  },
};
