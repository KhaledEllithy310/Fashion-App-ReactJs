import { useEffect, useState } from "react";
import {
  getCategories,
  getCategoryBySectionId,
} from "../Services/CategoriesApi.js";

export const useFetchCategories = (sectionId = null) => {
  const [categories, setCategories] = useState({});
  useEffect(() => {
    const fetchCategories = async () => {
      let data;
      // fetch all products
      if (sectionId === null) data = await getCategories();
      // fetch product By Id
      else data = await getCategoryBySectionId(sectionId);
      // console.log(data);
      setCategories(data.data);
    };

    fetchCategories();
  }, [sectionId]);

  return [categories, setCategories];
};
