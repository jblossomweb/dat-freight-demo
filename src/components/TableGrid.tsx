import type { ColDef, GridApi } from 'ag-grid-community';
import type { FilterModel } from '../types/Filter';

import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';
import { AgGridReact } from 'ag-grid-react';
import {
  themeQuartz,
  colorSchemeDark,
  ModuleRegistry,
  AllCommunityModule,
} from 'ag-grid-community';

import formatNumber from '../utils/formatNumber';

// enable AG Grid's search and filter features
ModuleRegistry.registerModules([AllCommunityModule]);

export interface GridSortRule {
  colId: string;
  sort: 'asc' | 'desc';
}

interface TableGridProps<TData> {
  rowData: TData[] | null;
  rowUnits?: string;
  columnDefs: ColDef<TData>[];
  sortModel?: GridSortRule[];
  searchQuery?: string;
  disableFiltering?: boolean;
  height?: number | string;
  pageSize?: number;
  pageSizes?: number[] | boolean;
  onGridReady?: (api: GridApi<TData>) => void;
  onFilterChange?: (filterModel: FilterModel) => void;
}

function TableGrid<TData>({
  rowData,
  rowUnits = 'rows',
  columnDefs,
  searchQuery = '',
  disableFiltering = false,
  height = '100%',
  pageSize,
  pageSizes,
  onGridReady,
  onFilterChange,
}: TableGridProps<TData>) {
  const { mode } = useColorScheme();
  const totalRowCount = rowData?.length ?? 0;
  const [displayedRowCount, setDisplayedRowCount] = useState(totalRowCount);

  const gridTheme = useMemo(
    () => mode === 'dark'
      ? themeQuartz.withPart(colorSchemeDark)
      : themeQuartz,
    [mode],
  );

  const defaultColDef = useMemo<ColDef<TData>>(
    () => ({
      sortable: true,
      resizable: true,
      filter: !disableFiltering,
      suppressMovable: true,
      suppressHeaderKeyboardEvent: (params) => {
        if (
          params.event.key.toLowerCase() === 'f'
            && 'getColId' in params.column
            && params.column.isFilterAllowed()
        ) {
          params.api.showColumnFilter(params.column);

          return true;
        }

        if (
          ['Delete', 'Backspace'].includes(params.event.key)
            && 'getColId' in params.column
            && params.column.isFilterAllowed()
            && params.column.isFilterActive()
        ) {
          params.api.destroyFilter(params.column);

          return true;
        }

        return false;
      },
    }),
    [disableFiltering],
  );

  return (
    <Box
      sx={{
        width: '100%',
        height,
        minHeight: 300,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '8px',
        overflow: 'hidden',
        bgcolor: 'background.paper',
      }}
    >
      <AgGridReact<TData>
        // key forces fresh render when data array mounts
        key={rowData ? rowData.length : 0}
        rowData={rowData}
        columnDefs={columnDefs}
        theme={gridTheme}
        defaultColDef={defaultColDef}
        quickFilterText={searchQuery}
        onGridReady={(event) => {
          onGridReady?.(event.api);
        }}
        onModelUpdated={(event) => {
          setDisplayedRowCount(event.api.getDisplayedRowCount());
        }}
        onFilterChanged={(event) => {
          onFilterChange?.(event.api.getFilterModel());
        }}
        animateRows={true}
        suppressCellFocus={true}
        ensureDomOrder={true}
        pagination={!!pageSize && !!pageSizes}
        paginationPageSize={pageSize}
        paginationPageSizeSelector={pageSizes}
      />
      <Box
        sx={{
          px: 2,
          py: 1,
          width: '100%',
          textAlign: 'right',
          color: 'text.secondary',
          fontSize: '0.875rem',
        }}
      >
        Showing {formatNumber(displayedRowCount)} of {formatNumber(totalRowCount)} {rowUnits}
      </Box>
    </Box>
  );
}

export default TableGrid;
