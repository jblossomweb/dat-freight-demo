import type { ColDef, GridApi, IDatasource } from 'ag-grid-community';
import type { Load, LoadStatus, EquipmentType } from '@/types/Load';
import type { FilterModel } from '@/types/Filter';
import type { DataSource } from '@/types/DataSource';
import type { GridSortRule } from './TableGrid';

import { currencyFormatter, numberFormatter } from '@/utils/gridFormatters';
import { dateStringComparator } from '@/utils/gridComparators';

import Link from '@/components/app/Link';
import StatusLabel from '@/components/labels/StatusLabel';
import EquipmentLabel from '@/components/labels/EquipmentLabel';
import EquipmentFilter from '@/components/filters/EquipmentFilter';
import StatusFilter from '@/components/filters/StatusFilter';

import TableGrid from './TableGrid';

interface LoadsTableProps {
  loading?: boolean;
  dataSource: DataSource;
  clientLoads?: Load[];
  serverDatasource?: IDatasource;
  serverTotalRowCount?: number;
  serverError?: Error | null;
  search?: string;
  onReady: (api: GridApi<Load>) => void;
  onFilterChange: (filterModel: FilterModel) => void;
}

const IdCellRenderer = (
  params: { value?: string; dataSource?: DataSource },
) => (
  <Link
    to={'/freight-load/$id'}
    params={{ id: params.value ?? '' }}
    search={{ dataSource: params.dataSource }}
  >
    {params.value}
  </Link>
);

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

const createColumns = (dataSource: DataSource): ColDef<Load>[] => [
  {
    field: 'id',
    headerName: 'ID',
    width: 120,
    cellDataType: 'text',
    filter: 'agTextColumnFilter',
    cellRenderer: IdCellRenderer,
    cellRendererParams: { dataSource },
  },
  {
    field: 'companyName',
    headerName: 'Company',
    cellDataType: 'text',
    filter: 'agTextColumnFilter',
    width: 200,
  },
  {
    field: 'origin',
    headerName: 'Origin',
    cellDataType: 'text',
    filter: 'agTextColumnFilter',
    width: 160,
  },
  {
    field: 'destination',
    headerName: 'Destination',
    cellDataType: 'text',
    filter: 'agTextColumnFilter',
    width: 160,
  },
  {
    field: 'weight',
    headerName: 'Weight (pounds)',
    width: 190,
    cellDataType: 'numeric',
    filter: 'agNumberColumnFilter',
    valueFormatter: numberFormatter<Load>,
    type: 'numericColumn',
  },
  {
    field: 'equipmentType',
    headerName: 'Type',
    width: 120,
    cellDataType: 'text',
    filter: EquipmentFilter,
    cellRenderer: EquipmentCellRenderer,
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 120,
    cellDataType: 'dateString',
    filter: 'agDateColumnFilter',
    comparator: dateStringComparator,
  },
  {
    field: 'price',
    headerName: 'Price (USD)',
    width: 160,
    cellDataType: 'numeric',
    filter: 'agNumberColumnFilter',
    valueFormatter: currencyFormatter<Load>,
    type: 'numericColumn',
  },
  {
    field: 'distance',
    headerName: 'Distance (miles)',
    width: 190,
    cellDataType: 'numeric',
    filter: 'agNumberColumnFilter',
    valueFormatter: numberFormatter<Load>,
    type: 'numericColumn',
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    cellDataType: 'text',
    filter: StatusFilter,
    cellRenderer: StatusCellRenderer,
  },
];

const LoadsTable: React.FC<LoadsTableProps> = ({
  loading,
  dataSource,
  clientLoads,
  serverDatasource,
  serverTotalRowCount,
  search,
  onReady,
  onFilterChange,
}) => (
  <TableGrid<Load>
    // key forces a remount on switch, since AG Grid can't change rowModelType live
    key={dataSource}
    rowData={dataSource === 'json' ? clientLoads ?? null : null}
    rowUnits="loads"
    columnDefs={createColumns(dataSource)}
    loading={loading}
    pageSize={25}
    pageSizes={[10, 25, 50, 100, 250, 500]}
    searchQuery={search}
    sortModel={initialSort}
    rowModelType={dataSource === 'json' ? 'clientSide' : 'infinite'}
    datasource={dataSource === 'api' ? serverDatasource : undefined}
    totalRowCount={dataSource === 'api' ? serverTotalRowCount : undefined}
    onGridReady={onReady}
    onFilterChange={onFilterChange}
  />
);

export default LoadsTable;
