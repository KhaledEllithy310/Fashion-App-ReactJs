import { useEffect, useState } from "react";
import { getProductById, getProducts } from "../Services/ProductsApi";

export const useFetchProducts = (productId = null) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      let data;
      // fetch all products
      if (productId === null) data = await getProducts();
      // fetch product By Id
      else data = await getProductById(productId);
      console.log(data);
      setProducts(data.data);
    };

    fetchProducts();
  }, []);

  return [products, setProducts];
};
