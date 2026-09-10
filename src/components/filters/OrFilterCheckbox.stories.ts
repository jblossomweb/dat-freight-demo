import type { Meta, StoryObj } from '@storybook/tanstack-react';

import { fn } from 'storybook/test';

import OrFilterCheckbox from './OrFilterCheckbox';

const meta = {
  title: 'components/filters/OrFilterCheckbox',
  component: OrFilterCheckbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    onValueChange: { action: 'onValueChange' },
  },
} satisfies Meta<typeof OrFilterCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  args: {
    checked: false,
    onValueChange: fn(),
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    onValueChange: fn(),
  },
};
