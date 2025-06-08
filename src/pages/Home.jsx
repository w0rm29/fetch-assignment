import { Box, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';
import useFetchDogData from '../hooks/useFetchDogData';
import MatchModal from '../components/Modal';

const Home = () => {
  // State management
  const { isLoading, error, dogData, fetchDogData, searchData } = useFetchDogData();
  const [favoritesList, setFavoritesList] = useState([]);
  const [match, setMatch] = useState();
  const [isMatchLoading, setIsMatchLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isNonMobile = useMediaQuery('(min-width: 580px)');
  const [searchParams, setSearchParams] = useSearchParams();

  // Each time component updates w/ new searchParams, re-run this function
  useEffect(() => {
    fetchDogData(searchParams);
  }, [fetchDogData, searchParams]);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: isNonMobile ? 'row' : 'column', flex: '1 1 auto', textAlign: 'center', p: 1, gap: '1rem' }}>
        <Sidebar
          setFavoritesList={setFavoritesList}
          setIsMatchLoading={setIsMatchLoading}
          setSearchParams={setSearchParams}
          setIsModalOpen={setIsModalOpen}
          setMatch={setMatch}
          favoritesList={favoritesList}
        />
        {isLoading && (
          <Typography component='p' variant='h6' sx={{ marginInline: 'auto' }}>
            Loading...
          </Typography>
        )}
        {error && !isLoading && (
          <Typography component='p' variant='h6'>
            {error}
          </Typography>
        )}
        {!isLoading && !error && dogData && <Main favoritesList={favoritesList} setFavoritesList={setFavoritesList} dogData={dogData} paginationData={searchData} />}
      </Box>

      <MatchModal matchData={match} isMatchLoading={isMatchLoading} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default Home;
