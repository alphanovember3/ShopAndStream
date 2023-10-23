import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/auth/authSlice';
import cartReducer from './slices/cart/cartSlice';
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    cart : cartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;