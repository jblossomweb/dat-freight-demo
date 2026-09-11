import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

import Link from '@/components/app/Link';

function HomePage() {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
        Welcome to the Home Page!
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
        This is a demo app as part of my application to a Senior Frontend
        Software Engineer role at{' '}
        <Link
          href="https://www.dat.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          DAT Freight & Analytics
        </Link>.
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ mb: 4 }}>
        Use the left navigation menu to access different sections of the app.
        Feel free to click around and explore the various features:
      </Typography>
      <Box sx={{ flexDirection: 'row', display: 'flex', gap: 4 }}>
        <Box sx={{ width: '75%' }}>
          <Typography variant="h5" gutterBottom>
            Main Features:
          </Typography>
          <List
            sx={{
              listStyleType: 'disc',
              pl: 4,
              '& em': { fontWeight: 'bold' },
            }}
          >
            <ListItem sx={{ display: 'list-item' }}>
              <em>View all available freight loads</em> with complete information
              including company, locations, weight, equipment type, date, price,
              distance, and current status.
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              <em>Search across loads</em> to quickly find shipments matching
              specific criteria, with results updating as I type.
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              <em>Sort the load list</em> by any field in ascending or descending
              order to prioritize based on business needs.
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              <em>Filter loads</em> using multiple criteria simultaneously to
              narrow down to exactly what I need.
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              <em>Navigate through large datasets</em> efficiently without
              performance degradation.
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              <em>Use keyboard-only navigation</em> to work efficiently without
              switching between keyboard and mouse.
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              <em>Access all functionality with assistive technologies</em> as
              some of our dispatchers rely on screen readers.
            </ListItem>
          </List>
          <Typography variant="h5" gutterBottom>
            Additional Features:
          </Typography>
          <List
            sx={{
              listStyleType: 'disc',
              pl: 4,
              '& em': { fontWeight: 'bold' },
            }}
          >
            <ListItem sx={{ display: 'list-item' }}>
              <em>Load Details page</em> with a sample map. (Click any Load ID from the table)
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              <em>Stats page</em> with some pie charts. (Access from main navigation menu)
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              <em>Storybook implementation</em> with a style guide. (Link to build: coming soon!)
            </ListItem>
          </List>
        </Box>
        <Box sx={{ width: '25%' }}>
          <Typography variant="h5" gutterBottom>
            Links:
          </Typography>
          <List
            sx={{
              listStyleType: 'disc',
              '& em': { fontWeight: 'bold' },
            }}
          >
            <ListItem>
              <Link
                href="http://dat-freight-demo-storybook.s3-website-us-west-2.amazonaws.com/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1.5 }}
              >
                <AutoStoriesIcon
                  sx={{ fontSize: '1.1em', verticalAlign: 'middle', mr: 0.5 }}
                />{' '}
                Component Library
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="https://github.com/jblossomweb/dat-freight-demo"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1.5 }}
              >
                <GitHubIcon
                  sx={{ fontSize: '1.1em', verticalAlign: 'middle', mr: 0.5 }}
                />{' '}
                GitHub Repository
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="https://www.linkedin.com/in/jbweb/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1.5 }}
              >
                <LinkedInIcon
                  sx={{ fontSize: '1.1em', verticalAlign: 'middle', mr: 0.5 }}
                />{' '}
                My LinkedIn Profile
              </Link>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
