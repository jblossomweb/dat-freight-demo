import type { Meta, StoryObj } from '@storybook/tanstack-react';

import AppLayout from './AppLayout';

const meta = {
  title: 'layout/AppLayout',
  component: AppLayout,
  parameters: {
    // layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    pageTitle: { control: 'text' },
    currentPath: { control: 'select', options: ['/', '/freight-loads'] },
    children: { control: 'text' },
  },
} satisfies Meta<typeof AppLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Page Content...',
  },
};

export const PageTitle: Story = {
  args: {
    pageTitle: 'Example Page',
    children: 'Page Content...',
  },
};

export const CurrentPath: Story = {
  args: {
    pageTitle: 'Home Page',
    currentPath: '/',
    children: 'Page Content...',
  },
};
