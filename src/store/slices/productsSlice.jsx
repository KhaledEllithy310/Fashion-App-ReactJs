import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  isLoading: false,
  totalPrice: 0,
  totalItems: 0,
  count: 0,
};

export const productsSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push({ ...action.payload, quantity: 1 });
    },
    removeFromCart: (state, action) => {
      state.cart.filter((product) => product.id !== action.payload);
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = productsSlice.actions;

export default productsSlice.reducer;
