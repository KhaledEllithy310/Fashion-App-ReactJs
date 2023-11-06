import React from "react";
import { useDispatch } from "react-redux";
import { RemoveFromWishList } from "../../store/slices/wishListSlice";
import { addToCart } from "../../store/slices/cartSlice";
import { DeleteForever, ShoppingCart } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const WishItem = ({ product, index }) => {
  const dispatch = useDispatch();

  // add product to cart and remove it from wishlist
  const addToCartFromWishList = (product) => {
    dispatch(RemoveFromWishList(product));
    dispatch(addToCart(product));
  };
  const Navigate = useNavigate();

  return (
    <Grid container className="cartMenu__content__products__item">
      <Grid item xs={3}>
        <div className="cartMenu__content__products__item__img">
          <img src={product?.images[0]} alt="img" />
        </div>
      </Grid>

      <Grid item xs={7}>
        <div className="cartMenu__content__products__item__details">
          <h6
            className="cartMenu__content__products__item__details__title"
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
          <p className="cartMenu__content__products__item__details__size">
            Size : <span>{product?.size}</span>
          </p>
          <div className="cartMenu__content__products__item__details__color">
            <p>
              Color :<span> {product?.color}</span>
            </p>
          </div>
        </div>
      </Grid>

      <div className="cartMenu__content__products__item__icons">
        <div
          className="cartPage__table__add"
          onClick={() => addToCartFromWishList(product)}
        >
          <ShoppingCart />
        </div>

        <div
          className="cartMenu__content__products__item__remove"
          title="remove product"
          onClick={() => dispatch(RemoveFromWishList(product))}
        >
          <DeleteForever />
        </div>
      </div>
    </Grid>
  );
};

export default WishItem;
