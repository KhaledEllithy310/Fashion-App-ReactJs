import { useEffect, useState } from "react";
import {
  getProductById,
  getProducts,
  getProductsPaginate,
} from "../Services/ProductsApi";

export const useFetchProducts = (
  productId = null,
  sectionName,
  pageNumber = 1
) => {
  const [products, setProducts] = useState([]);
  const [totalPageNum, setTotalPageNum] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      let data;
      // fetch all products
      if (productId === null) {
        data = await getProductsPaginate(sectionName, pageNumber);
        const allProducts = await getProducts(sectionName);
        setTotalPageNum(Math.ceil(allProducts.data.length / 8));
      }
      // fetch product By Id
      else data = await getProductById(productId);
      // console.log(data);
      setProducts(data.data);
    };

    fetchProducts();
  }, [pageNumber, productId, sectionName]);

  return [products, setProducts, totalPageNum];
};
