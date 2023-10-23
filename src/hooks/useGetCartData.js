import { useSelector } from "react-redux";

export const UseGetCartData = () => {
  //destructing the data of cart
  const { totalItems, cart, totalPrice } = useSelector((state) => state.cart);
  //access to the productsCart
  const productsCart = cart.productsCart;

  return [productsCart, totalItems, totalPrice];
};

export default UseGetCartData;
