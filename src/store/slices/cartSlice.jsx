import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartByUserId } from "../../Services/CartApi";
import {
  calculateTotalItems,
  calculateTotalPrice,
  storeInLocalStorage,
} from "../../helpers/CartFunctions";
import {
  getCartFromLocalStorage,
  getUserIdFromLocalStorage,
  setDataInLocalStorage,
} from "../../helpers/LocalStorageFunctions";
import { showNotification } from "../../helpers/Notification";

// Get cart data from localStorage
let cartUser = getCartFromLocalStorage();

export const getCartByUserID = createAsyncThunk("cart", async (userId) => {
  try {
    if (userId) {
      const cart = await getCartByUserId(userId);
      return cart.data[0];
    }
  } catch (e) {
    console.log(e);
  }
});
// Get initial state from localStorage or fallback to default values
const initialState = {
  cart: cartUser ? cartUser.cart : {},
  isLoading: false,
  totalPrice: cartUser ? cartUser.totalPrice : 0,
  totalItems: cartUser ? cartUser.totalItems : 0,
};
export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const userId = getUserIdFromLocalStorage();

      //if the productsCart is already existing
      if (state.cart?.productsCart) {
        const isProductExist = state.cart?.productsCart.find(
          (product) =>
            product.id === action.payload.id &&
            product.color === action.payload.color &&
            product.size === action.payload.size
        );
        //if the product is already existing increment the quantity
        if (isProductExist) {
          isProductExist.quantity += 1;
          showNotification("success", "Product increased successfully!", 800);
        }
        // if the product is already not existing add it to the cart
        else {
          state.cart.productsCart.push({ ...action.payload, quantity: 1 });
          showNotification("success", "Product added successfully!", 800);
        }
      } else {
        //if the productsCart is not existing add first product and userId
        const cartData = {
          userId,
          productsCart: [{ ...action.payload, quantity: 1 }],
        };
        state.cart = cartData;
        showNotification("success", "Product added successfully!", 800);
      }
      //calculate total price
      calculateTotalPrice(state);

      //increment the count of products
      // state.totalItems++;
      calculateTotalItems(state);
      //store the cart in local storage
      setDataInLocalStorage("cart", state);
    },
    removeFromCart: (state, action) => {
      state.cart.productsCart = state.cart.productsCart.filter(
        (product) =>
          !(
            product.id === action.payload.id &&
            product.color === action.payload.color &&
            product.size === action.payload.size
          )
      );
      //calculate total price
      calculateTotalPrice(state);
      //calculate the count of products
      calculateTotalItems(state);
      //store the cart in local storage
      setDataInLocalStorage("cart", state);
    },
    clearCart: (state, action) => {
      state.cart.productsCart = [];
      //calculate total price
      calculateTotalPrice(state);
      //calculate the count of products
      calculateTotalItems(state);
      //store the cart in local storage
      setDataInLocalStorage("cart", state);
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
      setDataInLocalStorage("cart", state);
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
      setDataInLocalStorage("cart", state);
    },
    logOutCart: () => ({}),
  },
  extraReducers: (builder) => {
    builder.addCase(getCartByUserID.fulfilled, (state, action) => {
      const { userId, isLoading, totalItems, totalPrice, productsCart } =
        action.payload || {};

      const newCart = {
        cart: { userId, productsCart },
        isLoading,
        totalItems,
        totalPrice,
      };
      setDataInLocalStorage("cart", newCart);
      return newCart;
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increment,
  decrement,
  logOutCart,
} = cartSlice.actions;

export default cartSlice.reducer;
