import React, { useState } from "react";
import {
  Paper,
  TableRow,
  TableContainer,
  TableBody,
  Table,
  TableHead,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../helpers/CartTable";
import {
  decrement,
  increment,
  removeFromCart,
} from "../../store/slices/cartSlice";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import "./CartTable.css";
import { Favorite } from "@mui/icons-material";
import { addToWishList } from "../../store/slices/wishListSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CartTable = ({ productsCart }) => {
  const dispatch = useDispatch();
  // store the current index for product that quantity equals 0
  const [productIndex, setProductIndex] = useState(0);

  //delete the product
  const decrementQuantity = (product, index) => {
    if (product.quantity > 1) {
      dispatch(decrement(product));
      // store the current index for product that quantity equals 0
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
    <TableContainer>
      <Table
        sx={{ minWidth: 700 }}
        className="cartPage__table"
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell className="item__text">Item</StyledTableCell>
            <StyledTableCell>Unit Price</StyledTableCell>
            <StyledTableCell>Quantity</StyledTableCell>
            <StyledTableCell>Final Price</StyledTableCell>
            <StyledTableCell>Add To WishList</StyledTableCell>
            <StyledTableCell>Remove</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productsCart?.map((product, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                <div className="cartMenu__content__products__item cartPage__table__item">
                  <div className="cartTable__content__products__item__img">
                    <img src={product?.images[0]} alt="img" />
                  </div>
                  <div className="cartMenu__content__products__item__details">
                    <h6
                      className="cartMenu__content__products__item__details__title"
                      onClick={() => Navigate(`/product-details/${product.id}`)}
                    >
                      {product.title.slice(0, 20)}
                    </h6>
                    <div className="cartMenu__content__products__item__details__size">
                      Size : <span>{product?.size}</span>
                    </div>
                    <div className="cartMenu__content__products__item__details__color">
                      <div>
                        Color :<span> {product?.color}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </StyledTableCell>
              <StyledTableCell>
                <div className="cartMenu__content__products__item__details__price cartPage__table__price">
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
                </div>
              </StyledTableCell>
              <StyledTableCell>
                <div className="cartPage__table__quantity">
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
              </StyledTableCell>
              <StyledTableCell>
                <div className="cartPage__table__final">
                  $
                  {product?.quantity *
                    (
                      (product?.price * (100 - +product?.discountPercentage)) /
                      100
                    ).toFixed(2)}
                </div>
              </StyledTableCell>
              <StyledTableCell>
                <div
                  className="cartMenu__content__products__item__addWishlist"
                  title="add to wishlist"
                  onClick={() => addProductToWishList(product)}
                >
                  <Favorite />
                </div>
              </StyledTableCell>
              <StyledTableCell>
                <div
                  className="cartPage__table__remove"
                  onClick={() => dispatch(removeFromCart(product))}
                >
                  <CloseIcon />
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartTable;
