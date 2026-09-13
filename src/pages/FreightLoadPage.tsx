import { useParams, useSearch } from '@tanstack/react-router';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';

import useDataSource from '@/hooks/useDataSource';
import useFetchLoad from '@/hooks/useFetchLoad';
import FreightLoadTemplate from '@/templates/FreightLoadTemplate';
import DataSourceToggle from '@/components/inputs/DataSourceToggle';
import LoadRouteMap from '@/components/maps/LoadRouteMap';

function FreightLoadPage() {
  const path = '/freight-load/$id';
  const urlParams = useParams({ from: path });
  const queryString = useSearch({ from: path });
  const [storedDataSource] = useDataSource();
  const dataSource = (queryString.dataSource ?? storedDataSource);

  const { data: load, isLoading, error } = useFetchLoad(urlParams.id, dataSource);

  return (
    <FreightLoadTemplate
      header={(
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {load ? `${load.id} for ${load.companyName}` : urlParams.id}
            {isLoading && (
              <CircularProgress
                color="primary"
                size={18}
                enableTrackSlot
                aria-label="Loading…"
              />
            )}
          </Box>
          <DataSourceToggle readOnly value={dataSource} />
        </Box>
      )}
    >
      {isLoading ? (
        <Skeleton variant="rectangular" width="100%" height="100%" />
      ) : error || !load ? (
        <Alert severity="error">Error: {error?.message ?? 'Unknown error'}</Alert>
      ) : (
        <LoadRouteMap
          origin={load.origin}
          destination={load.destination}
          height="100%"
        />
      )}
    </FreightLoadTemplate>
  );
}

export default FreightLoadPage;
