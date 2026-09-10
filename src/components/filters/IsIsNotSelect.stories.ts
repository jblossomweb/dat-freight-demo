import type { Meta, StoryObj } from '@storybook/tanstack-react';

import { fn } from 'storybook/test';

import IsIsNotSelect from './IsIsNotSelect';

const meta = {
  title: 'components/filters/IsIsNotSelect',
  component: IsIsNotSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'radio', options: ['is', 'isNot'] },
    onValueChange: { action: 'onValueChange' },
  },
} satisfies Meta<typeof IsIsNotSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Is: Story = {
  args: {
    value: 'is',
    onValueChange: fn(),
  },
};

export const IsNot: Story = {
  args: {
    value: 'isNot',
    onValueChange: fn(),
  },
};
