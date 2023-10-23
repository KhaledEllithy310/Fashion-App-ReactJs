import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCarts, getCartByUserId } from "../../Services/CartApi";
import {
  calculateTotalItems,
  calculateTotalPrice,
  storeInLocalStorage,
} from "../../helpers/CartFunctions";

export const getCartByUserID = createAsyncThunk("cart", async (userId) => {
  const cart = await getCartByUserId(userId);
  console.log(cart.data[0]);
  return cart.data[0];
});

const cartInLocalStorage = localStorage.getItem("cart");
const initialState = {
  cart: cartInLocalStorage ? JSON.parse(cartInLocalStorage).cart : {},
  isLoading: false,
  totalPrice: cartInLocalStorage
    ? JSON.parse(cartInLocalStorage).totalPrice
    : 0,
  totalItems: cartInLocalStorage
    ? JSON.parse(cartInLocalStorage).totalItems
    : 0,
  count: 0,
};
export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const userId = JSON.parse(localStorage.getItem("userData")).id;
      //if the productsCart is already existing
      if (state.cart?.productsCart) {
        const isProductExist = state.cart?.productsCart.find(
          (product) =>
            product.id === action.payload.id &&
            product.color === action.payload.color &&
            product.size === action.payload.size
        );
        //if the product is already existing increment the quantity
        if (isProductExist) isProductExist.quantity += 1;
        // if the product is already not existing add it to the cart
        else state.cart.productsCart.push({ ...action.payload, quantity: 1 });
      } else {
        //if the productsCart is not existing add first product and userId
        const cartData = {
          userId,
          productsCart: [{ ...action.payload, quantity: 1 }],
        };
        state.cart = cartData;
      }
      //calculate total price
      calculateTotalPrice(state);

      //increment the count of products
      // state.totalItems++;
      calculateTotalItems(state);
      //store the cart in local storage
      // localStorage.setItem("cart", JSON.stringify(state));
      storeInLocalStorage(state);
    },
    removeFromCart: (state, action) => {
      console.log(action.payload);
      state.cart.productsCart = state.cart.productsCart.filter(
        (product) =>
          !(
            product.id === action.payload.id &&
            product.color === action.payload.color &&
            product.size === action.payload.size
          )
      );
      console.log(state.cart.productsCart);
      //calculate total price
      calculateTotalPrice(state);
      //calculate the count of products
      calculateTotalItems(state);
      // localStorage.setItem("cart", JSON.stringify(state));
      storeInLocalStorage(state);
    },
    clearCart: (state, action) => {
      state.cart.productsCart = [];
      //calculate total price
      calculateTotalPrice(state);
      //calculate the count of products
      calculateTotalItems(state);
      // localStorage.setItem("cart", JSON.stringify(state));
      storeInLocalStorage(state);
    },
    increment: (state, action) => {
      let targetProduct = state.cart?.productsCart.find(
        (product) =>
          product.id === action.payload.id &&
          product.color === action.payload.color &&
          product.size === action.payload.size
      );
      if (targetProduct.quantity >= 0) targetProduct.quantity++;
      //calculate total price
      calculateTotalPrice(state);

      //calculate the count of products
      calculateTotalItems(state);

      //store the cart in local storage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    decrement: (state, action) => {
      let targetProduct = state.cart?.productsCart.find(
        (product) =>
          product.id === action.payload.id &&
          product.color === action.payload.color &&
          product.size === action.payload.size
      );
      if (targetProduct.quantity >= 1) targetProduct.quantity--;
      //calculate total price
      calculateTotalPrice(state);
      //calculate the count of products
      calculateTotalItems(state);
      //store the cart in local storage
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartByUserID.fulfilled, (state, action) => {
      console.log(" state.cart", state.cart);
      console.log("  action.payload", action.payload);
      state.cart = action.payload;
    });
  },
});

export const { addToCart, removeFromCart, clearCart, increment, decrement } =
  cartSlice.actions;

export default cartSlice.reducer;
