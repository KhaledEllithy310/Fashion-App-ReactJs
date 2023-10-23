import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { increment, removeFromCart } from "../store/slices/cartSlice";

//calculate total price
export const calculateTotalPrice = (state) => {
  state.totalPrice = 0;
  state.cart?.productsCart.forEach((product) => {
    const { price, discountPercentage, quantity } = product;
    state.totalPrice += ((price * (100 - discountPercentage)) / 100) * quantity;
  });
};

//store the cart in local storage
export const storeInLocalStorage = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
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
    if (productsCart[productIndex]?.quantity === 0) {
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
