import { useFetchProducts } from "../../hooks/useFetchProducts";
import SingleProduct from "../../components/SingleProduct/SingleProduct";
import { Container, Grid, Pagination } from "@mui/material";
import "./Products.css";
import { useFetchCategories } from "../../hooks/useFetchCategories";
import UseGetCartData from "../../hooks/useGetCartData";
import useGetWishData from "../../hooks/useGetWishData";
import { storeProductsInServer } from "../../helpers/CartFunctions";
import { storeProductsWishListInServer } from "../../helpers/WishListFunctions";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FilterProducts from "../../components/FilterProducts/FilterProducts";
import { getProductsFilter } from "../../Services/ProductsApi";
const Products = () => {
  const { sectionName } = useParams();
  const [page, setPage] = useState(1);
  const [allSearchValue, setAllSearchValue] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  const [products, setProducts, totalPageNum] = useFetchProducts(
    null,
    sectionName,
    page,
    allSearchValue
  );
  // console.log("products", products);

  console.log("allSearchValue", allSearchValue);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const [productsCart, ,] = UseGetCartData();
  const [productsWish, ,] = useGetWishData();

  useEffect(() => {
    return async () => {
      storeProductsInServer(productsCart);
      storeProductsWishListInServer(productsWish);
    };
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false); // Set loading to false when products are fetched
    }
  }, [products]);
  const filterProducts = async (searchValue) => {
    // console.log("searchValue", searchValue);
    const value = searchValue.join("");
    console.log(value);
    // const newProducts = await getProductsFilter(sectionName, page, value);

    // console.log("newProducts", newProducts);
    // setProducts(newProducts.data);

    setAllSearchValue(value);
  };
  return (
    // <Container>
    //   <h1>All Products</h1>
    //   <Grid container spacing={2}>
    //     <Grid item xs={12} sm={4} md={3}>
    //       <FilterProducts
    //         sectionName={sectionName}
    //         page={page}
    //         filterProducts={filterProducts}
    //       />
    //     </Grid>
    //     <Grid item xs={12} sm={8} md={9}>
    //       {/* Products */}
    //       <Grid container spacing={2}>
    //         {products.map((item) => (
    //           <Grid key={item.id} item xs={12} sm={6} md={4}>
    //             <SingleProduct item={item} />
    //           </Grid>
    //         ))}
    //       </Grid>
    //       <div className="pagination">
    //         <Pagination
    //           count={totalPageNum}
    //           page={page}
    //           onChange={handleChange}
    //         />
    //       </div>
    //     </Grid>
    //   </Grid>
    // </Container>

    <Container>
      <h1>All Products</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={3}>
          <FilterProducts
            sectionName={sectionName}
            page={page}
            filterProducts={filterProducts}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {products.length === 0 ? (
                <div>No products available.</div>
              ) : (
                <>
                  <Grid container spacing={2}>
                    {products.map((item) => (
                      <Grid key={item.id} item xs={12} sm={6} md={4}>
                        <SingleProduct item={item} />
                      </Grid>
                    ))}
                  </Grid>
                  <div className="pagination">
                    <Pagination
                      count={totalPageNum}
                      page={page}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Products;
