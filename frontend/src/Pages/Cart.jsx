import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseCount,
  decreaseCount,
  removeFromCart,
  deleteCart,
} from "../slices/cart/cartSlice";
import { useUserProfileMutation } from "../slices/auth/userApiSlice";
import { useCheckoutMutation } from "../slices/checkout/checkoutApiSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51OXLhdSE2hrDrRza8fDevxSKyRPWFT62VmG4UAtgk5ZzxdPRwXMVBUVQQHKvjJdg8pRvdruuGpCtAujph3rbwtzj000yxjPOsZ"
);

function Cart() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [checkoutpost, { isLoading }] = useCheckoutMutation();
  console.log(cart);

  const totalPrice = cart.reduce((total, cart) => {
    return total + cart.quantity * cart.price;
  }, 0);

  const makePayment = async () => {
    const stripe = await stripePromise;

    const requestBody = {
      userName: userInfo.name,
      userId: userInfo._id,
      email: userInfo.email,
      totalPrice: totalPrice,
      products: cart.map(({ id, quantity, price, cost, name, category }) => ({
        id,
        name,
        price,
        cost,
        quantity,
        category,
      })),
    };

    console.log(userInfo._id);

    const response = await fetch(
      "http://localhost:5001/api/checkout/create-payment-inten",
      {
        method: "POST",
        headers: { _id: userInfo._id, "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      }
    );

    // const response = await checkoutpost(requestBody)

    console.log(response);
    const session = await response.json();
    console.log(session);
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    // dispatch(deleteCart());
  };

  return (
    <Box>
      <Box mt={20}>
        <Box mx={10}>
          <Typography variant="h4">Your Cart</Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} sm={12} md={8}>
            <Box mt={2}>
              {cart.length === 0 ? (
                <div className="my-10 mx-20">
                  <h1 className="text-3xl text-yellow-400">
                    No Items in Cart!
                  </h1>
                  <Link to={"/"}>
                    <button className=" my-3 btn bg-yellow-400 text-black hover:bg-yellow-300 border-yellow-400">
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
                        <th className="font-bold">Name</th>
                        <th className="font-bold">price</th>
                        <th className="font-bold">Quantity</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <img
                              src={item.image}
                              alt="imgwq"
                              className="w-40"
                            />
                          </td>
                          <td>
                            <h1 className="text-xl text-slate-900">
                              {item.name}
                            </h1>
                          </td>
                          <td>
                            <h1 className="text-xl text-green-600">
                              <i class="fa fa-inr"></i>
                              {item.price}
                            </h1>
                          </td>
                          <td>
                            <IconButton
                              variant="contained"
                              onClick={() =>
                                dispatch(increaseCount({ id: item.id }))
                              }
                              size="small"
                            >
                              <AddIcon />
                            </IconButton>
                            <span style={{ margin: 10, color: "red" }}>
                              {item.quantity}
                            </span>
                            <IconButton
                              variant="contained"
                              onClick={() => {
                                dispatch(decreaseCount({ id: item.id }));
                              }}
                              size="small"
                            >
                              <RemoveIcon />
                            </IconButton>
                          </td>
                          <td>
                            <IconButton
                              onClick={() => {
                                dispatch(removeFromCart({ id: item.id }));
                              }}
                            >
                              <DeleteIcon sx={{ color: "black" }} />
                            </IconButton>
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="my-3">
                    <h1 className="text-xl">Continue Shopping</h1>
                    <Link to={"/"}>
                      <button className=" my-3 btn bg-yellow-400 text-black hover:bg-yellow-300 border-yellow-400">
                        Shop Now
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Box mx={4} textAlign="center">
              <Box mx={10} mt={3}>
                <Typography variant="body1">
                  Total Price : <i class="fa fa-inr"></i>
                  {totalPrice}
                </Typography>
              </Box>

              <Box mt={4}>
                <FormControl fullWidth>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      "&:hover": {
                        backgroundColor: "#ffeb3b",
                      },
                    }}
                    onClick={makePayment}
                  >
                    Check Out
                  </Button>
                </FormControl>
                <div id="card-element"></div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Cart;
