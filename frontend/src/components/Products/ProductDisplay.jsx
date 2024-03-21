import React, { useEffect, useState } from "react";
import { Box, Grid, useMediaQuery } from "@mui/material";

import ProductsCard from "./ProductsCard";

import products from "../../data/products";

function ProductDisplay() {
  const isNonMobile = useMediaQuery("(min-width : 600px)");

  const [pdata, setPdata] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3004/products");
        const data = await res.json();
        console.log(data);
        setPdata(data);
      } catch (error) {
        alert("unable to fetch data");
      }
    }
    fetchData();
  }, []);

  return (
    <Box my={isNonMobile ? 10 : 3} mx={isNonMobile ? 20 : 3}>
      <Grid container>
        {pdata.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <ProductsCard
              id={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
              category={item.category}
              cost={item.cost}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductDisplay;
