import React, { useState, useEffect } from 'react';
import { 
  Box,
  Container,
  Grid,
  TextField, 
  Button,
  FormControl,
  CssBaseline,
  useMediaQuery,
  Typography,
  Link
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/auth/userApiSlice';
import { setCredentials } from '../slices/auth/authSlice';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';

function Login() {

  const isNonMobile = useMediaQuery('(min-width : 600px)');

  const [email, setEmail ] = useState('');
  const [password , setPassword ] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      setEmail('');
      setPassword('');
    }
  };

  return (
    
    <Box mt={15} mb={4}  sx={{ mx : 'auto'}} width={isNonMobile ? '600px' : '300px'}>
      <Box textAlign='center' my={1}>
        <Typography variant='h4'>Login</Typography>
      </Box>
      <Box >
      <form onSubmit={submitHandler}>
      <FormControl fullWidth>
        <TextField 
          type='email'
          varianr='outlined'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin='dense'
          required
        />
        <TextField 
          type='password'
          varianr='outlined'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin='dense'
          required
        />
        <Button
          type='submit'
          variant='contained'
          size='large'
          sx={{ my : 1}}
        >
          Login
        </Button>
      </FormControl>
      </form>

      {
        isLoading && 
        <CircularProgress 
          sx={{
            width: '100px',
            height: '100px',
            margin: 'auto',
            display: 'block'
          }} 
        />
      }

      <Box sx={{ display : 'flex' , justifyContent : 'center'}} mt={2}>
        <Typography sx={{ mr : 1}}>Don't have account?</Typography>
        <Link href='/register'>Sign Up</Link>
      </Box>

      </Box>
    </Box>
      
  )
}

export default Login
