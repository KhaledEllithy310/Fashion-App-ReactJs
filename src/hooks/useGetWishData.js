import { useSelector } from "react-redux";

export const useGetWishData = () => {
  //destructing the data of cart
  const { totalItems, wishList } = useSelector((state) => state.wishList);
  //access to the productsCart
  const productsWish = wishList?.productsWish;
  return [productsWish, totalItems];
};

export default useGetWishData;
