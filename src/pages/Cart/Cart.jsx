import { Container, Grid, TableHead } from "@mui/material";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { rows } from "./TablePaginationActions";
import { StyledTableCell, StyledTableRow } from "../../helpers/CartTable";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  removeFromCart,
} from "../../store/slices/cartSlice";
import "../../components/CartMenu/CartMenu.css";
import "./Cart.css";
import CloseIcon from "@mui/icons-material/Close";
import AppInput from "./../../components/AppInput/AppInput";
const Cart = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //destructing the data of cart
  const { totalItems, cart, totalPrice } = useSelector((state) => state.cart);
  //access to the productsCart
  const productsCart = cart.productsCart;

  const dispatch = useDispatch();

  const [togglePromoCode, setTogglePromoCode] = useState(false);
  return (
    <Container className="">
      <div className="cartPage">
        <Grid container spacing={2}>
          <Grid item md={9}>
            <h4 className="cartPage__title">Items in my cart</h4>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 700 }}
                className="cartPage__table"
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell className="item__text">
                      Item
                    </StyledTableCell>
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
                      </StyledTableCell>
                      <StyledTableCell>
                        <div className="cartPage__table__final">
                          $
                          {product?.quantity *
                            (
                              (product?.price *
                                (100 - +product?.discountPercentage)) /
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
          </Grid>
          <Grid item md={3}>
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
                    {!togglePromoCode
                      ? "i have promocode ."
                      : "i don't have promocode ."}
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
                  <h6 className="text">total</h6>
                  <h6 className="price">{totalPrice + 40 + 60}</h6>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Cart;
