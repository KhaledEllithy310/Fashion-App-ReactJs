import React, { useState } from "react";
import AppNavbar from "../components/AppNavbar/AppNavbar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserIdFromLocalStorage } from "../helpers/LocalStorageFunctions";
import { getCartByUserID, logOutCart } from "../store/slices/cartSlice";
import {
  getWishListByUserID,
  logOutWishList,
} from "../store/slices/wishListSlice";
import ScrollToTopButton from "../components/ScrollToTop/ScrollToTop";
import Spinner from "../components/Spinner/Spinner";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { storeProductsWishListInServer } from "../helpers/WishListFunctions";
import { storeProductsInServer } from "../helpers/CartFunctions";
import { logOut } from "../store/slices/userSlice";
import UseGetCartData from "../hooks/useGetCartData";
import useGetWishData from "../hooks/useGetWishData";

const Layout = () => {
  const dispatch = useDispatch();
  const userId = getUserIdFromLocalStorage();
  //get the cart by user id
  dispatch(getCartByUserID(userId));
  dispatch(getWishListByUserID(userId));

  const darkTheme = createTheme({});
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppNavbar />
        <Outlet />
        <ScrollToTopButton />
      </ThemeProvider>
    </>
  );
};

export default Layout;
