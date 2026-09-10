import type { ColDef, GridApi } from 'ag-grid-community';
import type { Load, LoadStatus, EquipmentType } from '../types/Load';
import type { FilterModel } from '../types/Filter';
import type { GridSortRule } from './TableGrid';

import { currencyFormatter, numberFormatter } from '../utils/gridFormatters';
import { dateStringComparator } from '../utils/gridComparators';

import TableGrid from './TableGrid';
import StatusFilter from './StatusFilter';
import StatusLabel from './StatusLabel';
import EquipmentFilter from './EquipmentFilter';
import EquipmentLabel from './EquipmentLabel';

interface LoadsTableProps {
  loads: Load[];
  search?: string;
  onReady: (api: GridApi<Load>) => void;
  onFilterChange: (filterModel: FilterModel) => void;
}

const EquipmentCellRenderer = (
  params: { value?: EquipmentType },
) => (
  <EquipmentLabel equipmentType={params.value} />
);

const StatusCellRenderer = (
  params: { value?: LoadStatus },
) => (
  <StatusLabel status={params.value} />
);

const initialSort: GridSortRule[] = [
  { colId: 'id', sort: 'asc' },
];

const allColumns: ColDef<Load>[] = [
  {
    field: 'id', headerName: 'ID', width: 120 },
  { field: 'companyName', headerName: 'Company', width: 200 },
  { field: 'origin', headerName: 'Origin', width: 160 },
  { field: 'destination', headerName: 'Destination', width: 160 },
  {
    field: 'weight',
    headerName: 'Weight (pounds)',
    width: 190,
    valueFormatter: numberFormatter<Load>,
    type: 'numericColumn',
  },
  {
    field: 'equipmentType',
    headerName: 'Type',
    width: 120,
    filter: EquipmentFilter,
    cellRenderer: EquipmentCellRenderer,
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 120,
    comparator: dateStringComparator,
  },
  {
    field: 'price',
    headerName: 'Price (USD)',
    width: 160,
    valueFormatter: currencyFormatter<Load>,
    type: 'numericColumn',
  },
  {
    field: 'distance',
    headerName: 'Distance (miles)',
    width: 190,
    valueFormatter: numberFormatter<Load>,
    type: 'numericColumn',
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    filter: StatusFilter,
    cellRenderer: StatusCellRenderer,
  },
];

const LoadsTable: React.FC<LoadsTableProps> = ({
  loads,
  search,
  onReady,
  onFilterChange,
}) => (
  <TableGrid<Load>
    rowData={loads}
    rowUnits="loads"
    columnDefs={allColumns}
    pageSize={25}
    pageSizes={[10, 25, 50, 100, 250, 500]}
    searchQuery={search}
    sortModel={initialSort}
    onGridReady={onReady}
    onFilterChange={onFilterChange}
  />
);

export default LoadsTable;
