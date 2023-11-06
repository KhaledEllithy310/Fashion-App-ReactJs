import React, { useEffect, useState } from "react";
import AppNavbar from "../components/AppNavbar/AppNavbar";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { grey } from "@mui/material/colors";
import { getUserIdFromLocalStorage } from "../helpers/LocalStorageFunctions";
import { getCartByUserID } from "../store/slices/cartSlice";
import { getWishListByUserID } from "../store/slices/wishListSlice";
import ScrollToTopButton from "../components/ScrollToTop/ScrollToTop";
import Spinner from "../components/Spinner/Spinner";

const Layout = () => {
  const dispatch = useDispatch();
  const userId = getUserIdFromLocalStorage();
  //get the cart by user id
  dispatch(getCartByUserID(userId));
  dispatch(getWishListByUserID(userId));
  // const mode = useSelector((state) => state.mode);
  // console.log(mode);
  // const darkTheme = createTheme({
  //   palette: {
  //     mode,
  //     ...(mode === "light"
  //       ? {
  //           button: {
  //             main: grey[900],
  //             sec: grey[700],
  //           },
  //           background: {
  //             default: "#fff",
  //             sec: "black",
  //             card: grey[300],
  //           },
  //           text: {
  //             primary: grey[900],
  //             secondary: grey[800],
  //             logoSec: "#fff",
  //             active: grey[400],
  //           },
  //         }
  //       : {
  //           button: {
  //             main: grey[900],
  //             sec: grey[700],
  //           },
  //           background: {
  //             sec: "#fff",
  //             card: grey[600],
  //           },
  //           text: {
  //             primary: "#fff",
  //             secondary: grey[500],
  //             logoSec: grey[900],
  //             active: grey[800],
  //           },
  //         }),
  //   },
  // });

  const [isLoading, setIsLoading] = useState(false);

  window.onload = () => {
    // setIsLoading(true);
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {/* <ThemeProvider theme={darkTheme}> */}
        {/* <CssBaseline /> */}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <AppNavbar />
            <Outlet />
            <ScrollToTopButton />
          </>
        )}
      {/* </ThemeProvider> */}
    </>
  );
};

export default Layout;
