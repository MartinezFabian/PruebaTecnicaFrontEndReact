import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Padding } from '@mui/icons-material';

export const Layout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Navbar></Navbar>

      <Box
        component="main"
        sx={{
          overflow: 'hidden',
          flexGrow: 1,
          p: {
            xs: 3, // for mobile
            md: 5, // for desktop
            lg: 10, // for large desktop
          },
        }}
      >
        <Toolbar />
        <Outlet></Outlet>
      </Box>
    </Box>
  );
};
