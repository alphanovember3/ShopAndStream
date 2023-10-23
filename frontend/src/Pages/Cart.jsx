import React from 'react';
import {
  Box, 
  Typography,
  Button,
  IconButton,
  Grid,
  FormControl
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector , useDispatch } from 'react-redux';
import { increaseCount , decreaseCount , removeFromCart  } from '../slices/cart/cartSlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Cart() {
  
  const dispatch = useDispatch();
  const {cart} = useSelector((state) => state.cart);
  console.log(cart)
  
  const totalPrice = cart.reduce((total, cart) => {
    return total + cart.quantity * cart.price;
  }, 0);
  

  return (
    <Box>
      <Box mt={20}>
        <Box mx={10}>
          <Typography variant='h4'>Your Cart</Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} sm={12} md={8}>
            <Box mt={2}>
              {
                cart.map((item) => (
                <Box 
                  key={item.id} 
                  sx={{ 
                    display : 'flex' , 
                    justifyContent : 'space-between' , 
                    backgroundColor : '#e0e0e0',
                    borderRadius : '15px'
                  }}
                  width='900px'
                  p={3}
                  my={1}
                  ml={20}
                >

                <Box >
                  <img 
                    src={item.image} 
                    alt="prod"
                    style={{ width: 100, height: 100 }}
                  />
                </Box>
                <Box>
                  <Typography variant='h6' >{item.name}</Typography>
                </Box>

                <Box>
                  <Typography variant='body1'>for each</Typography>
                  <Typography variant='body1'>${item.price}</Typography>
                </Box>

                {/* <Box>
                  <Typography variant='body1'>Quantity : {item.quantity}</Typography>
                </Box> */}

                <Box>
                  {/* <Typography>Quantity</Typography> */}
                  <IconButton 
                    variant='contained' 
                    onClick={() => dispatch(increaseCount({ id : item.id}))}
                    size='small'
                  >
                    <AddIcon />
                  </IconButton>
                    <span style={{ margin : 10 , color : 'red'}}>{item.quantity}</span>
                  <IconButton 
                    variant='contained'
                    onClick={() => {dispatch(decreaseCount({id : item.id})) } } 
                    size='small'
                  >
                    <RemoveIcon />
                  </IconButton>
                </Box>

                <Box>
                  <IconButton onClick={() => { dispatch(removeFromCart({ id : item.id}))}}>
                    <DeleteIcon sx={{ color : 'black'}}/>
                  </IconButton>
                </Box>
                
                </Box>
                ))
              }
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
          <Box mx={4} textAlign='center'>
            <Box mx={10} mt={3}>
              <Typography variant='body1'>Total Price : ${totalPrice}</Typography>
            </Box>

            <Box mt={4}>
              <FormControl fullWidth>
                <Button
                  variant='contained'
                  color='secondary'
                >
                  Check Out
                </Button>
              </FormControl>
            </Box>

          </Box>
          </Grid>
        </Grid>
          
        
      </Box>
      <Box></Box>
    </Box>
  )
}

export default Cart
