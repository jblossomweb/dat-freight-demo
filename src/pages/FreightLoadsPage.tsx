import type { Load } from '@/types/Load';
import type { DataSource } from '@/types/DataSource';

import { useNavigate, useSearch } from '@tanstack/react-router';
import { Suspense } from 'react';
import lazyPreload from '@/utils/lazyPreload';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';

import useDataSource from '@/hooks/useDataSource';
import useFilterModel from '@/hooks/useFilterModel';
import useLoadsJson from '@/hooks/useLoadsJson';
import useLoadsApi from '@/hooks/useLoadsApi';
import usePrefetchApiLoads from '@/hooks/usePrefetchApiLoads';
import useLazyChunks from '@/hooks/useLazyChunks';

import FreightLoadsTemplate from '@/templates/FreightLoadsTemplate';
import SearchInput from '@/components/inputs/SearchInput';
import DataSourceToggle from '@/components/inputs/DataSourceToggle';
import FilterPills from '@/components/filters/FilterPills';

const [LoadsTable, lazyloadLoadsTable] = lazyPreload(
  () => import('@/components/tables/LoadsTable'),
);

function FreightLoadsPage() {
  const from = '/freight-loads';
  const queryStringParams = useSearch({ from });
  const navigate = useNavigate({ from });
  const search = queryStringParams.q ?? '';
  const [dataSource, setDataSource] = useDataSource();
  const filterModel = useFilterModel<Load>();

  const isJson = dataSource === 'json';
  const loadsJson = useLoadsJson(isJson);
  const loadsApi = useLoadsApi(search);

  // fill the cache, so we don't get a loading flash when the table first renders
  const prefetchApiLoads = usePrefetchApiLoads(search, dataSource === 'api');

  // track state of lazy loader
  const lazyTable = useLazyChunks(lazyloadLoadsTable);

  const handleDataSourceChange = (mode: DataSource) => {
    setDataSource(mode);
    filterModel.onFilterChange({});
  };

  const handleSearchChange = (value: string) => {
    void navigate({
      search: (prev) => ({
        ...prev,
        q: value || undefined,
      }),
      replace: true,
    });
  };

  const isDataLoading =  loadsJson.isLoading || loadsApi.isLoading || prefetchApiLoads.isLoading;
  const isGridLoading = isJson ? loadsJson.isLoading : loadsApi.isLoading;
  const isLoading = lazyTable.isLoading || isDataLoading;

  const error = lazyTable.error ?? (isJson
    ? loadsJson.error
    : loadsApi.error ?? prefetchApiLoads.error);

  return (
    <FreightLoadsTemplate>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
        <SearchInput
          placeholder="Search Loads..."
          ariaLabel="Search Loads"
          isLoading={isLoading}
          value={search}
          onSearchChange={handleSearchChange}
        />
        <DataSourceToggle
          value={dataSource}
          onChange={handleDataSourceChange}
        />
      </Box>

      <FilterPills
        filters={filterModel.filters}
        onDeleteFilter={filterModel.onDeleteFilter}
      />

      {error ? (
        <Alert severity="error">{error.message || 'Unable to load freight loads.'}</Alert>
      ) : (
        <Suspense fallback={<Skeleton variant="rectangular" width="100%" height="100%" />}>
          <LoadsTable
            loading={isGridLoading}
            clientLoads={loadsJson.loads}
            serverDatasource={loadsApi.datasource}
            serverTotalRowCount={loadsApi.totalRowCount}
            serverError={loadsApi.error}
            search={search}
            dataSource={dataSource}
            onReady={filterModel.onReady}
            onFilterChange={filterModel.onFilterChange}
          />
        </Suspense>
      )}
    </FreightLoadsTemplate>
  );
}

export default FreightLoadsPage;
