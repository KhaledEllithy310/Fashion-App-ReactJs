import React from "react";
import Carousel from "react-multi-carousel";
import { responsive } from "../../helpers/data-multiSlider";
import "react-multi-carousel/lib/styles.css";
import "./ProductsSlider.css";
import { Container } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { products } from "../../helpers/data-multiSlider";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
const ProductsSlider = () => {
  const cart = useSelector((state) => state.cart, []);
  console.log(cart);

  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <Container className="productsSlider">
      <h2>Products Slider</h2>
      <Carousel responsive={responsive} className="productsSlider__cards">
        {products.map((product) => (
          <div className="productsSlider__card" key={product.id}>
            <div className="productsSlider__card__details">
              <img
                className="productsSlider__card__details__img"
                src={product.image}
                alt={product.title}
              />
              <div className="productsSlider__card__details__content">
                <h5 className="productsSlider__card__details__title">
                  {product.title.slice(0, 10)}
                </h5>
                <h5 className="productsSlider__card__details__price">
                  ${product.price}
                </h5>
              </div>
            </div>
            <div className="productsSlider__card__Icons">
              <div className="productsSlider__card__Icons__wish">
                {<Favorite />}
              </div>
              <button
                className="productsSlider__card__addToCart"
                onClick={() => handleAddToCart(product)}
              >
                add to cart <span>{<ShoppingBagIcon />}</span>
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </Container>
  );
};

export default ProductsSlider;
