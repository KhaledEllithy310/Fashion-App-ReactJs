import React, { useState } from "react";
import {
  decrement,
  increment,
  removeFromCart,
} from "../../store/slices/cartSlice";
import { useDispatch } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { addToWishList } from "../../store/slices/wishListSlice";
import { Favorite } from "@mui/icons-material";
import UseGetCartData from "../../hooks/useGetCartData";
import Swal from "sweetalert2";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const CartItem = ({ product, index }) => {
  const dispatch = useDispatch();
  //get all products cart from store
  const [productsCart, ,] = UseGetCartData();
  // store the current index for product that quantity equals 0
  const [productIndex, setProductIndex] = useState(0);

  //delete the product
  const decrementQuantity = (product, index) => {
    if (product.quantity > 1) {
      dispatch(decrement(product));
      setProductIndex(index);
    } else {
      // when quantity equals 0 suggest to user to delete this product or make quantity equal 1
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
        }
      });
    }
  };
  // add product to wishlist and remove it from cart
  const addProductToWishList = (product) => {
    dispatch(removeFromCart(product));
    dispatch(addToWishList(product));
  };
  const Navigate = useNavigate();

  return (
    <Grid container className="cartMenu__content__products__item" key={index}>
      <Grid item xs={3} className="cartMenu__content__products__item__img">
        <img src={product?.images[0]} alt="img" />
      </Grid>
      <Grid item xs={7} className="cartMenu__content__products__item__details">
        <h6
          className="cartMenu__content__products__item__details__title"
          title={product.title}
          onClick={() => Navigate(`/product-details/${product.id}`)}
        >
          {product.title}
        </h6>
        <div className="cartMenu__content__products__item__details__price">
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
        </div>
        <div className="cartMenu__content__products__item__details__size">
          Size : <span>{product?.size}</span>
        </div>
        <div className="cartMenu__content__products__item__details__color">
          <p>
            Color :<span> {product?.color}</span>
          </p>
        </div>
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
      </Grid>
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
    </Grid>
  );
};

export default CartItem;
