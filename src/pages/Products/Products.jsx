import { useFetchProducts } from "../../hooks/useFetchProducts";
import SingleProduct from "../../components/SingleProduct/SingleProduct";
import { Container, Grid, Pagination } from "@mui/material";
import "./Products.css";
import { useFetchCategories } from "../../hooks/useFetchCategories";
import UseGetCartData from "../../hooks/useGetCartData";
import useGetWishData from "../../hooks/useGetWishData";
import { storeProductsInServer } from "../../helpers/CartFunctions";
import { storeProductsWishListInServer } from "../../helpers/WishListFunctions";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
const Products = () => {
  const { sectionName } = useParams();
  const [page, setPage] = React.useState(1);

  console.log();
  const [products, , totalPageNum] = useFetchProducts(null, sectionName, page);

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
  return (
    <Container>
      <h1>All Products</h1>
      {/* {categories.map((category) => (
        <button
          key={category}
          className="category__btn"
          onClick={() => getProductsByCategory(category)}
        >
          {category}
        </button>
      ))} */}
      <Grid container spacing={2}>
        {products.map((item) => (
          <Grid key={item.id} item xs={12} sm={6} md={3}>
            <SingleProduct item={item} />
          </Grid>
        ))}
      </Grid>
      <div className="pagination">
        <Pagination count={totalPageNum} page={page} onChange={handleChange} />
      </div>
    </Container>
  );
};

export default Products;
