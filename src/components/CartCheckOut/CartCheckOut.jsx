import React from "react";
import UseGetCartData from "../../hooks/useGetCartData";
import "./CartCheckOut.css";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/slices/cartSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { storeProductsInServer } from "./../../helpers/CartFunctions";
import { storeProductsWishListInServer } from "./../../helpers/WishListFunctions.js";
import { useGetWishData } from "./../../hooks/useGetWishData";
const CartCheckOut = () => {
  // useState for promocode to open or close the input
  //get all data cart
  const [productsCart, , totalPrice] = UseGetCartData();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [productsWish, ,] = useGetWishData();

  const handleCheckOut = () => {
    storeProductsInServer(productsCart);
    storeProductsWishListInServer(productsWish);
    Swal.fire({
      title: "Do you want to check out?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Yes, check out",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("checked out!", "", "success");
        //clear cart
        dispatch(clearCart());
        setTimeout(() => {
          Navigate("/");
        }, 1000);
      }
    });
  };
  return (
    <div className="cartPage__check">
      <h4 className="cartPage__title">summary</h4>
      <div className="cartPage__check__details">
        <div className="cartPage__check__details__subTotal">
          <h6 className="text">subtotal</h6>
          <h6 className="price">${totalPrice}</h6>
        </div>
        <div className="cartPage__check__details__tax">
          <h6 className="text">tax</h6>
          <h6 className="price">$60</h6>
        </div>
        <div className="cartPage__check__details__totalPrice">
          <h6 className="text big">total</h6>
          <h6 className="price big">${totalPrice + 60}</h6>
        </div>
        <div className="cartPage__check__details__btn">
          <button
            className="cartMenu__content__checkOut__btns__check mainBtn"
            onClick={() => {
              handleCheckOut();
            }}
          >
            check out
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCheckOut;
