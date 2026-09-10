import type { Meta, StoryObj } from '@storybook/tanstack-react';

import CheckIcon from '@mui/icons-material/Check';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import DryIcon from '@mui/icons-material/Dry';

import LabelBox from './LabelBox';

const meta = {
  title: 'components/labels/LabelBox',
  component: LabelBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    color: { control: 'text' },
    icon: { control: false },
  },
} satisfies Meta<typeof LabelBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Status: Story = {
  args: {
    text: 'Available',
    color: 'status.available',
    icon: Inventory2OutlinedIcon,
  },
};

export const Equipment: Story = {
  args: {
    text: 'Reefer',
    color: 'equipment.reefer',
    icon: LocalShippingIcon,
  },
};

export const Delivered: Story = {
  args: {
    text: 'Delivered',
    color: 'status.delivered',
    icon: CheckIcon,
  },
};

export const LongText: Story = {
  args: {
    text: 'Available for immediate dispatch',
    color: 'text.primary',
    icon: Inventory2OutlinedIcon,
  },
};

export const CustomIcon: Story = {
  args: {
    text: 'Receive Bacon',
    color: 'text.primary',
    icon: DryIcon,
  },
};
