import { useEffect, useState } from 'react';
import { Box, Container, Typography, FormControl, InputLabel, Input, InputAdornment, Button, useMediaQuery } from '@mui/material';
import { AccountCircleOutlined, EmailOutlined } from '@mui/icons-material';
import React from 'react';
import logo_primary from '../assets/fetch-logo.gif';
import Overlay from '../components/Overlay';
import Video from '../components/Video';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';

const Login = () => {
  const navigate = useNavigate();

  // State management
  const [formState, setFormState] = useState({ name: '', email: '' });
  const [errorState, setErrorState] = useState({ nameError: false, emailError: false });
  const [errorMsg, setErrorMsg] = useState('');
  const isNonMobile = useMediaQuery('(min-width: 360px)');

  // useEffect to check if user exists, if so redirect to home page
  useEffect(() => {
    const user = Auth.getUser();
    if (user) {
      navigate('/dogs');
    }
  }, [navigate]);

  // Form management
  const inputChangeHandler = e => {
    const { name, value } = e.target;
    setErrorState(prev => ({ ...prev, [name + 'Error']: false }));
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const nameValidationHandler = e => {
    if (e.target.value.trim() === '') {
      setErrorState(prev => ({ ...prev, nameError: true }));
    }
  };

  const emailValidationHandler = e => {
    if (!e.target.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/)) {
      setErrorState(prev => ({ ...prev, emailError: true }));
    }
  };

  const formSubmitHandler = async e => {
    e.preventDefault();
    // Form Validation
    if (errorState.nameError || errorState.emailError) {
      setErrorMsg('Please complete both fields before submitting');
      return;
    }

    try {
      await fetch("https://frontend-take-home-service.fetch.com/auth/login", {
        method: 'POST',
        body: JSON.stringify(formState),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      Auth.login(formState);

      navigate('/dogs');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    }
  };

  return (
    <Box component='main' sx={{ minHeight: '100svh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      <Container
        maxWidth='600px'
        sx={{
          textAlign: 'center',
          border: isNonMobile ? '.5px solid black' : 'none',
          borderRadius: isNonMobile ? '1rem' : 'none',
          width: isNonMobile ? '90%' : '100%',
          minHeight: !isNonMobile && '100svh',
          maxWidth: '600px',
          padding: '2rem',
          backgroundColor: 'rgba(240, 234, 214, .9)',
        }}>
        <Box component='img' src={logo_primary} alt='Fetch' width={isNonMobile ? '200px' : '300px'} sx={{ mt: isNonMobile ? 1 : 3, mb: 2 }} />
        <Typography variant={isNonMobile ? 'h3' : 'h4'} component='h1' textAlign='center' color='rgb(0, 0, 128)' sx={{ m: 3, fontFamily: 'cursive' }}>
          Find Your Best Friend
        </Typography>
        <Box component='form' onSubmit={formSubmitHandler} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <FormControl variant='standard' sx={{ m: isNonMobile ? 1 : 2, width: '60%' }}>
            <InputLabel htmlFor='name'>Name</InputLabel>
            <Input
              id='name'
              name='name'
              type='text'
              required
              value={formState.name}
              error={errorState.nameError}
              onChange={inputChangeHandler}
              onBlur={nameValidationHandler}
              sx={{ fontSize: '.9rem' }}
              startAdornment={
                <InputAdornment position='start'>
                  <AccountCircleOutlined />
                </InputAdornment>
              }
            />
            {errorState.nameError && (
              <Typography component='p' sx={{ textAlign: 'center', color: 'red', fontSize: '.8rem' }}>
                Input must not be empty
              </Typography>
            )}
          </FormControl>
          <FormControl variant='standard' sx={{ m: isNonMobile ? 1 : 2, width: '60%' }}>
            <InputLabel htmlFor='email'>Email</InputLabel>
            <Input
              id='email'
              name='email'
              type='email'
              required
              value={formState.email}
              error={errorState.emailError}
              onChange={inputChangeHandler}
              onBlur={emailValidationHandler}
              sx={{ fontSize: '.9rem' }}
              startAdornment={
                <InputAdornment position='start'>
                  <EmailOutlined />
                </InputAdornment>
              }
            />
            {errorState.emailError && (
              <Typography component='p' sx={{ textAlign: 'center', color: 'red', fontSize: '.8rem' }}>
                Input must be a valid email address
              </Typography>
            )}
          </FormControl>
          <Button
            variant='contained'
            type='submit'
            sx={{ mt: 3, backgroundColor: 'rgb(0, 0, 128)', color: 'rgb(240, 234, 214)', fontWeight: 'bold', '&:hover': { backgroundColor: 'rgb(0, 0, 100)' } }}>
            Enter Website
          </Button>
          {errorMsg !== '' && (
            <Typography component='p' sx={{ textAlign: 'center', color: 'red', fontSize: '.8rem' }}>
              {errorMsg}
            </Typography>
          )}
        </Box>
      </Container>
      <Overlay />
      <Video />
    </Box>
  );
};

export default Login;
