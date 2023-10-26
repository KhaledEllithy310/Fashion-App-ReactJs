import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../components/CartMenu/CartMenu.css";
import "./Cart.css";
import UseGetCartData from "../../hooks/useGetCartData";
import CartTable from "../../components/CartTable/CartTable";
import CartCheckOut from "../../components/CartCheckOut/CartCheckOut";
import GridViewIcon from "@mui/icons-material/GridView";
import TableRowsIcon from "@mui/icons-material/TableRows";
import CartItem from "../../components/CartMenu/CartItem";
import { storeProductsInServer } from "../../helpers/CartFunctions";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/slices/cartSlice";
import { storeProductsWishListInServer } from "../../helpers/WishListFunctions";
import { useGetWishListDataFromLocalStorage } from "../../helpers/LocalStorageFunctions";
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
  const [productsCart, ,] = UseGetCartData();
  const [productsWish, ,] = useGetWishListDataFromLocalStorage();
  const dispatch = useDispatch();

  const [arrangeDefault, setArrangeDefault] = useState(true);
  useEffect(() => {
    return () => {
      storeProductsInServer(productsCart);
      storeProductsWishListInServer(productsWish);
    };
  }, []);
  return (
    <Container className="">
      <div className="cartPage">
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <div className="cartPage__top">
              <h4 className="cartPage__title">Items in my cart</h4>
              <div className="cartPage__iconsGrid">
                {productsCart?.length > 0 ? (
                  <button
                    className="cartMenu__content__products__clearAll secBtn"
                    onClick={() => dispatch(clearCart())}
                  >
                    clear all
                  </button>
                ) : (
                  ""
                )}
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
              {/* {productsCart.length > 0 ? (
                arrangeDefault ? (
                  <CartTable productsCart={productsCart} />
                ) : productsCart?.length > 0 ? (
                  productsCart?.map((product, index) => (
                    <Grid key={index} item xs={12} sm={6}>
                      <CartItem product={product} index={index} />
                    </Grid>
                  ))
                ) : (
                  ""
                )
              ) : (
                <h5 className="cartMenu__content__title__sec">
                  the cart is empty
                </h5>
              )} */}
              {productsCart.length > 0 ? (
                arrangeDefault ? (
                  <CartTable productsCart={productsCart} />
                ) : (
                  productsCart?.map((product, index) => (
                    <Grid key={index} item xs={12} sm={6}>
                      <CartItem product={product} index={index} />
                    </Grid>
                  ))
                )
              ) : (
                <h5 className="cartMenu__content__title__sec">
                  The cart is empty.
                </h5>
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
