import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getUserIdFromLocalStorage,
  getWishListFromLocalStorage,
  setDataInLocalStorage,
} from "../../helpers/LocalStorageFunctions";
import { getWishListByUserId } from "../../Services/WishListApi";
import { showNotification } from "../../helpers/Notification";
import { calculateTotalItemsInWish } from "../../helpers/WishListFunctions";

// Get cart data from localStorage
let wishListUser = getWishListFromLocalStorage();

export const getWishListByUserID = createAsyncThunk(
  "wishList",
  async (userId) => {
    try {
      if (userId) {
        const wishList = await getWishListByUserId(userId);
        return wishList.data[0];
      }
    } catch (e) {
      console.log(e);
    }
  }
);

const initialState = {
  wishList: wishListUser ? wishListUser.wishList : {},
  isLoading: false,
  totalItems: wishListUser ? wishListUser.totalItems : 0,
};

export const wishListSlice = createSlice({
  name: "wishListSlice",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const userId = getUserIdFromLocalStorage();

      //if the productsWish is already existing
      if (state.wishList?.productsWish) {
        const isProductExist = state.wishList?.productsWish.find(
          (product) =>
            product.id === action.payload.id &&
            product.color === action.payload.color &&
            product.size === action.payload.size
        );
        //if the product is already existing increment the quantity
        if (isProductExist) {
          showNotification(
            "info",
            "this product already in your wishList",
            800
          );
        }
        // if the product is already not existing add it to the cart
        else {
          state.wishList?.productsWish.push({ ...action.payload });
          //increment the count of products
          calculateTotalItemsInWish(state);
          showNotification(
            "success",
            "Product added successfully i your wishList!",
            800
          );
        }
      } else {
        //if the productsWish is not existing add first product and userId
        const wishListData = {
          userId,
          productsWish: [{ ...action.payload }],
        };
        state.wishList = wishListData;
        //increment the count of products
        calculateTotalItemsInWish(state);
        showNotification(
          "success",
          "Product added successfully i your wishList!",
          800
        );
      }
      //store the cart in local storage
      setDataInLocalStorage("wishList", state);
    },
    RemoveFromWishList: (state, action) => {

      state.wishList.productsWish = state.wishList.productsWish.filter(
        (product) =>
          !(
            product.id === action.payload.id &&
            product.color === action.payload.color &&
            product.size === action.payload.size
          )
      );

      //calculate the count of products
      calculateTotalItemsInWish(state);
      //store the cart in local storage
      setDataInLocalStorage("wishList", state);
    },
    clearWishList: (state, action) => {
      state.wishList.productsWish = [];
      //calculate the count of products
      calculateTotalItemsInWish(state);
      //store the cart in local storage
      setDataInLocalStorage("wishList", state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWishListByUserID.fulfilled, (state, action) => {
      const { userId, totalItems, isLoading, productsWish } =
        action.payload || {};

      const newWishList = {
        wishList: { userId, productsWish },
        totalItems,
        isLoading,
      };
      setDataInLocalStorage("wishList", newWishList);
      return newWishList;
    });
  },
});

export const { addToWishList, RemoveFromWishList, clearWishList } =
  wishListSlice.actions;

export default wishListSlice.reducer;
