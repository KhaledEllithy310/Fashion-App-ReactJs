import { myAxios } from "./BaseApi";

export const getProducts = async () => {
  return await myAxios.get("/products");
};

export const getProductById = async (productId) => {
  return await myAxios.get(`/products/${productId}`);
};

export const getProductByCategory = async (category) => {
  return await myAxios.get(`/products/${category}`);
};
