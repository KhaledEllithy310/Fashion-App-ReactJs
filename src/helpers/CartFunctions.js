import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { increment, removeFromCart } from "../store/slices/cartSlice";
import {
  addCart,
  getCartByUserId,
  putProductsToCart,
} from "../Services/CartApi";
import {
  getCartFromLocalStorage,
  getUserIdFromLocalStorage,
} from "./LocalStorageFunctions";

//calculate total price
export const calculateTotalPrice = (state) => {
  state.totalPrice = 0;
  state.cart?.productsCart.forEach((product) => {
    const { price, discountPercentage, quantity } = product;
    state.totalPrice += ((price * (100 - discountPercentage)) / 100) * quantity;
  });
};

//calculate total Items
export const calculateTotalItems = (state) => {
  state.totalItems = 0;
  state.cart?.productsCart.forEach((product) => {
    const { quantity } = product;
    state.totalItems += quantity;
  });
};

// when quantity equals 0 suggest to user to delete this product or make quantity equal 1
export const UseDetectProductQuantity = (productsCart, productIndex) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (productsCart?.[productIndex]?.quantity === 0) {
      Swal.fire({
        title: "Do you want to delete this product?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Yes, delete this",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "", "success");
          //delete this product
          dispatch(removeFromCart(productsCart[productIndex]));
        } else if (result.isDismissed) {
          Swal.fire("product still there", "", "info");
          //make quantity equal 1
          dispatch(increment(productsCart[productIndex]));
        }
      });
    }
  }, [dispatch, productIndex, productsCart]);
};

//store the products cart into the server
export const storeProductsInServer = async (productsCart) => {
  let cartUser;

  //get userId from the local storage that login
  const userId = getUserIdFromLocalStorage();

  //get the cart by userId
  userId ? (cartUser = await getCartByUserId(userId)) : (cartUser = null);
  //get all keys from the cart that store in local storage

  const { cart, isLoading, totalItems, totalPrice } = getCartFromLocalStorage();

  const newCart = {
    userId: cart?.userId,
    productsCart: cart?.productsCart,
    isLoading,
    totalItems,
    totalPrice,
  };
  //if the cart in local storage and in server exist then update the cart with new cart else if {add cart}
  if (productsCart && cartUser?.data?.length > 0) {
    //update the cart with the new products
    await putProductsToCart(newCart, userId);
  } else if (productsCart) {
    // if the cart is empty then add new object cart with userId

    //send request to server and add new cart
    addCart(newCart);
  }
};
