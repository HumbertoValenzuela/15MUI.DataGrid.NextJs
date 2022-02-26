// React
import * as React from 'react';
// Next
// import Link from '../src/ui/Link';
// Material UI
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import Box from '@mui/material/Box';
import StaticDataGrid from '../src/ui/StaticDataGrid';

export default function Index() {
  // useMediaQuery
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <Grid
      container
      direction='column'
      alignItems={matchesSM ? 'center' : undefined}
    >

      <Grid item style={{ marginTop: '2em', marginLeft: matchesSM ? '0.05em' : '1em' }}>
        <Box sx={{ mt: 10 }}>
          <Typography variant={matchesSM ? 'h6' : 'h4'}>
            Next.js example whit MUI DataGrid
          </Typography>
        </Box>
      </Grid>

      <StaticDataGrid />

    </Grid>



  );
}
