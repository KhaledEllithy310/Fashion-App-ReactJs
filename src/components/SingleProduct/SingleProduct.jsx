/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "./SingleProduct.css";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ShoppingCart, Visibility } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ProductDetails from "./../../pages/ProductDetails/ProductDetails";

const SingleProduct = ({ item }) => {
  //   const url = "http://localhost:3006/products";
  //   const [, , products] = useFetch(url);

  //   const { cart } = useSelector((state) => state.productsInCart);
  //   const dispatch = useDispatch();

  const addToCart = (productId) => {
    // let targetProduct = products.find((product) => product.id == productId);
    // let isProductExist = cart.find((product) => product.id == productId);
    // if (isProductExist) {
    //   toastrMin.error("Product already exists");
    // } else {
    //   dispatch(addItemToCart(targetProduct));
    //   dispatch(increment());
    //   toastrMin.success("added product successfully");
    // }
  };

  //open dialog foe show product
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  return (
    <div className="product">
      <div className="product__image">
        <img src={item.images[0]} alt="Image 1" />
      </div>
      <div className="product__content">
        <div className="product__content__rating">
          <li>
            <StarIcon />
          </li>
          <li>
            <StarIcon />
          </li>
          <li>
            <StarIcon />
          </li>
          <li>
            <StarIcon />
          </li>
          <li>
            <StarIcon />
          </li>
        </div>
        <h6 className="product__content__text">
          <Link to={""}>{item.title}</Link>
        </h6>
        <div className="product__content__price">
          {item.discountPercentage ? (
            <>
              <p className="product__content__price__before">
                <del>${item.price}</del>
              </p>
              <p className="product__content__price__after">
                $
                {(
                  (item.price * (100 - +item.discountPercentage)) /
                  100
                ).toFixed(2)}
              </p>
            </>
          ) : (
            <p>${item.price}</p>
          )}
        </div>
      </div>
      <div className="product__icons">
        <li title="Add to Wishlist">
          <FavoriteIcon />
        </li>
        <li
          title="Show Details"
          onClick={() => navigate(`/product-details/${item.id}`)}
        >
          <Visibility />
        </li>
        <li title="Add to Cart" onClick={handleClickOpen}>
          <ShoppingCart />
        </li>
      </div>
      <span className="product__discount">-{item.discountPercentage}%</span>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          sx: { "max-width": "800px" },
        }} 
      >
        <DialogTitle
          id="responsive-dialog-title"
          className="dialog__productDetails"
        >
          Product Details
        </DialogTitle>
        <DialogContent className="dialog__productDetails">
          <DialogContentText>
            {/* <h1>{item.id}</h1>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running. */}
            <ProductDetails productId={item.id} />
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
};

export default SingleProduct;
