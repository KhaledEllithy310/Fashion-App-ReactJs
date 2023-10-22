import React, { useState } from "react";
import "./CartMenu.css";
import { Drawer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decrement,
  increment,
  removeFromCart,
} from "../../store/slices/cartSlice";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
const CartMenu = ({ open, onClose, anchor }) => {
  const [closeMenu, setCloseMenu] = useState({});
  //destructing the data of cart
  const { totalItems, cart, totalPrice } = useSelector((state) => state.cart);
  //access to the productsCart
  const productsCart = cart.productsCart;

  const redirectToCartPage = () => {
    navigate("/cart");
    //  setCloseMenu({toggleDrawer("right", false)})
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Drawer anchor={anchor} open={open} onClose={onClose} className="cartMenu">
      <div className="cartMenu__content">
        <h4 className="cartMenu__content__title">
          my Cart
          {productsCart?.length > 0 ? (
            <button
              className="cartMenu__content__products__clearAll secBtn"
              onClick={() => dispatch(clearCart())}
            >
              clear all
            </button>
          ) : (
            ""
          )}
        </h4>
        <div className="cartMenu__content__products">
          {productsCart?.length > 0 ? (
            productsCart?.map((product, index) => (
              <div className="cartMenu__content__products__item" key={index}>
                <div className="cartMenu__content__products__item__img">
                  <img src={product?.images[0]} alt="img" />
                </div>
                <div
                  className="cartMenu__content__products__item__details"
                >
                  <h6 className="cartMenu__content__products__item__details__title">
                    {product.title}
                  </h6>
                  <h6 className="cartMenu__content__products__item__details__price">
                    {product?.discountPercentage ? (
                      <>
                        <p className="productDetails__content__price__before">
                          <del>${product?.price}</del>
                        </p>
                        <p className="productDetails__content__price__after">
                          $
                          {(
                            (product?.price *
                              (100 - +product?.discountPercentage)) /
                            100
                          ).toFixed(2)}
                        </p>
                      </>
                    ) : (
                      <p>${product?.price}</p>
                    )}
                  </h6>
                  <p className="cartMenu__content__products__item__details__size">
                    Size : <span>{product?.size}</span>
                  </p>
                  <p className="cartMenu__content__products__item__details__color">
                    <p>
                      Color :<span> {product?.color}</span>
                    </p>
                    {/* <span
                      style={{
                        backgroundColor: product.color,
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                      }}
                    ></span> */}
                  </p>
                  <div className="cartMenu__content__products__item__details__counter">
                    <span
                      className="decrement"
                      onClick={() => dispatch(decrement(product))}
                    >
                      -
                    </span>
                    <span className="count">{product?.quantity}</span>
                    <span
                      className="increment"
                      onClick={() => dispatch(increment(product))}
                    >
                      +
                    </span>
                  </div>
                </div>
                <div
                  className="cartMenu__content__products__item__remove"
                  onClick={() => dispatch(removeFromCart(product))}
                >
                  <DeleteForeverIcon />
                </div>
              </div>
            ))
          ) : (
            <h5 className="cartMenu__content__title__sec">the cart is empty</h5>
          )}
        </div>

        <div className="cartMenu__content__checkOut">
          <div className="cartMenu__content__checkOut__total">
            <p className="cartMenu__content__checkOut__total__text">
              total price
            </p>
            <p>${totalPrice}</p>
            <p className="cartMenu__content__checkOut__total__text">
              total Items
            </p>
            <p>{totalItems} items</p>
          </div>
          <div className="cartMenu__content__checkOut__btns">
            <button
              className="cartMenu__content__checkOut__btns__viewCart secBtn"
              onClick={() => navigate("/cart")}
            >
              view cart
            </button>
            <button className="cartMenu__content__checkOut__btns__check mainBtn">
              check out
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default CartMenu;
