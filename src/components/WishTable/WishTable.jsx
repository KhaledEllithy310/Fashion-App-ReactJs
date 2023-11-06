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
import { addToCart, removeFromCart } from "../../store/slices/cartSlice";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import "./WishTable.css";
import "../CartTable/CartTable.css";
import { ShoppingCart } from "@mui/icons-material";
import { RemoveFromWishList } from "../../store/slices/wishListSlice";
import { useNavigate } from "react-router-dom";
const WishTable = ({ productsWish }) => {
  const dispatch = useDispatch();
  const addToCartFromWishList = (product) => {
    dispatch(RemoveFromWishList(product));
    dispatch(addToCart(product));
  };

  const Navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 700 }}
        className="cartPage__table"
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell className="item__text">Item</StyledTableCell>
            <StyledTableCell>Unit Price</StyledTableCell>
            <StyledTableCell>Add To Cart</StyledTableCell>
            <StyledTableCell>Remove</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productsWish?.map((product, index) => (
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
                      {product.title}
                    </h6>
                    <p className="cartMenu__content__products__item__details__size">
                      Size : <span>{product?.size}</span>
                    </p>
                    <div className="cartMenu__content__products__item__details__color">
                      <p>
                        Color :<span> {product?.color}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </StyledTableCell>
              <StyledTableCell>
                <h6 className="cartMenu__content__products__item__details__price cartPage__table__price">
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
              </StyledTableCell>
              <StyledTableCell>
                <div
                  className="cartPage__table__add"
                  onClick={() => addToCartFromWishList(product)}
                >
                  <ShoppingCart />
                </div>
              </StyledTableCell>
              <StyledTableCell>
                <div
                  className="cartPage__table__remove"
                  onClick={() => dispatch(RemoveFromWishList(product))}
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

export default WishTable;
