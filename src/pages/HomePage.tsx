import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function HomePage() {
  return (
    <Box sx={{ width: '100%', maxWidth: 500 }}>
      <Typography variant="body1" gutterBottom>
        Welcome to the Home Page!
      </Typography>
    </Box>
  );
}

export default HomePage;
