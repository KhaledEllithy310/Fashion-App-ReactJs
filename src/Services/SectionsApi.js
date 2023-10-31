import { myAxios } from "./BaseApi";

export const getSections = async () => {
  return await myAxios.get("/sections");
};

export const getSectionsById = async (sectionId) => {
  return await myAxios.get(`/sections/${sectionId}`);
};
