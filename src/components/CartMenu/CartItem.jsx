import React, { useState } from "react";
import { decrement, increment } from "../../store/slices/cartSlice";
import { useDispatch } from "react-redux";
import { UseDetectProductQuantity } from "../../helpers/CartFunctions";
import UseGetCartData from "../../hooks/useGetCartData";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const CartItem = ({ product, index }) => {
  const dispatch = useDispatch();
  const [productsCart, totalItems, totalPrice] = UseGetCartData();

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
        onClick={() => decrementQuantity(product, index)}
      >
        <DeleteForeverIcon />
      </div>
    </div>
  );
};

export default CartItem;
