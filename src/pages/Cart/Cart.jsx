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
import useGetWishData from "../../hooks/useGetWishData";
const Cart = () => {
  //get all data cart
  const [productsCart, ,] = UseGetCartData();
  const [productsWish, ,] = useGetWishData();
  const dispatch = useDispatch();

  const [arrangeDefault, setArrangeDefault] = useState(true);
  useEffect(() => {
    return () => {
      storeProductsInServer(productsCart);
      storeProductsWishListInServer(productsWish);
    };
  }, []);
  return (
    <>
      <div className="secondary">
        <Container>
          <Grid container className="cartPage__top">
            <Grid item xs={6} className="cartPage__top__item">
              <h3 className="cartPage__title">my cart</h3>
            </Grid>
            <Grid item xs={6} className="cartPage__top__item">
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
            </Grid>
          </Grid>
        </Container>
      </div>
      <Container>
        <div className="cartPage">
          <Grid container spacing={2} className="cart__content">
            <Grid item xs={12} md={9}>
              <Grid container spacing={2}>
                {productsCart?.length > 0 ? (
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
            {productsCart.length > 0 && (
              <Grid item xs={12} md={3}>
                <CartCheckOut />
              </Grid>
            )}
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Cart;
