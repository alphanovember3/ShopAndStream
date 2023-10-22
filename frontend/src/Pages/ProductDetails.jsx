import React, { useState, useEffect } from 'react';

import { Box , Typography, Grid , Container, Button, useMediaQuery } from '@mui/material';
import RelatedProducts from '../components/Products/RelatedProducts';
import products from '../data/products';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProductDetails() {

  const {id} = useParams();
  
  const isNonMobile = useMediaQuery('(min-width : 600px)');

  const [ count , setCount ] = useState(1);
  const [pdata , setPdata] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();


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
    fetchData();
  },[])

  const checkUser = async() => {
    if(userInfo){
      navigate('/cart')
    } else {
      navigate('/login')
    }
  }

  
  // const product_details = pdata.find(product_details => product_details.id === id);

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
            <Button variant='contained' onClick={() => setCount(count + 1)}>+</Button>
              <span style={{ margin : 10}}>{count}</span>
            <Button variant='contained'onClick={() => {if(count !== 1)setCount(count - 1)} } >-</Button>
          </Box>
        </Grid>
      </Grid>

      <RelatedProducts category={pdata.category} />


    </Container>  
    </Box>
  )
}

export default ProductDetails
