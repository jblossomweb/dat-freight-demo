import type { GridApi } from 'ag-grid-community';
import type { FilterModel } from '../types/Filter';

import { useRef, useState } from 'react';

const useFilterModel = <T>() => {
  const [filters, setFilters] = useState<FilterModel>({});
  const gridApiRef = useRef<GridApi<T> | null>(null);

  const onDeleteFilter = (field: string) => {
    const nextModel = { ...gridApiRef.current?.getFilterModel() };
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete nextModel[field];
    gridApiRef.current?.setFilterModel(nextModel);
  };

  const onReady = (api: GridApi<T>) => {
    gridApiRef.current = api;
  };

  const onFilterChange = setFilters;

  return {
    filters,
    onReady,
    onDeleteFilter,
    onFilterChange,
  };
};

export default useFilterModel;
