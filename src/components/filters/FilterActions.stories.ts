import type { Meta, StoryObj } from '@storybook/tanstack-react';

import { fn } from 'storybook/test';

import FilterActions from './FilterActions';

const meta = {
  title: 'components/filters/FilterActions',
  component: FilterActions,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClear: { action: 'onClear' },
    onClose: { action: 'onClose' },
  },
} satisfies Meta<typeof FilterActions>;

export default meta;
type Story = StoryObj<typeof meta>;

const createCallbacks = () => ({
  onClear: fn(),
  onClose: fn(),
});

export const Default: Story = {
  args: createCallbacks(),
};
