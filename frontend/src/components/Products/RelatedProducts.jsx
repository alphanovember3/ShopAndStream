import React, { useEffect , useState} from 'react';
//library
import { Box , Typography, Grid } from '@mui/material'
import { useParams } from 'react-router-dom';
//Components:
import ProductsCard from './ProductsCard';
//Data:
import products from '../../data/products';

function RelatedProducts({ category }) {

  const { id } = useParams();

  const [pdata , setPdata] = useState([]);

  useEffect(() => {
    async function fetchData(){
      try {
        const res = await fetch('http://localhost:3004/products');
        const data = await res.json();
        console.log(data);
        setPdata(data);
      } catch (error) {
        alert('unable to fetch data');
      }
    }
    fetchData();
  },[])

  return (
    <Box mt={5}>
      <Typography variant='h4'>Related Products</Typography>
      <Box>
        <Grid container>
          {pdata.map((item) => {
            if(item.category === category){
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
