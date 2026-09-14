import { useParams, useSearch } from '@tanstack/react-router';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';

import useDataSource from '@/hooks/useDataSource';
import useFetchLoad from '@/hooks/useFetchLoad';
import formatNumber from '@/utils/formatNumber';
import FreightLoadTemplate from '@/templates/FreightLoadTemplate';
import DataSourceToggle from '@/components/inputs/DataSourceToggle';
import EquipmentLabel from '@/components/labels/EquipmentLabel';
import StatusLabel from '@/components/labels/StatusLabel';
import LoadRouteMap from '@/components/maps/LoadRouteMap';

function FreightLoadPage() {
  const path = '/freight-load/$id';
  const urlParams = useParams({ from: path });
  const queryStringParams = useSearch({ from: path });
  const [storedDataSource] = useDataSource();
  const dataSource = (queryStringParams.dataSource ?? storedDataSource);

  const { data: load, isLoading, error } = useFetchLoad(urlParams.id, dataSource);

  return (
    <FreightLoadTemplate
      header={(
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 1 }}>
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
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, mb: 1 }}>
              <DataSourceToggle readOnly value={dataSource} />
              <EquipmentLabel equipmentType={load?.equipmentType} />
              <StatusLabel status={load?.status} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5, fontSize: '0.875rem', textAlign: 'right' }}>
            <Box>{load ? new Date(load.date).toLocaleString('en-us',{ dateStyle: 'long' }) : ''}</Box>
            <Box>{load ? `${formatNumber(load.distance)} miles` : ''}</Box>
            <Box>{load ? `${formatNumber(load.weight)} pounds` : ''}</Box>
          </Box>
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
