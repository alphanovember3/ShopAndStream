import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart : [],
};

const cartSlice = createSlice({
  name : 'cart',
  initialState,
  reducers : {

    addToCart : (state,  action) => {
      const item = state.cart.find((product) => product.id === action.payload.id);
      if(item){
        item.quantity++;
      }else{
        state.cart = [...state.cart, action.payload];
      }
    },

    removeFromCart : (state,action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },

    increaseCount : (state,action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity++;
        }
        return item;
      }); 
    },

    decreaseCount : (state,action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.quantity > 1) {
          item.quantity--;
        }
        return item;
      });
    },

    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

  }
})

export const {
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;