import type { Meta, StoryObj } from '@storybook/tanstack-react';

import { fn } from 'storybook/test';

import DataSourceToggle from './DataSourceToggle';

const meta = {
  title: 'components/inputs/DataSourceToggle',
  component: DataSourceToggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onChange: { action: 'onChange' },
  },
} satisfies Meta<typeof DataSourceToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SampleLoads: Story = {
  args: {
    value: 'json',
    onChange: fn(),
  },
};

export const DatabaseApi: Story = {
  args: {
    value: 'api',
    onChange: fn(),
  },
};
