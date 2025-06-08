import React from 'react';
import { Card, CardMedia, CardContent, Typography, Modal, useMediaQuery, Button } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  maxWidth: '500px',
  color: 'rgb(0, 0, 128)',
  backgroundColor: 'rgb(240, 234, 214)',
  border: '2px solid rgb(0, 0, 128)',
  boxShadow: 24,
};

// Modal component for matches
const MatchModal = ({ isModalOpen, setIsModalOpen, matchData, isMatchLoading }) => {
  const isNonMobile = useMediaQuery('(min-width: 440px)');
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal open={isModalOpen} onClose={handleClose} aria-labelledby='dog-match' aria-describedby='dog-description'>
      <Card sx={{ ...modalStyle, p: isNonMobile ? 4 : 2 }}>
        {isMatchLoading && (
          <Typography component='p' variant='h6' sx={{ marginInline: 'auto' }}>
            Loading...
          </Typography>
        )}
        {!isMatchLoading && matchData && (
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant='h5' component='h4'>
              <em>Congratulations! You've been matched with:</em>
            </Typography>
            <Button onClick={handleClose} sx={{ position: 'absolute', right: '0', top: '0', color: 'rgb(0, 0, 128)' }}>
              X
            </Button>
            <CardMedia component='img' alt={`${matchData.name} the ${matchData.breed}`} height='250' sx={{ objectFit: 'contain', marginBlock: '1rem' }} image={matchData.img} />
            <Typography gutterBottom variant='h2' fontWeight='bold' component='h4'>
              {matchData.name}
            </Typography>
            <Typography variant='body1'>{matchData.breed}</Typography>
            <Typography variant='body2'>Age: {matchData.age}</Typography>
          </CardContent>
        )}
      </Card>
    </Modal>
  );
};

export default MatchModal;
