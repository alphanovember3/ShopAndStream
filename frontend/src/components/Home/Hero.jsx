import React from 'react'
import { 
  Box,
  Typography,
  Button,
  useMediaQuery
} from '@mui/material'
import LiveTvIcon from '@mui/icons-material/LiveTv';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Hero() {

  const isNonMobile = useMediaQuery('(min-width : 600px)');

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkUser = async() => {
    if(userInfo){
      navigate('/')
    } else {
      navigate('/login')
    }
  }


  return (
    <Box
      className='hero_grad'
      mt={10}
      p={isNonMobile ? 5 : 2}
      maxWidth='100%'
      height={500}
      mx={2}
      sx={{ backgroundColor : 'red' , borderRadius : '15px'}}
    >
      <Box
        m={2}
        width={isNonMobile ? '50%' : '100%'}
        sx={{borderRadius : '15px'}}
      >
        <Typography variant={isNonMobile ? 'h1' : 'h2'}>Shop and get amazing Rewards points</Typography><br />
        <Button 
          variant='contained' 
          color='secondary' 
          size='large'
          onClick={() => {
            // navigate( '/ott' , { replace : true })
            console.log(window)
            window.open('/ott' , '_blank');
          }}
          startIcon={<LiveTvIcon />}
        >
          Stream Movie
        </Button>
      </Box>
    </Box>
  )
}

export default Hero
