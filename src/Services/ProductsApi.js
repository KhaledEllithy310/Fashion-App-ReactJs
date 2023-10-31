import { myAxios } from "./BaseApi";

export const getProducts = async (sectionName, pageNumber) => {
  return await myAxios.get(`/products?section=${sectionName}`);
};
export const getProductsPaginate = async (sectionName, pageNumber) => {
  return await myAxios.get(
    `/products?section=${sectionName}&_page=${pageNumber}&_limit=8`
  );
};
// export const getProducts = async (sectionName) => {
//   return await myAxios.get(`/products?section=${sectionName}`);
// };

export const getProductById = async (productId) => {
  return await myAxios.get(`/products/${productId}`);
};

// export const getProductByCategory = async (category) => {
//   return await myAxios.get(`/products/${category}`);
// };
export const getProductByCategoryName = async (sectionName, categoryName) => {
  return await myAxios.get(
    `/products?category=${categoryName}&section=${sectionName}`
  );
};
