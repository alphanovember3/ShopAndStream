import React, { useState , useEffect} from 'react';
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

import  {useNavigate , useNavigation } from 'react-router-dom';
import { useDispatch , useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/auth/userApiSlice";
import { setCredentials } from "../slices/auth/authSlice";
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';

function Register() {

  const isNonMobile = useMediaQuery('(min-width : 600px)');

  const [name, setName ] = useState('');
  const [email, setEmail ] = useState('');
  const [password , setPassword ] = useState('');
  const [confirmPassword , setConfirmPassword ] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ register , { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if(userInfo){
      navigate('/');
    }
  }, [ userInfo , navigate])

  const submitHandler = async(e) => {
    e.preventDefault();
    // console.log('submit');
    if(password !== confirmPassword){
      toast.error('Password does not match');
      setPassword('');
      setConfirmPassword('');
    } else {
      try{
        const res = await register({name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
      } catch(err){

      }
    }
  }

  return (
    
    <Box mt={15} mb={4}  sx={{ mx : 'auto'}} width={isNonMobile ? '600px' : '300px'}>
      <Box textAlign='center' my={1}>
        <Typography variant='h4'>Sign Up</Typography>
      </Box>
      <Box >
      <form onSubmit={submitHandler}>
      <FormControl fullWidth>
        <TextField 
          type='text'
          varianr='outlined'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin='dense'
          required
        />
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
        <TextField 
          type='password'
          varianr='outlined'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin='dense'
        />
        <Button
          type='submit'
          variant='contained'
          size='large'
          sx={{ my : 1}}
        >
          Sign up
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
        <Typography sx={{ mr : 1}}>Already have account?</Typography>
        <Link href='/login'>Login</Link>
      </Box>
      </Box>
    </Box>
      
  )
}

export default Register
