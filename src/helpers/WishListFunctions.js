import {
  addWishList,
  getWishListByUserId,
  putProductsToWishList,
} from "../Services/WishListApi";
import {
  getUserIdFromLocalStorage,
  getWishListFromLocalStorage,
} from "./LocalStorageFunctions";

export const calculateTotalItemsInWish = (state) => {
  state.totalItems = 0;
  state.wishList?.productsWish.forEach((product) => {
    state.totalItems++;
  });
};

//store the products cart into the server
export const storeProductsWishListInServer = async (productsWish) => {
  let wishListUser;
  //get userId from the local storage that login
  const userId = getUserIdFromLocalStorage();
  //get the cart by userId
  userId
    ? (wishListUser = await getWishListByUserId(userId))
    : (wishListUser = null);
  //get all keys from the cart that store in local storage

  const { wishList, isLoading, totalItems } = getWishListFromLocalStorage();
  const newWishList = {
    userId: wishList?.userId,
    productsWish: wishList?.productsWish,
    isLoading,
    totalItems,
  };
  //if the cart in local storage and in server exist then update the cart with new cart else if {add cart}
  if (productsWish && wishListUser?.data?.length > 0) {
    //update the cart with the new products
    await putProductsToWishList(newWishList, userId);
  } else if (productsWish) {
    // if the cart is empty then add new object cart with userId
    //send request to server and add new cart
    addWishList(newWishList);
  }
};
