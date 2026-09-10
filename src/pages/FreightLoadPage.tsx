import type { Load } from '@/types/Load';

import { useParams } from '@tanstack/react-router';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import loadsData from '@/data/mockLoads.json';

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
    <Box sx={{ width: '100%', maxWidth: 500 }}>
      <Typography variant="h2" gutterBottom>
        {`${load.id} for ${load.companyName}`}
      </Typography>
      <Box>MAP GOES HERE</Box>
    </Box>
  );
}

export default FreightLoadPage;
