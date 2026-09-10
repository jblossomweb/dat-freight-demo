import type { Meta, StoryObj } from '@storybook/tanstack-react';

import { fn } from 'storybook/test';

import SearchInput from './SearchInput';

const meta = {
  title: 'components/inputs/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onSearchChange: { action: 'onSearchChange' },
    placeholder: { control: 'text' },
    ariaLabel: { control: 'text' },
    debounceMs: { control: 'number' },
    width: { control: 'number' },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    onSearchChange: fn(),
    placeholder: 'Search...',
    ariaLabel: 'Search input',
    width: 400,
  },
};
