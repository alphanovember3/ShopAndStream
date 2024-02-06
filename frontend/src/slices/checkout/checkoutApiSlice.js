import { apiSlice } from "../apiSlice";

export const checkOutApiSlice = apiSlice.injectEndpoints({
  endpoints : (builder) => ({
    checkout : builder.mutation({
      query : (data) => ({
        url : `http://localhost:5001/api/checkout/create-payment-inten`,
        method : 'POST',
        body : data,
      })
    }),
  })
})

const { checkout } = checkOutApiSlice.endpoints;

export const checkoutApi = {
  checkout
};

export const {
  useCheckoutMutation
} = checkOutApiSlice;