import type { GridApi } from 'ag-grid-community';
import type { FilterModel } from '../types/Filter';

import { useMemo, useRef, useState } from 'react';

import Box from '@mui/material/Box';

import TableGrid, { type GridSortRule } from '../components/TableGrid';
import SearchInput from '../components/SearchInput';
import FilterPills from '../components/FilterPills';

import { currencyFormatter, numberFormatter } from '../utils/gridFormatters';
import { dateStringComparator } from '../utils/gridComparators';

import loadData from '../data/10000Loads.json';

type Loads = typeof loadData.loads;
type Load = Loads[number];

function FreightLoadsPage() {
  const rowData = loadData.loads;
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModel, setFilterModel] = useState<FilterModel>({});
  const gridApiRef = useRef<GridApi<Load> | null>(null);

  const initialSort = useMemo<GridSortRule[]>(() => [
    { colId: 'id', sort: 'asc' },
  ], []);

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: 2,
        }}
      >
        <SearchInput onSearchChange={setSearchQuery} />
      </Box>

      <FilterPills
        filters={filterModel}
        onDeleteFilter={(field) => {
          const nextModel = { ...gridApiRef.current?.getFilterModel() };
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete nextModel[field];
          gridApiRef.current?.setFilterModel(nextModel);
        }}
      />

      <TableGrid<Load>
        rowData={rowData}
        columnDefs={[
          { field: 'id', headerName: 'ID', width: 120 },
          { field: 'companyName', headerName: 'Company', width: 200 },
          { field: 'origin', headerName: 'Origin', width: 160 },
          { field: 'destination', headerName: 'Destination', width: 160 },
          {
            field: 'weight',
            headerName: 'Weight (lbs)',
            width: 150,
            valueFormatter: numberFormatter<Load>,
            type: 'numericColumn',
          },
          { field: 'equipmentType', headerName: 'Type', width: 100 },
          {
            field: 'date',
            headerName: 'Date',
            width: 120,
            comparator: dateStringComparator,
          },
          {
            field: 'price',
            headerName: 'Price (USD)',
            width: 150,
            valueFormatter: currencyFormatter<Load>,
            type: 'numericColumn',
          },
          {
            field: 'distance',
            headerName: 'Distance (mi)',
            width: 150,
            valueFormatter: numberFormatter<Load>,
            type: 'numericColumn',
          },
          { field: 'status', headerName: 'Status', width: 120 },
        ]}
        searchQuery={searchQuery}
        sortModel={initialSort}
        onGridReady={(api) => {
          gridApiRef.current = api;
        }}
        onFilterChange={setFilterModel}
      />
    </Box>
  );
}

export default FreightLoadsPage;
