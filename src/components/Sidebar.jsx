import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery, Box, Divider, Typography, FormControl, Input, InputLabel, Button, Select, MenuItem } from '@mui/material';
import RangeSlider from './RangeSlider';
import { runFireworks } from '../lib/confetti';

let breedList;
const resultsPaginationNumber = [5, 10, 15, 20, 25];
const sortInfo = [
  {
    label: 'Ascending by age',
    value: 'age:asc',
  },
  {
    label: 'Descending by age',
    value: 'age:desc',
  },
  {
    label: 'Ascending by name',
    value: 'name:asc',
  },
  {
    label: 'Descending by name',
    value: 'name:desc',
  },
];

const Sidebar = ({ setFavoritesList, setSearchParams, setIsModalOpen, setMatch, favoritesList, setIsMatchLoading }) => {
  // State management
  const [error, setError] = useState(false);
  const [matchError, setMatchError] = useState({ bool: false, message: '' });
  const [searchTerms, setSearchTerms] = useState({
    breeds: '',
    zipCodes: '',
    ageMin: 0,
    ageMax: 20,
    size: '',
    sort: '',
  });
  const isNonMobile = useMediaQuery('(min-width: 580px)');
  const navigate = useNavigate();

  // On initial mount, fetch list of breeds and store in breedList variable
  useEffect(() => {
    const fetchBreedList = async () => {
      try {
        const response = await fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
        },
          credentials: 'include',
        });

        const data = await response.json();
        breedList = data;
      } catch (err) {
        console.error(err);
      }
    };

    fetchBreedList();
  }, []);

  // Form management
  const searchChangeHandler = e => {
    const { name, value } = e.target;
    setSearchTerms(prev => ({ ...prev, [name]: value }));
  };

  const searchSubmitHandler = e => {
    setError(false);
    e.preventDefault();
    if (searchTerms.zipCodes.trim().length !== 5 && searchTerms.zipCodes.trim().length > 0) {
      setError(true);
      return;
    }

    let searchParams = {};

    // Loop through searchTerms object and push anything that isn't empty into the searchParams obj
    for (let key in searchTerms) {
      if (searchTerms[key] !== '') {
        searchParams[key] = searchTerms[key];
      }
    }

    // set the search params to the passed object
    setSearchParams(searchParams);
  };

  // Submit handler for matching favorited dogs
  const matchSubmitHandler = async () => {
    // Validation to make sure a request isnt sent with an empty array
    if (favoritesList.length === 0) {
      setMatchError({ bool: true, message: 'Please favorite at least one dog before being matched!' });
      return;
    }

    setMatchError({ bool: false, message: '' });
    setIsMatchLoading(true);
    try {
      // Send match array and receive response of randomly matched ID
      const response = await fetch("https://frontend-take-home-service.fetch.com/dogs/match", {
        method: 'POST',
        body: JSON.stringify(favoritesList),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to execute search fetch!');
      }

      const data = await response.json();

      // Send request w/ ID to get dog data
      const matchResponse = await fetch("https://frontend-take-home-service.fetch.com/dogs", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify([data.match]),
      });

      if (!matchResponse.ok) {
        throw new Error('Failed to fetch dogs!');
      }

      const matchData = await matchResponse.json();
      console.log(matchData[0]);
      setMatch(matchData[0]);
      setIsModalOpen(true);
      runFireworks();
    } catch (err) {
      console.error(err);
      setMatchError({ bool: true, message: err.message });
    }
    setIsMatchLoading(false);
  };

  // Logic to clear search terms
  const clearButtonHandler = () => {
    navigate('/dogs');
    setSearchTerms({
      breeds: '',
      zipCodes: '',
      ageMin: 0,
      ageMax: 20,
      size: '',
      sort: '',
    });
  };

  return (
    <Box
      component='aside'
      height
      sx={{ position: isNonMobile && 'sticky', top: isNonMobile && 0 }}
      width={isNonMobile ? '30%' : '100%'}
      border='1px solid rgb(0, 0, 128)'
      backgroundColor='rgb(240, 234, 214)'
      p={1}>
      <Typography component='h3' variant='title' color='rgb(0, 0, 128)'>
        Search
      </Typography>
      <Divider />
      <Box component='form' onSubmit={searchSubmitHandler} mt={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <FormControl sx={{ backgroundColor: 'white' }} fullWidth>
          <InputLabel htmlFor='breeds'>Breeds</InputLabel>
          <Select name='breeds' onChange={searchChangeHandler} labelId='breeds' value={searchTerms.breeds} label='Breed'>
            {breedList?.map((breed, index) => (
              <MenuItem key={`${breed}: ${index}`} value={breed}>
                {breed}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant='standard' sx={{ backgroundColor: 'white', borderRadius: '.25rem .25rem 0 0' }} fullWidth>
          <InputLabel htmlFor='zip'>Zip Code</InputLabel>
          <Input onChange={searchChangeHandler} id='zip' value={searchTerms.zipCodes} name='zipCodes' type='number' sx={{ fontSize: '.9rem' }} />
          {error && <Typography sx={{ color: 'red', fontSize: '.75rem' }}>Zip Code must be exactly 5 digits</Typography>}
        </FormControl>
        <Box mt={3} width={'100%'} border='1px solid rgb(0, 0, 128)' backgroundColor='white' p={3} borderRadius='1.25rem'>
          <Typography component='p' variant='body1'>
            Age Range
          </Typography>
          <RangeSlider value={[searchTerms.ageMin, searchTerms.ageMax]} setSearchTerms={setSearchTerms} />
        </Box>

        <FormControl variant='standard' sx={{ backgroundColor: 'white' }} fullWidth>
          <InputLabel htmlFor='size'>Items per page</InputLabel>
          <Select name='size' onChange={searchChangeHandler} labelId='size' value={searchTerms.size} label='Size'>
            {resultsPaginationNumber.map(number => (
              <MenuItem key={number} value={number}>
                {number}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant='standard' sx={{ backgroundColor: 'white' }} fullWidth>
          <InputLabel htmlFor='sort'>Sort By</InputLabel>
          <Select name='sort' onChange={searchChangeHandler} labelId='sort' value={searchTerms.sort} label='Sort'>
            {sortInfo.map((sortItem) => (
              <MenuItem key={sortItem.value} value={sortItem.value}>
                {sortItem.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box display='flex' flexDirection={isNonMobile ? 'column' : 'row'} alignItems='center' justifyContent='center' gap='1rem'>
          <Button
            variant='contained'
            type='submit'
            sx={{ mt: isNonMobile ? 3 : 0, backgroundColor: 'rgb(0, 0, 128)', color: 'rgb(240, 234, 214)', fontWeight: 'bold', '&:hover': { backgroundColor: 'rgb(0, 0, 100)' } }}>
            Search
          </Button>

          <Button onClick={clearButtonHandler} variant='outlined' sx={{ color: 'rgb(0, 0, 128)', fontSize: '.75rem' }}>
            Clear Search
          </Button>
        </Box>
      </Box>
      <Divider sx={{ margin: '1rem' }} />
      <Box display='flex' flexDirection={isNonMobile ? 'column' : 'row'} alignItems='center' justifyContent='center' gap='1rem' mb='1rem'>
        <Button onClick={matchSubmitHandler} variant='contained' sx={{ backgroundColor: 'rgb(244,153,50)', '&:hover': { backgroundColor: 'rgb(244,135,50)' } }}>
          MATCH!
        </Button>
        {matchError.bool && <Typography sx={{ color: 'red', fontSize: '.75rem', p: '.5rem' }}>{matchError.message}</Typography>}
        <Button onClick={() => setFavoritesList([])} variant='outlined' sx={{ fontSize: '.7rem', color: 'rgb(244,153,50)', borderColor: 'rgb(244,153,50)' }}>
          Clear Favorites
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
