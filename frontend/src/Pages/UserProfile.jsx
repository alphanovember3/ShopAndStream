import React, { useEffect } from 'react';

import { 
  Box,
  Grid,
  useMediaQuery,
  Typography 
} from '@mui/material';
import coin from '../assets/coin.png'

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useUserProfileMutation } from '../slices/auth/userApiSlice';
import { setReward } from '../slices/auth/authSlice';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';

function UserProfile() {


  const isNonMobile = useMediaQuery('(min-width : 600px)');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reward , {isLoading} ] = useUserProfileMutation();

  const { userInfo, userreward } = useSelector((state) => state.auth);

  useEffect(() => {
    async function fetchUserProfile(){
      try {
        const res = await reward();
        dispatch(setReward(res.data.reward[0].reward));
        // console.log(res)
      } catch (error) {
        navigate('/');
      }
    }
    fetchUserProfile();
  },[])

  return (
    <Box mt={10} mx={isNonMobile ? 10 :1}>
      <Box mx={isNonMobile ? 0 : 2} my={5} p={1}>
        <Typography variant='h5'>Welcome! {userInfo.name}</Typography>
      </Box>
      <Grid container>

        <Grid item xs={12} sm={12} md={6}>
          <Box mx={3}>
            <Box>
              <Typography variant='body1' color='primary'>Customer Details</Typography>
            </Box>
            <Box my={3}>
              <Typography variant='body1'>Customer Name : {userInfo.name}</Typography>
              <Typography variant='body1'>Customer Email : {userInfo.email}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box mx={3}>
            <Box>
              <Typography variant='body1' color='primary'>Rewards Collected</Typography>
            </Box>
            <Box 
              my={3}
              mx={1}  
              sx={{ 
                backgroundColor : 'rgba(255,215,0,0.3)',
                width : '300px',
                height : '200px',
                borderRadius : '20px',
                border : '4px solid',
                borderColor : '#FFD700'
              }}
            >
              <Box py={6} px={2}
                sx={{ display : 'flex'}}
              >
                <img src={coin} alt="coin" />
                <Typography variant='h2' sx={{ pt : 1.5 , color : 'black'} }>{userreward}</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default UserProfile

