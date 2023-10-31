import { myAxios } from "./BaseApi";

export const getCategories = async () => {
  return await myAxios.get("/categories");
};

// export const getCategoryById = async (categoryId) => {
//   return await myAxios.get(`/categories/${categoryId}`);
// };

export const getCategoryBySectionId = async (sectionId) => {
  return await myAxios.get(`/categories?sectionId=${sectionId}`);
};
