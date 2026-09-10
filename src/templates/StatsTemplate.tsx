import Box from '@mui/material/Box';

interface StatsTemplateProps {
  children: React.ReactNode;
}

const StatsTemplate: React.FC<StatsTemplateProps> = ({ children }) => (
  <Box sx={{ width: '100%' }}>
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap',
      }}
    >
      {children}
    </Box>
  </Box>
);

export default StatsTemplate;
