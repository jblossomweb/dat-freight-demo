import type { Meta, StoryObj } from '@storybook/tanstack-react';

import { createElement } from 'react';

import EquipmentLabel from '@/components/labels/EquipmentLabel';
import StatusLabel from '@/components/labels/StatusLabel';

import PieChart from './PieChart';

const meta = {
  title: 'components/charts/PieChart',
  component: PieChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    data: { control: 'object' },
    renderLabel: { control: false },
  },
} satisfies Meta<typeof PieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Equipment: Story = {
  args: {
    title: 'Equipment Type',
    data: [
      { label: 'Flatbed', value: 11, color: 'var(--mui-palette-equipment-flatbed)' },
      { label: 'Reefer', value: 5, color: 'var(--mui-palette-equipment-reefer)' },
      { label: 'Van', value: 8, color: 'var(--mui-palette-equipment-van)' },
    ],
    renderLabel: label => createElement(EquipmentLabel, { equipmentType: label as 'Flatbed' | 'Reefer' | 'Van' }),
  },
};

export const Status: Story = {
  args: {
    title: 'Load Status',
    data: [
      { label: 'Available', value: 12, color: 'var(--mui-palette-status-available)' },
      { label: 'In Transit', value: 6, color: 'var(--mui-palette-status-inTransit)' },
      { label: 'Delivered', value: 5, color: 'var(--mui-palette-status-delivered)' },
    ],
    renderLabel: label => createElement(StatusLabel, { status: label as 'Available' | 'In Transit' | 'Delivered' }),
  },
};

export const CustomLabels: Story = {
  args: {
    title: 'Shipment Mix',
    data: [
      { label: 'Local', value: 18, color: 'var(--mui-palette-primary-main)' },
      { label: 'Regional', value: 12, color: 'var(--mui-palette-info-main)' },
      { label: 'Long haul', value: 7, color: 'var(--mui-palette-warning-main)' },
    ],
    renderLabel: label => label,
  },
};
