// import React from 'react'
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../slices/cart/cartSlice";
import { useNavigate } from "react-router-dom";

function ProductsCard({ id, name, image, price, category, cost }) {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkUser = async () => {
    if (userInfo) {
      dispatch(
        addToCart({ id: id, name, image, price, quantity: 1, category, cost })
      );
      // navigate('/cart')
    } else {
      navigate("/login");
    }
  };

  return (
    <Card sx={{ maxWidth: 300, m: 2 }}>
      <CardMedia sx={{ height: 240 }} image={image} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="h6">
          <i class="fa fa-inr"></i> {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          sx={{ mr: 1 }}
          startIcon={<ShoppingCartIcon />}
          onClick={checkUser}
        >
          Add to Cart
        </Button>
        <Button
          size="small"
          color="primary"
          component={Link}
          to={`/product/${id}`}
        >
          Detail
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductsCard;
