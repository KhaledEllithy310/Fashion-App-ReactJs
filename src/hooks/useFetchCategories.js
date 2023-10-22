import { useEffect, useState } from "react";
import { getCategories, getCategoryById } from "../Services/CategoriesApi.js";

export const useFetchCategories = (categoryId = null) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      let data;
      // fetch all products
      if (categoryId === null) data = await getCategories();
      // fetch product By Id
      else data = await getCategoryById(categoryId);
      // console.log(data);
      setCategories(data.data);
    };

    fetchCategories();
  }, []);

  return [categories, setCategories];
};
