
import React, { useState, useEffect } from 'react';

import { Box , Typography, Grid , Container, Button, useMediaQuery, IconButton } from '@mui/material';
// import RelatedProducts from '../components/Products/RelatedProducts';
import ProductsCard from '../components/Products/ProductsCard'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// import products from '../data/products';
import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../slices/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

function ProductDetails() {

  const {id} = useParams();
  
  const isNonMobile = useMediaQuery('(min-width : 600px)');

  const [ count , setCount ] = useState(1);
  const [pdata , setPdata] = useState([]);
  const [ relatedata , setRelatedata] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData(){
      try {
        const res = await fetch(`http://localhost:3004/products/${id}`);
        const data = await res.json();
        console.log(data);
        setPdata(data);
      } catch (error) {
        alert('unable to fetch data');
      }
    }
    async function fetchData_all(){
      try {
        const res = await fetch('http://localhost:3004/products');
        const data = await res.json();
        console.log(data);
        setRelatedata(data);
      } catch (error) {
        alert('unable to fetch data');
      }
    }
    fetchData();
    fetchData_all();
  },[id])

  const checkUser = async() => {
    if(userInfo){
      dispatch(addToCart({ id : pdata.id , name : pdata.name , image : pdata.image , price : pdata.price, quantity : count}))
      // navigate('/cart')
    } else {
      navigate('/login')
    }
  }


  return (
    <Box my={10}>
    <Container>
      <Grid container>
        <Grid item xs={12} sm={6} md={6}>
          <Box>
            <img src={pdata.image} alt="img" className='img'/>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box p={isNonMobile ? 5 : 1}>
            <Typography variant='h4'>{pdata.name}</Typography><br />
            <Typography variant='body2'>{pdata.details}</Typography><br />
            <Typography variant='h5' >${pdata.price}</Typography><br />
            <Button 
              variant='contained' 
              color='secondary' 
              sx={{ mb : 2}}
              onClick={checkUser}
            >
              Add to Cart
            </Button>
            <br />
            <IconButton 
              variant='contained' 
              onClick={() => setCount(count + 1)}
            >
              <AddIcon />
            </IconButton>
              <span style={{ margin : 10}}>{count}</span>
            <IconButton variant='contained'onClick={() => {if(count !== 1)setCount(count - 1)} } ><RemoveIcon /></IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* <RelatedProducts category={pdata.category} /> */}

      {/* // Related Products */}
      <Box mt={5}>
      <Typography variant='h4'>Related Products</Typography>
      <Box>
        <Grid container>
          {relatedata.map((item) => {
            if(item.category === pdata.category && item.id !== pdata.id){
              return(
                <Grid item xs={12} sm={4} md={4} key={item.id}>
                  <ProductsCard 
                    id={item.id} 
                    name={item.name} 
                    image={item.image} 
                    price={item.price} 
                    category={item.category}
                  />
                </Grid>
              );
            }
          })}
        </Grid>
      </Box>
    </Box>



    </Container>  
    </Box>
  )
}

export default ProductDetails