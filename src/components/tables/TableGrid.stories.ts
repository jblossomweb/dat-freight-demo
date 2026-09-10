import type { ColDef } from 'ag-grid-community';
import type { Meta, StoryObj } from '@storybook/tanstack-react';

import { createElement } from 'react';
import { fn } from 'storybook/test';
import Box from '@mui/material/Box';

import type { Load } from '@/types/Load';
import loadsData from '@/data/mockLoads.json';

import TableGrid from './TableGrid';

type DemoTableGridProps = Parameters<typeof TableGrid<Load>>[0];

const demoColumns: ColDef<Load>[] = [
  { field: 'id', headerName: 'ID', width: 120 },
  { field: 'companyName', headerName: 'Company', width: 200 },
  { field: 'origin', headerName: 'Origin', width: 160 },
  { field: 'destination', headerName: 'Destination', width: 160 },
  { field: 'weight', headerName: 'Weight (pounds)', width: 190, type: 'numericColumn' },
  { field: 'equipmentType', headerName: 'Type', width: 120 },
  { field: 'date', headerName: 'Date', width: 120 },
  { field: 'price', headerName: 'Price (USD)', width: 160, type: 'numericColumn' },
  { field: 'distance', headerName: 'Distance (miles)', width: 190, type: 'numericColumn' },
  { field: 'status', headerName: 'Status', width: 120 },
];

const demoRows = (loadsData as { loads: Load[] }).loads;

const createGridProps = (
  overrides: Partial<DemoTableGridProps> = {},
): DemoTableGridProps => ({
  rowData: demoRows,
  columnDefs: demoColumns,
  rowUnits: 'loads',
  height: 360,
  onGridReady: fn(),
  onFilterChange: fn(),
  ...overrides,
});

const DemoTableGrid = (props: DemoTableGridProps) => createElement(
  TableGrid<Load>,
  props,
);

const meta = {
  title: 'components/tables/TableGrid',
  component: DemoTableGrid,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => createElement(
      Box,
      { sx: { pt: 8 } },
      createElement(Story),
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    rowData: { control: 'object' },
    columnDefs: { control: false },
    height: { control: 'number' },
    pageSize: { control: 'number' },
    pageSizes: { control: 'object' },
    disableFiltering: { control: 'boolean' },
  },
} satisfies Meta<typeof DemoTableGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: createGridProps({ rowData: [] }),
};

export const Populated: Story = {
  args: createGridProps(),
};

export const Pagination: Story = {
  args: createGridProps({
    pageSize: 3,
    pageSizes: [3, 5, 10],
  }),
};

export const NumericHeaders: Story = {
  args: createGridProps({
    disableFiltering: true,
    columnDefs: demoColumns.filter(column => (
      column.field === 'price' || column.field === 'distance'
    )),
  }),
};
