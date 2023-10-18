import { myAxios } from "./BaseApi";

export const getCategories = async () => {
  return await myAxios.get("/categories");
};

export const getCategoryById = async (categoryId) => {
  return await myAxios.get(`/categories/${categoryId}`);
};
