import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { responsive } from "../../helpers/data-multiSlider";
import "react-multi-carousel/lib/styles.css";
import "./ProductsSlider.css";
import { Container } from "@mui/material";
import SingleProduct from "../SingleProduct/SingleProduct";
import { useFetchSections } from "../../hooks/useFetchSections";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import Spinner from "./../Spinner/Spinner";

const ProductsSlider = () => {
  const [targetSectionName, setTargetSectionName] = useState(null);
  const [products, , , isLoading] = useFetchProducts(null, targetSectionName);

  const [sections] = useFetchSections();

  const defaultSectionData = sections[0];

  useEffect(() => {
    if (defaultSectionData) {
      setTargetSectionName(defaultSectionData?.name);

      handleSectionButtonClick(defaultSectionData);
    }
  }, [defaultSectionData]);

  const handleSectionButtonClick = (section) => {
    setTargetSectionName(section.name);
  };

  const limitedProducts = products.slice(0, 6);

  return (
    <div className="productsSlider">
      <Container>
        <h2 className="productsSlider__title main__title">
          Our top-selling products
        </h2>
        <div className="container__sections__btn">
          {sections?.map((section) => (
            <button
              key={section.id}
              className={`secBtn mx-10 ${
                section.name === targetSectionName ? "active" : ""
              }`}
              onClick={() => handleSectionButtonClick(section)}
            >
              {section.name}
            </button>
          ))}
        </div>
        {limitedProducts.length > 0 &&
          (isLoading ? (
            <Spinner />
          ) : (
            <Carousel responsive={responsive} className="productsSlider__cards">
              {limitedProducts.map((item) => (
                <SingleProduct key={item.id} item={item} />
              ))}
            </Carousel>
          ))}
      </Container>
    </div>
  );
};

export default ProductsSlider;
