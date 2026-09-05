import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

function StyleGuidePage() {
  return (
    <Box>
      <Box sx={{ width: '100%', marginBottom: 4 }}>
        <Typography variant="h1" gutterBottom>
          Button Variants
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button variant="text">Text</Button>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="contained" color="secondary">Secondary</Button>
        </Box>
      </Box>

      <Box>
        <Box sx={{ width: '100%', marginBottom: 4 }}>
          <Typography variant="h1" gutterBottom>
            Typography
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Typography variant="h1" gutterBottom>
            h1. Heading
          </Typography>
          <Typography variant="h2" gutterBottom>
            h2. Heading
          </Typography>
          <Typography variant="h3" gutterBottom>
            h3. Heading
          </Typography>
          <Typography variant="h4" gutterBottom>
            h4. Heading
          </Typography>
          <Typography variant="h5" gutterBottom>
            h5. Heading
          </Typography>
          <Typography variant="h6" gutterBottom>
            h6. Heading
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
            blanditiis tenetur
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
            blanditiis tenetur
          </Typography>
          <Typography variant="body1" gutterBottom>
            body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
            blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
            neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
            quasi quidem quibusdam.
          </Typography>
          <Typography variant="body2" gutterBottom>
            body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
            blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
            neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
            quasi quidem quibusdam.
          </Typography>
          <Typography variant="button" gutterBottom sx={{ display: 'block' }}>
            button text
          </Typography>
          <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>
            caption text
          </Typography>
          <Typography variant="overline" gutterBottom sx={{ display: 'block' }}>
            overline text
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default StyleGuidePage;
