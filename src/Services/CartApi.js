import { myAxios } from "./BaseApi";

export const getAllCarts = async () => {
  return await myAxios.get("/carts");
};
export const getCartByUserId = async (userId) => {
  return await myAxios.get(`/users/${userId}/carts`);
};

export const addProductToCart = async (cartData) => {
  return await myAxios.post(`/carts`, cartData);
};
