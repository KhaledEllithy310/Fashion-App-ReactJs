import React, { useEffect } from "react";
import "./CartMenu.css";
import { Drawer, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import UseGetCartData from "../../hooks/useGetCartData";
import CartItem from "./CartItem";
import { storeProductsInServer } from "../../helpers/CartFunctions";
import useGetWishData from "../../hooks/useGetWishData";
import { storeProductsWishListInServer } from "../../helpers/WishListFunctions";
import { Close } from "@mui/icons-material";
const CartMenu = ({ open, onClose, anchor, setCartMenu }) => {
  // const [closeMenu, setCloseMenu] = useState({});
  //get all data cart
  const [productsCart, totalItems, totalPrice] = UseGetCartData();
  const [productsWish, ,] = useGetWishData();
  useEffect(() => {
    return async () => {
      storeProductsInServer(productsCart);
      storeProductsWishListInServer(productsWish);
    };
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleViewCart = () => {
    navigate("/cart");
    setCartMenu({ right: false }); // Close the Drawer
  };

  const handleClose = () => {
    setCartMenu({ right: false }); // Close the Drawer
  };

  return (
    <Drawer anchor={anchor} open={open} onClose={onClose} className="cartMenu">
      <div className="cartMenu__content">
        <h4 className="cartMenu__content__title">
          my Cart
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
        </h4>
        <div className="cartMenu__content__products">
          {productsCart?.length > 0 ? (
            productsCart?.map((product, index) => (
              <CartItem key={index} product={product} index={index} />
            ))
          ) : (
            <h5 className="cartMenu__content__title__sec">the cart is empty</h5>
          )}
        </div>

        <div className="cartMenu__content__checkOut">
          <div className="cartMenu__content__checkOut__total">
            <p className="cartMenu__content__checkOut__total__text">
              total price
            </p>
            <p>${totalPrice}</p>
            <p className="cartMenu__content__checkOut__total__text">
              total Items
            </p>
            <p>{totalItems} items</p>
          </div>
          <div className="cartMenu__content__checkOut__btns">
            <button
              className="cartMenu__content__checkOut__btns__viewCart secBtn"
              onClick={handleViewCart}
            >
              view cart
            </button>
            <button className="cartMenu__content__checkOut__btns__check mainBtn">
              check out
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default CartMenu;
