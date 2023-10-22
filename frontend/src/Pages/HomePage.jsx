import React from 'react'
import { 
  Typography,
  Box,
  useMediaQuery
} from '@mui/material'
import Hero from '../components/Home/Hero'
import ProductDisplay from '../components/Products/ProductDisplay'

function HomePage() {

  const isNonMobile = useMediaQuery('(min-width : 600px)')

  return (
    <div>
      <Hero />
      <Box ml={isNonMobile ? 22 : 5} mt={5}> 
        <Typography variant={isNonMobile ? 'h3' : 'h4'}>Featured Products</Typography>
      </Box>
      <ProductDisplay />
    </div>
  )
}

export default HomePage
