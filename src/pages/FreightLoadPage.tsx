import type { Load } from '@/types/Load';

import { useParams } from '@tanstack/react-router';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import loadsData from '@/data/mockLoads.json';
import Link from '@/components/app/Link';
import LoadRouteMap from '@/components/maps/LoadRouteMap';

function FreightLoadPage() {
  const { id } = useParams({
    from: '/freight-load/$id',
  });

  const loads = (loadsData as { loads: Load[] }).loads;
  const load = loads.find(load => load.id === id);

  if (!load) {
    return (
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <Typography variant="h2" gutterBottom>
          Load {id} not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Link to="/freight-loads">
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
          <ArrowBackIcon sx={{ fontSize: 18 }} aria-hidden="true" />
          Back to freight loads
        </Box>
      </Link>
      <Typography variant="h2" gutterBottom>
        {`${load.id} for ${load.companyName}`}
      </Typography>
      <LoadRouteMap
        origin={load.origin}
        destination={load.destination}
        height="100%"
      />
    </Box>
  );
}

export default FreightLoadPage;
