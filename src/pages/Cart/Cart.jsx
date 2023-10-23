import { Container, Grid, TableHead } from "@mui/material";
import React, { useEffect, useState } from "react";

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

import { UseDetectProductQuantity } from "../../helpers/CartFunctions";
import UseGetCartData from "../../hooks/useGetCartData";
import CartTable from "../../components/CartTable/CartTable";
import CartCheckOut from "../../components/CartCheckOut/CartCheckOut";
import GridViewIcon from "@mui/icons-material/GridView";
import TableRowsIcon from "@mui/icons-material/TableRows";
import CartItem from "../../components/CartMenu/CartItem";
const Cart = () => {
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  //get all data cart
  const [productsCart, totalItems, totalPrice] = UseGetCartData();

  const [arrangeDefault, setArrangeDefault] = useState(true);
  return (
    <Container className="">
      <div className="cartPage">
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <div className="cartPage__top">
              <h4 className="cartPage__title">Items in my cart</h4>
              <div className="cartPage__iconsGrid">
                <span
                  className={!arrangeDefault ? "active" : ""}
                  onClick={() => setArrangeDefault(false)}
                >
                  <GridViewIcon />
                </span>
                <span
                  className={arrangeDefault ? "active" : ""}
                  onClick={() => setArrangeDefault(true)}
                >
                  <TableRowsIcon />
                </span>
              </div>
            </div>

            <Grid container spacing={2}>
              {arrangeDefault ? (
                <CartTable productsCart={productsCart} />
              ) : productsCart?.length > 0 ? (
                productsCart?.map((product, index) => (
                  <Grid key={index} item xs={12} sm={6} md={4}>
                    <CartItem product={product} index={index} />
                  </Grid>
                ))
              ) : (
                ""
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} md={3}>
            <CartCheckOut />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Cart;
