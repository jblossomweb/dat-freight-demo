import type { ColDef, GridApi } from 'ag-grid-community';
import type { FilterModel } from '../types/Filter';

import { useMemo, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import { AgGridReact } from 'ag-grid-react';
import {
  ModuleRegistry,
  AllCommunityModule,
} from 'ag-grid-community';

import getFilterAnnouncement from '../utils/getFilterAnnouncement';
import getTableDataStatus from '../utils/getTableDataStatus';

import useGridTheme from '../hooks/useGridTheme';
import useAnnouncement from '../hooks/useAnnouncement';
import AriaAnnouncement from '../components/AriaAnnouncement';

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
  const gridTheme = useGridTheme();
  const totalRowCount = rowData?.length ?? 0;
  const [displayedRowCount, setDisplayedRowCount] = useState(totalRowCount);
  const announcement = useAnnouncement();
  const lastSearchRef = useRef(searchQuery);

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
        // override AG Grid's default right-aligned header styles for numeric columns
        '& .ag-right-aligned-header': {
          '& .ag-cell-label-container': {
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
          },
          '& .ag-header-cell-label': {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            '& .ag-header-cell-text, & .ag-sort-indicator-container': {
              textAlign: 'left',
            },
          },
        },
      }}
    >
      <AriaAnnouncement>
        {announcement.text}
      </AriaAnnouncement>
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
          const newRowCount = event.api.getDisplayedRowCount();
          const newSearch = event.api.getQuickFilter();
          const newFilterModel: FilterModel = event.api.getFilterModel();
          const lastSearch = lastSearchRef.current;
          lastSearchRef.current = newSearch ?? '';

          announcement.announce(
            getFilterAnnouncement({
              searchQuery: newSearch,
              lastSearch,
              filterModel: newFilterModel,
              filteredRowCount: newRowCount,
              totalRowCount,
              rowUnits,
            }),
          );
          onFilterChange?.(newFilterModel);
        }}
        onSortChanged={(event) => {
          const newColumnStates = event.api.getColumnState();
          const newSort = newColumnStates.find(col => col.sort !== null);

          if (newSort) {
            announcement.announce(
              `Sort by ${
                // uppercase so 'id' reads better
                newSort.colId.toUpperCase()
              } (${
                newSort.sort === 'asc' ? 'ascending' : 'descending'
              }).`,
            );
          } else {
            announcement.announce('Sort cleared.');
          }
        }}
        animateRows={true}
        ensureDomOrder={true}
        pagination={!!pageSize && !!pageSizes}
        paginationPageSize={pageSize}
        paginationPageSizeSelector={pageSizes}
        paginationPanels={['pageSize', 'pageNumbers']}
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
        {getTableDataStatus(displayedRowCount, totalRowCount, rowUnits)}
      </Box>
    </Box>
  );
}

export default TableGrid;
