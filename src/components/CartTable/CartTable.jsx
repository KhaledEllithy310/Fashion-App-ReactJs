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
import { UseDetectProductQuantity } from "../../helpers/CartFunctions";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import "./CartTable.css";

const CartTable = ({ productsCart }) => {
  const dispatch = useDispatch();
  // store the current index for product that quantity equals 0
  const [productIndex, setProductIndex] = useState(0);
  // when quantity equals 0 suggest to user to delete this product or make quantity equal 1
  UseDetectProductQuantity(productsCart, productIndex);
  //delete the product
  const decrementQuantity = (product, index) => {
    if (product.quantity >= 1) {
      dispatch(decrement(product));
      // store the current index for product that quantity equals 0
      setProductIndex(index);
    }
  };
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
            <StyledTableCell>Quantity</StyledTableCell>
            <StyledTableCell>Final Price</StyledTableCell>
            <StyledTableCell>Remove</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productsCart.map((product, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                <div className="cartMenu__content__products__item cartPage__table__item">
                  <div className="cartMenu__content__products__item__img">
                    <img src={product?.images[0]} alt="img" />
                  </div>
                  <div className="cartMenu__content__products__item__details">
                    <h6 className="cartMenu__content__products__item__details__title">
                      {product.title}
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
