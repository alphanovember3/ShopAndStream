import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart : localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : [],
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
      // Updating  LocalStorage
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },

    removeFromCart : (state,action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      
      // Updating  LocalStorage
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },

    increaseCount : (state,action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity++;
        }
        return item;
      }); 

      // Updating  LocalStorage
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },

    decreaseCount : (state,action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.quantity > 1) {
          item.quantity--;
        }
        return item;
      });

      // Updating  LocalStorage
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },

    deleteCart : (state,action) => {
      cart : [],
      localStorage.removeItem("cart");
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
  deleteCart
} = cartSlice.actions;

export default cartSlice.reducer;