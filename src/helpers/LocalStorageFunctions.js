//****************** start cart ******************//

//get Cart of User from the local storage that login
export const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || {};
};

// export const useGetCartDataFromLocalStorage = (key, data) => {
//   const { totalItems, cart, totalPrice } = JSON.parse(
//     localStorage.getItem("cart")
//   );
//   //access to the productsCart
//   const productsCart = cart?.productsCart;

//   return [productsCart, totalItems, totalPrice];
// };

//****************** end cart ******************//

//****************** start wishList ******************//

//get Cart of User from the local storage that login
export const getWishListFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("wishList")) || {};
};

// export const useGetWishListDataFromLocalStorage = () => {
//   const { totalItems, wishList } =
//     JSON.parse(localStorage.getItem("wishList")) || {};
//   //access to the productsCart
//   const productsWish = wishList?.productsWish;
//   return [productsWish, totalItems];
// };

//****************** end wishList ******************//

//****************** start Auth ******************//

//get Cart of User from the local storage that login
export const getAuthFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("isLoggedIn"))?.isAuth || {};
};

//get userId from the local storage that login
export const getUserIdFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("isLoggedIn"))?.userData?.id;
};

//****************** end Auth ******************//

export const setDataInLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
