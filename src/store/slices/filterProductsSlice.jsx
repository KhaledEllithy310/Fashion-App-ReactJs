import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isLoading: false,
  totalItems: 0,
};

export const filterProductsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {
    // addToCart: (state, action) => {
    //   state.cart.push({ ...action.payload, quantity: 1 });
    // },
    // removeFromCart: (state, action) => {
    //   state.cart.filter((product) => product.id !== action.payload);
    // },
    // clearCart: (state, action) => {
    //   state.cart = [];
    // },
  },
});

export const {} = filterProductsSlice.actions;

export default filterProductsSlice.reducer;
