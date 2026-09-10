import type { Meta, StoryObj } from '@storybook/tanstack-react';

import { fn } from 'storybook/test';

import type { FilterModel } from '@/types/Filter';

import FilterPills from './FilterPills';

const meta = {
  title: 'components/filters/FilterPills',
  component: FilterPills,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    filters: { control: 'object' },
    onDeleteFilter: { action: 'onDeleteFilter' },
  },
} satisfies Meta<typeof FilterPills>;

export default meta;
type Story = StoryObj<typeof meta>;

const emptyFilters: FilterModel = {};

const singleFilter: FilterModel = {
  status: {
    filterType: 'text',
    type: 'equals',
    filter: 'Available',
  },
};

const multipleFilters: FilterModel = {
  status: {
    filterType: 'text',
    type: 'equals',
    filter: 'Available',
  },
  equipmentType: {
    filterType: 'set',
    values: ['Van', 'Reefer'],
  },
  price: {
    filterType: 'number',
    type: 'greaterThanOrEqual',
    filter: 1000,
  },
};

const combinedFilters: FilterModel = {
  origin: {
    operator: 'OR',
    conditions: [
      { filterType: 'text', type: 'equals', filter: 'Chicago' },
      { filterType: 'text', type: 'equals', filter: 'Dallas' },
    ],
  },
  distance: {
    filterType: 'number',
    type: 'inRange',
    filter: 100,
    filterTo: 500,
  },
};

export const Empty: Story = {
  args: {
    filters: emptyFilters,
    onDeleteFilter: fn(),
  },
};

export const Single: Story = {
  args: {
    filters: singleFilter,
    onDeleteFilter: fn(),
  },
};

export const Multiple: Story = {
  args: {
    filters: multipleFilters,
    onDeleteFilter: fn(),
  },
};

export const Combined: Story = {
  args: {
    filters: combinedFilters,
    onDeleteFilter: fn(),
  },
};
