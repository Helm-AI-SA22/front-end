import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" textAlign={'center'}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Helm.ai
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function PageFooter() {
  return (
    <Box 
    sx={{bgcolor: 'white', p: 2, position:'sticky'}}
      component="footer">
      <Typography
        variant="caption"
        align="center"
        color="text.secondary"
        component="p"
      >
      University of Pisa
      </Typography>
      <Copyright />
    </Box>
  );
}