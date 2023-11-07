import React, { useEffect, useState } from "react";
import AppNavbar from "../components/AppNavbar/AppNavbar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserIdFromLocalStorage } from "../helpers/LocalStorageFunctions";
import { getCartByUserID } from "../store/slices/cartSlice";
import { getWishListByUserID } from "../store/slices/wishListSlice";
import ScrollToTopButton from "../components/ScrollToTop/ScrollToTop";
import Spinner from "../components/Spinner/Spinner";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";

const Layout = () => {
  const dispatch = useDispatch();
  const userId = getUserIdFromLocalStorage();
  //get the cart by user id
  dispatch(getCartByUserID(userId));
  dispatch(getWishListByUserID(userId));

  const [isLoading, setIsLoading] = useState(true);

  window.onload = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const darkTheme = createTheme({});
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <AppNavbar />
            <Outlet />
            <ScrollToTopButton />
          </ThemeProvider>
        </>
      )}
    </>
  );
};

export default Layout;
