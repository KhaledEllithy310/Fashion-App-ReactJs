import { useFetchProducts } from "../../hooks/useFetchProducts";
import SingleProduct from "../../components/SingleProduct/SingleProduct";
import { Container, Grid } from "@mui/material";
import "./Products.css";
import { useFetchCategories } from "../../hooks/useFetchCategories";
const Products = () => {
  const [products, setProducts] = useFetchProducts();
  const [categories, setCategories] = useFetchCategories();
  // console.log(products);
  // console.log(categories);
  const getProductsByCategory = (category) => {
    console.log(category);
  };
  return (
    <Container>
      <h1>All Products</h1>
      {categories.map((category) => (
        <button
          key={category}
          className="category__btn"
          onClick={() => getProductsByCategory(category)}
        >
          {category}
        </button>
      ))}
      <Grid container spacing={2}>
        {products.map((item) => (
          <Grid key={item.id} item xs={12} sm={6} md={3}>
            <SingleProduct item={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
