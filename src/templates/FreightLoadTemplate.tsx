import type { DataSource } from '@/types/DataSource';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from '@/components/app/Link';

interface FreightLoadTemplateProps {
  dataSource: DataSource;
  header: React.ReactNode;
  children: React.ReactNode;
}

const FreightLoadTemplate: React.FC<FreightLoadTemplateProps> = ({
  dataSource,
  header,
  children,
}) => (
  <Box
    sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Link to="/freight-loads" search={{ dataSource }}>
      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
        <ArrowBackIcon sx={{ fontSize: 18 }} aria-hidden="true" />
        Back to freight loads
      </Box>
    </Link>
    <Typography variant="h5" gutterBottom>
      {header}
    </Typography>
    {children}
  </Box>
);

export default FreightLoadTemplate;
