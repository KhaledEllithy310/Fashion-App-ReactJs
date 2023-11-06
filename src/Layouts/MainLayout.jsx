import React, { useEffect, useState } from "react";
import AppNavbar from "../components/AppNavbar/AppNavbar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
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

  const [isLoading, setIsLoading] = useState(false);

  // window.onload = () => {
  //   setIsLoading(false);
  // };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <AppNavbar />
          <Outlet />
          <ScrollToTopButton />
        </>
      )}
    </>
  );
};

export default Layout;
