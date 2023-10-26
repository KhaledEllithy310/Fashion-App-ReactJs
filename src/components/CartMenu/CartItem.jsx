import React, { useEffect, useState } from "react";
import {
  addToCart,
  decrement,
  increment,
  removeFromCart,
} from "../../store/slices/cartSlice";
import { useDispatch } from "react-redux";
import { UseDetectProductQuantity } from "../../helpers/CartFunctions";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useGetCartDataFromLocalStorage } from "../../helpers/LocalStorageFunctions";
import {
  RemoveFromWishList,
  addToWishList,
} from "../../store/slices/wishListSlice";
import { Favorite, ShoppingCart } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import UseGetCartData from "../../hooks/useGetCartData";

export const CartItem = ({ product, index }) => {
  const dispatch = useDispatch();
  //get all products cart from store
  const [productsCart, ,] = UseGetCartData();
  // store the current index for product that quantity equals 0
  const [productIndex, setProductIndex] = useState(0);
  // when quantity equals 0 suggest to user to delete this product or make quantity equal 1
  UseDetectProductQuantity(productsCart, productIndex);
  //delete the product
  const decrementQuantity = (product, index) => {
    if (product.quantity >= 1) {
      dispatch(decrement(product));
      setProductIndex(index);
    }
  };
  // add product to wishlist and remove it from cart
  const addProductToWishList = (product) => {
    dispatch(removeFromCart(product));
    dispatch(addToWishList(product));
  };

  return (
    <div className="cartMenu__content__products__item" key={index}>
      <div className="cartMenu__content__products__item__img">
        <img src={product?.images[0]} alt="img" />
      </div>
      <div className="cartMenu__content__products__item__details">
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
                  (product?.price * (100 - +product?.discountPercentage)) /
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
        </p>
        <div className="cartMenu__content__products__item__details__counter">
          <span
            className="decrement"
            onClick={() => decrementQuantity(product, index)}
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
      <div className="cartMenu__content__products__item__icons">
        <div
          className="cartMenu__content__products__item__addWishlist"
          title="add to wishlist"
          onClick={() => addProductToWishList(product)}
        >
          <Favorite />
        </div>
        <div
          className="cartMenu__content__products__item__remove"
          title="remove product"
          onClick={() => dispatch(removeFromCart(product))}
        >
          <DeleteForeverIcon />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
