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
import { Link } from 'react-router-dom'

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
                cart.length === 0 ? (
                  <div className='my-10 mx-20'>
                    <h1 className='text-3xl text-yellow-400'>No Items in Cart!</h1>
                    <Link to={"/"}>
                      <button 
                        className=' my-3 btn bg-yellow-400 text-black hover:bg-yellow-300 border-yellow-400'
                      >
                        Shop Now
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto mx-20 px-10">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr>
                          <th></th>
                          <th className='font-bold'>Name</th>
                          <th className='font-bold'>price</th>
                          <th className='font-bold'>Quantity</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                        cart.map((item) => (
                          <tr key={item.id}>
                            <td><img src={item.image} alt="imgwq" className='w-40'/></td>
                            <td><h1>{item.name}</h1></td>
                            <td><h1>{item.price}</h1></td>
                            <td>
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
                            </td>
                            <td>
                            <IconButton onClick={() => { dispatch(removeFromCart({ id : item.id}))}}>
                              <DeleteIcon sx={{ color : 'black'}}/>
                            </IconButton>
                            </td>
                          </tr>
                          
                        ))
                      }
                        <tr>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                )
                
                
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
                  sx={{ 
                    '&:hover' : {
                      backgroundColor : '#ffeb3b'
                    }
                  }}
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
