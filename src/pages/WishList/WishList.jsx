import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Grid } from "@mui/material";
import { clearCart } from "../../store/slices/cartSlice";
import { GridView, TableRows } from "@mui/icons-material";
import WishTable from "../../components/WishTable/WishTable";
import { storeProductsWishListInServer } from "../../helpers/WishListFunctions";
import useGetWishData from "../../hooks/useGetWishData";
import WishItem from "../../components/WishItem/WishItem";
import UseGetCartData from "../../hooks/useGetCartData";
import { storeProductsInServer } from "../../helpers/CartFunctions";
import { clearWishList } from "../../store/slices/wishListSlice";

const WishList = () => {
  //get all wishList data from store
  const [productsWish] = useGetWishData();
  const dispatch = useDispatch();
  const [productsCart, ,] = UseGetCartData();

  useEffect(() => {
    return async () => {
      storeProductsInServer(productsCart);
      storeProductsWishListInServer(productsWish);
    };
  }, []);
  const [arrangeDefault, setArrangeDefault] = useState(true);

  return (
    <>
      <div className=" secondary">
        <Container>
          <Grid container className="cartPage__top">
            <Grid item xs={6} className="cartPage__top__item">
              <h4 className="cartPage__title">my wishList </h4>
            </Grid>
            <Grid item xs={6} className="cartPage__top__item">
              <div className="cartPage__iconsGrid">
                {productsWish?.length > 0 ? (
                  <button
                    className="cartMenu__content__products__clearAll secBtn"
                    onClick={() => dispatch(clearWishList())}
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
                  <GridView />
                </span>
                <span
                  className={arrangeDefault ? "active" : ""}
                  onClick={() => setArrangeDefault(true)}
                >
                  <TableRows />
                </span>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Container>
        <div className="cartPage">
          <Grid container spacing={2} className="cart__content ">
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {productsWish?.length > 0 ? (
                  arrangeDefault ? (
                    <WishTable productsWish={productsWish} />
                  ) : (
                    productsWish?.map((product, index) => (
                      <Grid key={index} item xs={12} sm={6} md={4}>
                        <WishItem product={product} index={index} />
                      </Grid>
                    ))
                  )
                ) : (
                  <h5 className="cartMenu__content__title__sec">
                    The wishList is empty.
                  </h5>
                )}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default WishList;
