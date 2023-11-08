import React, { useState } from "react";
import UseGetCartData from "../../hooks/useGetCartData";
import AppInput from "../AppInput/AppInput";
import "./CartCheckOut.css";
import { has } from "lodash";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/slices/cartSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const CartCheckOut = () => {
  // useState for promocode to open or close the input
  const [togglePromoCode, setTogglePromoCode] = useState(false);
  //get all data cart
  const [, , totalPrice] = UseGetCartData();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCheckOut = () => {
    Swal.fire({
      title: "Do you want to check out?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Yes, check out",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("checked out!", "", "success");
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
        {/* <div className="cartPage__check__details__promoCode">
          <p
            className="cartPage__check__details__promoCode__text"
            onClick={() => setTogglePromoCode(!togglePromoCode)}
          >
            {!togglePromoCode ? "i have promocode." : "i don't have promocode."}
          </p>
          {togglePromoCode && (
            <AppInput
              className="cartPage__check__details__promoCode__input"
              label={"Promocode"}
              type={"text"}
            />
          )}
        </div> */}
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
