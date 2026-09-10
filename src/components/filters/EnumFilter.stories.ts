import type { Meta, StoryObj } from '@storybook/tanstack-react';

import { createElement } from 'react';
import { fn } from 'storybook/test';

import type { EnumFilterModel } from '@/types/Filter';
import type { EquipmentType, Load } from '@/types/Load';

import EquipmentLabel from '@/components/labels/EquipmentLabel';

import EnumFilter from './EnumFilter';

type EquipmentEnumFilterProps = Parameters<typeof EnumFilter<Load, EquipmentType>>[0];

const EquipmentEnumFilter = (props: EquipmentEnumFilterProps) => createElement(
  EnumFilter<Load, EquipmentType>,
  props,
);

const equipmentOptions: EquipmentType[] = [
  'Flatbed',
  'Reefer',
  'Van',
];

const createFilterProps = (
  model: EnumFilterModel<EquipmentType> | null,
): EquipmentEnumFilterProps => ({
  api: {
    hidePopupMenu: fn(),
  },
  model,
  onModelChange: fn(),
  fieldKey: 'equipmentType',
  options: equipmentOptions,
  ariaLabel: 'Equipment Type',
  secondAriaLabel: 'Second Type',
  emptyValueLabel: 'Any Type',
  emptyRequiredValueLabel: 'Select Type',
  renderValue: (equipmentType: EquipmentType) => createElement(
    EquipmentLabel,
    { equipmentType },
  ),
} as unknown as EquipmentEnumFilterProps);

const meta = {
  title: 'components/filters/EnumFilter',
  component: EquipmentEnumFilter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fieldKey: { control: 'text' },
    options: { control: 'object' },
    ariaLabel: { control: 'text' },
    secondAriaLabel: { control: 'text' },
    emptyValueLabel: { control: 'text' },
    emptyRequiredValueLabel: { control: 'text' },
  },
} satisfies Meta<EquipmentEnumFilterProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: createFilterProps(null),
  render: args => createElement(EquipmentEnumFilter, args),
};

export const Selected: Story = {
  args: createFilterProps({
    filterType: 'text',
    type: 'equals',
    filter: 'Van',
  }),
  render: args => createElement(EquipmentEnumFilter, args),
};

export const TwoValues: Story = {
  args: createFilterProps({
    operator: 'OR',
    conditions: [
      { filterType: 'text', type: 'equals', filter: 'Flatbed' },
      { filterType: 'text', type: 'equals', filter: 'Reefer' },
    ],
  }),
  render: args => createElement(EquipmentEnumFilter, args),
};

export const NotEqual: Story = {
  args: createFilterProps({
    filterType: 'text',
    type: 'notEqual',
    filter: 'Reefer',
  }),
  render: args => createElement(EquipmentEnumFilter, args),
};
