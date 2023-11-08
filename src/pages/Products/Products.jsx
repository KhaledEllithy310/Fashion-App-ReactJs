import { useFetchProducts } from "../../hooks/useFetchProducts";
import SingleProduct from "../../components/SingleProduct/SingleProduct";
import {
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Pagination,
  useMediaQuery,
} from "@mui/material";
import "./Products.css";
import UseGetCartData from "../../hooks/useGetCartData";
import useGetWishData from "../../hooks/useGetWishData";
import { storeProductsInServer } from "../../helpers/CartFunctions";
import { storeProductsWishListInServer } from "../../helpers/WishListFunctions";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FilterProducts from "../../components/FilterProducts/FilterProducts";
import { useTheme } from "@emotion/react";
import { Close, FilterAlt } from "@mui/icons-material";
import Spinner from "../../components/Spinner/Spinner";
const Products = () => {
  const { sectionName } = useParams();
  const [page, setPage] = useState(1);
  const [allSearchValue, setAllSearchValue] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  const [products, , totalPageNum, isLoading] = useFetchProducts(
    null,
    sectionName,
    page,
    allSearchValue
  );

  const handleChange = (event, value) => {
    setPage(value);
  };
  const [productsCart, ,] = UseGetCartData();
  const [productsWish, ,] = useGetWishData();

  useEffect(() => {
    return async () => {
      storeProductsInServer(productsCart);
      storeProductsWishListInServer(productsWish);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    if (products.length > 0) {
      setLoading(false); // Set loading to false when products are fetched
    }
  }, [products]);
  const filterProducts = async (searchValue) => {
    const value = searchValue.join("");
    setAllSearchValue(value);
  };
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resetFilterProducts = () => {
    setAllSearchValue("");
  };
  return (
    <>
      <h2 className="section__title">{sectionName}</h2>
      <Container className="p-30 products">
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          PaperProps={{
            sx: { maxWidth: "800px" },
          }}
        >
          <DialogTitle id="responsive-dialog-title" className="dialog__filter">
            filter options
          </DialogTitle>
          <IconButton
            aria-label="close"
            className="closeFilterBtn"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <Close />
          </IconButton>
          <DialogContent className="dialog__filter__content">
            <DialogContentText>
              {/* Filter Products component */}
              <FilterProducts
                sectionName={sectionName}
                page={page}
                filterProducts={filterProducts}
                resetFilterProducts={resetFilterProducts}
              />
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={3} className="filter__container">
            <FilterProducts
              sectionName={sectionName}
              page={page}
              filterProducts={filterProducts}
              resetFilterProducts={resetFilterProducts}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <div className="filter__options">
              <div className="showFilter " onClick={handleClickOpen}>
                <FilterAlt />
              </div>

              <div className="resetFilter secBtn" onClick={resetFilterProducts}>
                Reset
              </div>
            </div>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {products.length === 0 ? (
                  <h4 className="cartMenu__content__title__sec">
                    No products available.
                  </h4>
                ) : (
                  <>
                    <Grid container spacing={2}>
                      {products.map((item) => (
                        <Grid key={item.id} item xs={12} sm={6} md={4}>
                          <SingleProduct item={item} />
                        </Grid>
                      ))}
                    </Grid>
                    <div className="pagination">
                      <Pagination
                        count={totalPageNum}
                        page={page}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Products;
