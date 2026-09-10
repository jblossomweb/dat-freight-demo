import Box from '@mui/material/Box';

interface FreightLoadsTemplateProps {
  children: React.ReactNode;
}

const FreightLoadsTemplate: React.FC<FreightLoadsTemplateProps> = ({ children }) => (
  <Box
    sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      gap: 1,
    }}
  >
    {children}
  </Box>
);

export default FreightLoadsTemplate;
