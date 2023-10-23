import React, { useState } from "react";
import UseGetCartData from "../../hooks/useGetCartData";
import AppInput from "../AppInput/AppInput";
import "./CartCheckOut.css";
const CartCheckOut = () => {
  // useState for promocode to open or close the input
  const [togglePromoCode, setTogglePromoCode] = useState(false);
  //get all data cart
  const [productsCart, totalItems, totalPrice] = UseGetCartData();

  return (
    <div className="cartPage__check">
      <h4 className="cartPage__title">summary</h4>
      <div className="cartPage__check__details">
        <div className="cartPage__check__details__subTotal">
          <h6 className="text">subtotal</h6>
          <h6 className="price">${totalPrice}</h6>
        </div>
        <div className="cartPage__check__details__shipping">
          {" "}
          <h6 className="text">shipping</h6>
          <h6 className="price">$40</h6>
        </div>
        <div className="cartPage__check__details__tax">
          <h6 className="text">tax</h6>
          <h6 className="price">$60</h6>
        </div>
        <div className="cartPage__check__details__promoCode">
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
        </div>
        <div className="cartPage__check__details__totalPrice">
          <h6 className="text big">total</h6>
          <h6 className="price big">${totalPrice + 40 + 60}</h6>
        </div>
        <div className="cartPage__check__details__btn">
          <button className="cartMenu__content__checkOut__btns__check mainBtn">
            check out
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCheckOut;
