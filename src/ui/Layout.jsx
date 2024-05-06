import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

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
          p: 6,
        }}
      >
        <Toolbar />
        <Outlet></Outlet>
      </Box>
    </Box>
  );
};
