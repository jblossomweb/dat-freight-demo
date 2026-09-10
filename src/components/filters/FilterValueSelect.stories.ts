import type { Meta, StoryObj } from '@storybook/tanstack-react';

import { fn } from 'storybook/test';

import FilterValueSelect from './FilterValueSelect';

const equipmentOptions = ['Van', 'Flatbed', 'Reefer'];

const meta = {
  title: 'components/filters/FilterValueSelect',
  component: FilterValueSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ariaLabel: { control: 'text' },
    operator: { control: 'text' },
    value: { control: 'text' },
    options: { control: 'object' },
    showEmptyValue: { control: 'boolean' },
    emptyValueDisplay: { control: 'text' },
    onValueChange: { action: 'onValueChange' },
  },
} satisfies Meta<typeof FilterValueSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: {
    ariaLabel: 'Equipment Type',
    operator: 'is',
    value: 'Van',
    options: equipmentOptions,
    onValueChange: fn(),
  },
};

export const Empty: Story = {
  args: {
    ariaLabel: 'Equipment Type',
    operator: 'is',
    value: '',
    options: equipmentOptions,
    showEmptyValue: true,
    emptyValueDisplay: 'Any Type',
    onValueChange: fn(),
  },
};

export const CustomRenderedValue: Story = {
  args: {
    ariaLabel: 'Status',
    operator: 'isNot',
    value: 'Available',
    options: ['Available', 'In Transit', 'Delivered'],
    renderValue: value => value === '' ? 'Any Status' : value.toUpperCase(),
    onValueChange: fn(),
  },
};

export const ManyOptions: Story = {
  args: {
    ariaLabel: 'Location',
    operator: 'contains',
    value: 'Chicago',
    options: [
      'Chicago',
      'Dallas',
      'Denver',
      'Houston',
      'Los Angeles',
      'New York',
      'Phoenix',
      'Seattle',
    ],
    onValueChange: fn(),
  },
};
