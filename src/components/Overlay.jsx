import React from 'react';
import { Box } from '@mui/material';

const Overlay = () => {
  // Overlay for video
  return (
    <Box
      component='div'
      sx={{
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: '-1',
        background: 'black',
        opacity: '.5',
      }}></Box>
  );
};

export default Overlay;
