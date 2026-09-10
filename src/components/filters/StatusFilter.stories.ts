import type { Meta, StoryObj } from '@storybook/tanstack-react';

import { createElement, useState } from 'react';
import { fn } from 'storybook/test';

import type { EnumFilterModel } from '@/types/Filter';
import type { LoadStatus } from '@/types/Load';

import StatusFilter from './StatusFilter';

type StatusFilterProps = Parameters<typeof StatusFilter>[0];

const createFilterProps = (
  model: EnumFilterModel<LoadStatus> | null,
): StatusFilterProps => ({
  api: {
    hidePopupMenu: fn(),
  },
  model,
  onModelChange: fn(),
  onUiChange: fn(),
} as unknown as StatusFilterProps);

const StatefulStatusFilter = (props: StatusFilterProps) => {
  const [model, setModel] = useState(props.model);

  return createElement(StatusFilter, {
    ...props,
    model,
    onModelChange: (nextModel) => {
      props.onModelChange(nextModel);
      setModel(nextModel);
    },
  });
};

const meta = {
  title: 'components/filters/StatusFilter',
  component: StatusFilter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StatusFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: createFilterProps(null),
  render: args => createElement(StatefulStatusFilter, args),
};

export const Selected: Story = {
  args: createFilterProps({
    filterType: 'text',
    type: 'equals',
    filter: 'Available',
  }),
  render: args => createElement(StatefulStatusFilter, args),
};

export const TwoStatuses: Story = {
  args: createFilterProps({
    operator: 'OR',
    conditions: [
      { filterType: 'text', type: 'equals', filter: 'Available' },
      { filterType: 'text', type: 'equals', filter: 'In Transit' },
    ],
  }),
  render: args => createElement(StatefulStatusFilter, args),
};
