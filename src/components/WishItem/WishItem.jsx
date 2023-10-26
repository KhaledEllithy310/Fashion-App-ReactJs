import React from "react";
import { useDispatch } from "react-redux";
import { RemoveFromWishList } from "../../store/slices/wishListSlice";
import { addToCart } from "../../store/slices/cartSlice";
import { DeleteForever, ShoppingCart } from "@mui/icons-material";

const WishItem = ({ product, index }) => {
  const dispatch = useDispatch();

  // add product to cart and remove it from wishlist
  const addToCartFromWishList = (product) => {
    dispatch(RemoveFromWishList(product));
    dispatch(addToCart(product));
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
      </div>
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
    </div>
  );
};

export default WishItem;
