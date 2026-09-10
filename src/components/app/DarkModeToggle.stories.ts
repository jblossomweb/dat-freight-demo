import type { Meta, StoryObj } from '@storybook/tanstack-react';

import DarkModeToggle from './DarkModeToggle';

const meta = {
  title: 'components/app/DarkModeToggle',
  component: DarkModeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DarkModeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
