import { useEffect, useState } from "react";
import {
  getProductById,
  getProducts,
  getProductsFilter,
  getProductsPaginate,
} from "../Services/ProductsApi";

export const useFetchProducts = (
  productId = null,
  sectionName,
  pageNumber = 1,
  searchValue = ""
) => {
  const [products, setProducts] = useState([]);
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let data;
        setIsLoading(true);
        if (productId === null && searchValue === "") {
          // Fetch all products with pagination
          data = await getProductsPaginate(sectionName, pageNumber);
          const allProducts = await getProducts(sectionName);
          setTotalPageNum(Math.ceil(allProducts.data.length / 8));
        } else if (productId === null && searchValue !== "") {
          // Fetch filtered products with pagination
          data = await getProductsFilter(sectionName, pageNumber, searchValue);
          const allFilteredProducts = await getProducts(
            sectionName,
            searchValue
          );
          setTotalPageNum(Math.ceil(allFilteredProducts.data.length / 8));
        } else {
          // Fetch product by ID
          data = await getProductById(productId);
        }

        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [pageNumber, productId, searchValue, sectionName]);

  return [products, setProducts, totalPageNum, isLoading];
};
