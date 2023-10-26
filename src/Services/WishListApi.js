import { myAxios } from "./BaseApi";

export const getAllWishList = async () => {
  try {
    return await myAxios.get("/wishLists");
  } catch (e) {
    console.log(e);
  }
};

export const getWishListByUserId = async (userId) => {
  try {
    return await myAxios.get(`/users/${userId}/wishLists`);
  } catch (e) {
    console.log(e);
  }
};

export const addWishList = async (wishListData) => {
  try {
    return await myAxios.post(`/wishLists`, wishListData);
  } catch (e) {
    console.log(e);
  }
};

export const getWishListIdByUserId = async (userId) => {
  try {
    const response = await myAxios.get(`/wishLists?userId=${userId}`);
    const wishList = response.data[0]; // Assuming there is only one wishList per user
    const wishListId = wishList ? wishList.id : null; // Get the wishListId if cart exists
    return wishListId;
  } catch (error) {
    console.error("Error retrieving wishLists by userId:", error);
    return null;
  }
};

export const putProductsToWishList = async (products, userId) => {
  try {
    const wishListId = await getWishListIdByUserId(userId);
    return await myAxios.put(`/wishLists/${wishListId}`, products);
  } catch (e) {
    console.log(e);
  }
};
