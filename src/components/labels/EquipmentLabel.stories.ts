import type { Meta, StoryObj } from '@storybook/tanstack-react';

import EquipmentLabel from './EquipmentLabel';

const meta = {
  title: 'components/labels/EquipmentLabel',
  component: EquipmentLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    equipmentType: { control: 'select', options: ['Van', 'Flatbed', 'Reefer'] },
  },
} satisfies Meta<typeof EquipmentLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Van: Story = {
  args: {
    equipmentType: 'Van',
  },
};

export const Flatbed: Story = {
  args: {
    equipmentType: 'Flatbed',
  },
};

export const Reefer: Story = {
  args: {
    equipmentType: 'Reefer',
  },
};
