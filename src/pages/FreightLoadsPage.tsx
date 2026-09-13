import type { Load } from '@/types/Load';
import type { DataSource } from '@/types/DataSource';

import { Suspense, useState, useEffect, useCallback } from 'react';
import lazyPreload from '@/utils/lazyPreload';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';

import useDataSource from '@/hooks/useDataSource';
import useFilterModel from '@/hooks/useFilterModel';
import useLoadsJson from '@/hooks/useLoadsJson';
import useLoadsApi from '@/hooks/useLoadsApi';
import usePrefetchApiLoads from '@/hooks/usePrefetchApiLoads';

import FreightLoadsTemplate from '@/templates/FreightLoadsTemplate';
import SearchInput from '@/components/inputs/SearchInput';
import DataSourceToggle from '@/components/inputs/DataSourceToggle';
import FilterPills from '@/components/filters/FilterPills';

const [LoadsTable, lazyloadLoadsTable] = lazyPreload(
  () => import('@/components/tables/LoadsTable'),
);

function FreightLoadsPage() {
  const [search, setSearch] = useState('');
  const [dataSource, setDataSource] = useDataSource();
  const [tableChunkLoading, setTableChunkLoading] = useState(true);
  const [tableChunkError, setTableChunkError] = useState<Error | undefined>();
  const filterModel = useFilterModel<Load>();

  const isJson = dataSource === 'json';
  const loadsJson = useLoadsJson(isJson);
  const loadsApi = useLoadsApi(search);

  // fill the cache, so we don't get a loading flash when the table first renders
  const prefetchApiLoads = usePrefetchApiLoads(search, dataSource === 'api');

  const trackTableChunkLoad = useCallback(() => {
    lazyloadLoadsTable()
      .catch(() => {
        setTableChunkError(new Error('Failed to load code-split table chunk.'));
      })
      .finally(() => {
        setTableChunkLoading(false);
      });
  }, []);

  useEffect(() => {
    lazyloadLoadsTable()
      .catch(() => {
        setTableChunkError(new Error('Failed to load code-split table chunk.'));
      })
      .finally(() => {
        setTableChunkLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   trackTableChunkLoad()
  // }, []);

  const startTableChunkLoad = useCallback(() => {
    setTableChunkLoading(true);
    setTableChunkError(undefined);
    trackTableChunkLoad();
  }, [trackTableChunkLoad]);

  const handleDataSourceChange = (mode: DataSource) => {
    setDataSource(mode);
    startTableChunkLoad();
    filterModel.onFilterChange({});
  };

  const isDataLoading =  loadsJson.isLoading || loadsApi.isLoading || prefetchApiLoads.isLoading;
  const isGridLoading = isJson ? loadsJson.isLoading : loadsApi.isLoading;
  const isLoading = tableChunkLoading || isDataLoading;

  const error = tableChunkError ?? (isJson
    ? loadsJson.error
    : loadsApi.error ?? prefetchApiLoads.error);

  // debug
  // const debug = JSON.stringify({
  //   isLoading: isLoading ? '✅' : '❌',
  //   isGridLoading: isGridLoading ? '✅' : '❌',
  //   tableChunkLoading: tableChunkLoading ? '✅' : '❌',
  //   jsonLoading: loadsJson.isLoading ? '✅' : '❌',
  //   apiLoading: loadsApi.isLoading ? '✅' : '❌',
  //   prefetchApiLoadsLoading: prefetchApiLoads.isLoading ? '✅' : '❌',
  // });

  return (
    <FreightLoadsTemplate>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
        {/* {debug} */}
        <SearchInput
          placeholder="Search Loads..."
          ariaLabel="Search Loads"
          isLoading={isLoading}
          onSearchChange={setSearch}
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
