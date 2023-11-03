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

  useEffect(() => {
    console.log("productId", productId);
    console.log("sectionName", sectionName);
    console.log("pageNumber", pageNumber);
    console.log("searchValue", searchValue);
    const fetchProducts = async () => {
      try {
        let data;
        if (productId === null && searchValue === "") {
          // Fetch all products with pagination
          console.log("searchValue === '' ");
          data = await getProductsPaginate(sectionName, pageNumber);
          const allProducts = await getProducts(sectionName);
          setTotalPageNum(Math.ceil(allProducts.data.length / 8));
        } else if (productId === null && searchValue !== "") {
          // Fetch filtered products with pagination
          console.log("searchValue !== null");
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
      }
    };

    fetchProducts();
  }, [pageNumber, productId, searchValue, sectionName]);

  return [products, setProducts, totalPageNum];
};
