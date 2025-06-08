import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Auth from '../utils/auth';

const Layout = () => {
  const navigate = useNavigate();

  // On mount for every component (since all components are children of Layout), check if user is logged in. If not, redirect to login page
  useEffect(() => {
    const user = Auth.getUser();
    if (!user) {
      navigate('/');
    }
  }, [navigate]);
  return (
    <Box sx={{ fontFamily: 'lato, cursive' }}>
      <NavBar />
      <Outlet />
    </Box>
  );
};

export default Layout;
