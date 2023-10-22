import React from 'react';
//library
import { Box , Typography, Grid } from '@mui/material'
import { useParams } from 'react-router-dom';
//Components:
import ProductsCard from './ProductsCard';
//Data:
import products from '../../data/products';

function RelatedProducts({ category }) {

  const { id } = useParams();

  return (
    <Box mt={5}>
      <Typography variant='h4'>Related Products</Typography>
      <Box>
        <Grid container>
          {products.map((item) => {
            if(item.category === category && item.id !== id ){
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
  )
}

export default RelatedProducts
