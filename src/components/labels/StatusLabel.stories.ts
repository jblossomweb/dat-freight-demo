import type { Meta, StoryObj } from '@storybook/tanstack-react';

import StatusLabel from './StatusLabel';

const meta = {
  title: 'components/labels/StatusLabel',
  component: StatusLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['Available', 'In Transit', 'Delivered'] },
  },
} satisfies Meta<typeof StatusLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Available: Story = {
  args: {
    status: 'Available',
  },
};

export const InTransit: Story = {
  args: {
    status: 'In Transit',
  },
};

export const Delivered: Story = {
  args: {
    status: 'Delivered',
  },
};
