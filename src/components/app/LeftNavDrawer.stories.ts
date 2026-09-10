import type { Meta, StoryObj } from '@storybook/tanstack-react';

import { fn } from 'storybook/test';
import { createElement } from 'react';

import LogoBox from '@/components/app/LogoBox';
import LeftNavDrawer from './LeftNavDrawer';

const meta = {
  title: 'components/app/LeftNavDrawer',
  component: LeftNavDrawer,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'number' },
    branding: { control: 'text' },
    currentPath: { control: 'text' },
    open: { control: 'boolean' },
    toggleDrawer: { action: false },
  },
} satisfies Meta<typeof LeftNavDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    width: 240,
    branding: 'SAMPLE',
    currentPath: '/',
    open: true,
    toggleDrawer: fn(),
  },
};

export const Branded: Story = {
  args: {
    width: 240,
    branding: createElement(LogoBox, { width: 240 * .6 }),
    currentPath: '/',
    open: true,
    toggleDrawer: fn(),
  },
};

export const Collapsed: Story = {
  args: {
    width: 90,
    branding: createElement(LogoBox, { width: 240 * .6 }),
    currentPath: '/',
    open: false,
    toggleDrawer: fn(),
  },
};
