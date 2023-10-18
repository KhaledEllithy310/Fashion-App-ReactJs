import { myAxios } from "./BaseApi";

export const addUser = async (data) => {
  return await myAxios.post("/users", data);
};

export const getAllUsers = async () => {
  return await myAxios.get(`/users`);
};

// export const getProductByCategory = async (category) => {
//   return await myAxios.get(`/products/${category}`);
// };
