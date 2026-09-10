import type { Meta, StoryObj } from '@storybook/tanstack-react';

import { createElement, useState } from 'react';
import { fn } from 'storybook/test';

import type { EnumFilterModel } from '@/types/Filter';
import type { EquipmentType } from '@/types/Load';

import EquipmentFilter from './EquipmentFilter';

type EquipmentFilterProps = Parameters<typeof EquipmentFilter>[0];

const createFilterProps = (
  model: EnumFilterModel<EquipmentType> | null,
): EquipmentFilterProps => ({
  api: {
    hidePopupMenu: fn(),
  },
  model,
  onModelChange: fn(),
  onUiChange: fn(),
} as unknown as EquipmentFilterProps);

const StatefulEquipmentFilter = (props: EquipmentFilterProps) => {
  const [model, setModel] = useState(props.model);

  return createElement(EquipmentFilter, {
    ...props,
    model,
    onModelChange: (nextModel) => {
      props.onModelChange(nextModel);
      setModel(nextModel);
    },
  });
};

const meta = {
  title: 'components/filters/EquipmentFilter',
  component: EquipmentFilter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EquipmentFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: createFilterProps(null),
  render: args => createElement(StatefulEquipmentFilter, args),
};

export const Selected: Story = {
  args: createFilterProps({
    filterType: 'text',
    type: 'equals',
    filter: 'Van',
  }),
  render: args => createElement(StatefulEquipmentFilter, args),
};

export const TwoEquipmentTypes: Story = {
  args: createFilterProps({
    operator: 'OR',
    conditions: [
      { filterType: 'text', type: 'equals', filter: 'Flatbed' },
      { filterType: 'text', type: 'equals', filter: 'Reefer' },
    ],
  }),
  render: args => createElement(StatefulEquipmentFilter, args),
};
