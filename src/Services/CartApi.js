import { myAxios } from "./BaseApi";

export const getAllCarts = async () => {
  try {
    return await myAxios.get("/carts");
  } catch (e) {
    console.log(e);
  }
};

export const getCartByUserId = async (userId) => {
  try {
    return await myAxios.get(`/users/${userId}/carts`);
  } catch (e) {
    console.log(e);
  }
};

export const addCart = async (cartData) => {
  try {
    return await myAxios.post(`/carts`, cartData);
  } catch (e) {
    console.log(e);
  }
};

export const putProductsToCart = async (products, userId) => {
  try {
    const cartId = await getCartIdByUserId(userId);
    return await myAxios.put(`/carts/${cartId}`, products);
  } catch (e) {
    console.log(e);
  }
};

export const getCartIdByUserId = async (userId) => {
  try {
    const response = await myAxios.get(`/carts?userId=${userId}`);
    const cart = response.data[0]; // Assuming there is only one cart per user
    const cartId = cart ? cart.id : null; // Get the cartId if cart exists
    return cartId;
  } catch (error) {
    console.error("Error retrieving cart by userId:", error);
    return null;
  }
};
