import type { Load } from '@/types/Load';

import { lazy, Suspense, useState } from 'react';

import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';

import useFilterModel from '@/hooks/useFilterModel';
import useFetchLoads from '@/hooks/useFetchLoads';

import FreightLoadsTemplate from '@/templates/FreightLoadsTemplate';
import SearchInput from '@/components/inputs/SearchInput';
import FilterPills from '@/components/filters/FilterPills';

const LoadsTable = lazy(() => import('@/components/tables/LoadsTable'));

function FreightLoadsPage() {
  const [search, setSearch] = useState('');
  const filterModel = useFilterModel<Load>();

  const { loads, isLoading, error } = useFetchLoads();

  if (isLoading) {
    return (
      <FreightLoadsTemplate>
        <SearchInput
          isLoading={isLoading}
          placeholder="Search Loads..."
          ariaLabel="Search Loads"
          onSearchChange={() => {
            // void
          }}
        />

        <FilterPills
          filters={{}}
          onDeleteFilter={() => {
            // void
          }}
        />

        <Skeleton variant="rectangular" width="100%" height="100%" />
      </FreightLoadsTemplate>
    );
  }

  if (error) {
    return (
      <FreightLoadsTemplate>
        <SearchInput
          isLoading={isLoading}
          placeholder="Search Loads..."
          ariaLabel="Search Loads"
          onSearchChange={setSearch}
        />

        <FilterPills
          filters={{}}
          onDeleteFilter={() => {
            // void
          }}
        />
        <Alert severity="error">Error: {error.message || 'Unknown error'}</Alert>
      </FreightLoadsTemplate>
    );
  }

  return (
    <FreightLoadsTemplate>
      <SearchInput
        placeholder="Search Loads..."
        ariaLabel="Search Loads"
        onSearchChange={setSearch}
      />

      <FilterPills
        filters={filterModel.filters}
        onDeleteFilter={filterModel.onDeleteFilter}
      />

      <Suspense fallback={<Skeleton variant="rectangular" width="100%" height="100%" />}>
        <LoadsTable
          loads={loads}
          search={search}
          onReady={filterModel.onReady}
          onFilterChange={filterModel.onFilterChange}
        />
      </Suspense>
    </FreightLoadsTemplate>
  );
}

export default FreightLoadsPage;
