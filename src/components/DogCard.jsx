import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const DogCard = ({ favoritesList, setFavoritesList, dogData: { id, age, breed, img, name, zip_code } }) => {
  // Toggle favorites -> if id exists, remove it; else add it to the favoritesList
  const favoritesHandler = e => {
    if (favoritesList.includes(id)) {
      const newFavorites = favoritesList.filter(favorite => favorite !== id);
      setFavoritesList(newFavorites);
    } else {
      setFavoritesList(prev => [...prev, id]);
    }
  };

  return (
    <Card sx={{ flex: '1 1 300px' }}>
      <CardMedia component='img' alt={name} height='250' image={img} sx={{ objectFit: 'contain' }} />
      <CardContent>
        <Typography gutterBottom variant='h5' component='h3'>
          {name}
        </Typography>
        <Typography variant='h6' color='text.secondary'>
          {breed}
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          {age} years old
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          <em>Zip Code: {zip_code}</em>
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={favoritesHandler}>{favoritesList.includes(id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}</Button>
      </CardActions>
    </Card>
  );
};

export default DogCard;
