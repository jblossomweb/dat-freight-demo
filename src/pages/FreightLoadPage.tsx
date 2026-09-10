import { useParams } from '@tanstack/react-router';

import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import useFetchLoad from '@/hooks/useFetchLoad';
import FreightLoadTemplate from '@/templates/FreightLoadTemplate';
import LoadRouteMap from '@/components/maps/LoadRouteMap';

function FreightLoadPage() {
  const { id } = useParams({
    from: '/freight-load/$id',
  });

  const { data: load, isLoading, error } = useFetchLoad(id);

  if (isLoading) {
    return (
      <FreightLoadTemplate
        header={(
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {id}
            <CircularProgress
              color="primary"
              size={18}
              enableTrackSlot
              aria-label="Loading…"
            />
          </Box>
        )}
      >
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </FreightLoadTemplate>
    );
  }

  if (error || !load) {
    return (
      <FreightLoadTemplate header={id}>
        <Alert severity="error">Error: {error?.message ?? 'Unknown error'}</Alert>
      </FreightLoadTemplate>
    );
  }

  return (
    <FreightLoadTemplate header={`${load.id} for ${load.companyName}`}>
      <LoadRouteMap
        origin={load.origin}
        destination={load.destination}
        height="100%"
      />
    </FreightLoadTemplate>
  );
}

export default FreightLoadPage;
