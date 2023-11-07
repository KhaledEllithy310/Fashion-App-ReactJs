/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import "./SingleProduct.css";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Close, ShoppingCart, Visibility } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import ProductDetails from "./../../pages/ProductDetails/ProductDetails";
import { useDispatch } from "react-redux";
import { addToWishList } from "../../store/slices/wishListSlice";

const SingleProduct = ({ item }) => {
  // console.log("item", item.images);
  const colors = Object.keys(item.images);
  // console.log(item.images[colors[0]][0]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //open dialog foe show product
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="product">
      <div className="product__image">
        <img src={item.images[colors[0]][0]} alt="Image 1" />
      </div>
      <div className="product__content">
        <ul className="product__content__rating">
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
        </ul>
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
      <ul className="product__icons">
        <li title="Add to Wishlist" onClick={handleClickOpen}>
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
      </ul>
      <span className="product__discount">-{item.discountPercentage}%</span>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          sx: { maxWidth: "900px" },
        }}
      >
        <DialogTitle
          id="responsive-dialog-title"
          className="dialog__productDetails"
        >
          Product Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <DialogContent className="dialog__productDetails">
          <DialogContentText>
            {/* single product component */}
            {<ProductDetails productId={item.id} />}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SingleProduct;
