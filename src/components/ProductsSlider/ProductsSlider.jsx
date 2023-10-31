import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { responsive } from "../../helpers/data-multiSlider";
import "react-multi-carousel/lib/styles.css";
import "./ProductsSlider.css";
import { Container } from "@mui/material";
import SingleProduct from "../SingleProduct/SingleProduct";
import { useFetchSections } from "../../hooks/useFetchSections";
import { useFetchCategories } from "../../hooks/useFetchCategories";
import { getProductByCategoryName } from "../../Services/ProductsApi";
const ProductsSlider = () => {
  const [targetSectionId, setTargetSectionId] = useState(null);
  const [targetSectionName, setTargetSectionName] = useState(null);
  const [targetCategoryName, setTargetCategoryName] = useState("");
  const [products, setProducts] = useState([]);
  //get all categories according section id - default sectionId =1
  const [categories] = useFetchCategories(targetSectionId);
  //get all sections
  const [sections] = useFetchSections();
  //store all category according sectionId in {categoryData}
  // console.log(sections);
  const sectionData = sections[0];
  // console.log(sectionData);
  const categoryData = categories[0]?.categories;
  const sectionIdOfCategory = categories[0]?.sectionId;
  // console.log("targetSectionId", targetSectionId);
  // console.log("targetCategoryName", targetCategoryName);
  useEffect(() => {
    setTargetSectionId(sectionIdOfCategory);
    //get all products according category - default categoryName = the first{index =0}
    if (sectionData && categoryData) {
      setTargetCategoryName(categoryData[0]?.name);
      setTargetSectionName(sectionData?.name);
      //get all products according category name and put it in store {redux toolkit}

      handleSectionBtn(sectionData);
    }
  }, [sectionData]);
  //fetch all products from server

  //set the section that selected to show the categories
  const handleSectionBtn = (section) => {
    setTargetSectionId(section.id);
    setTargetSectionName(section.name);

    handleCategoriesBtn(section.name, categoryData[0]?.name);
  };

  const handleCategoriesBtn = async (sectionName, categoryName) => {
    setTargetCategoryName(categoryName);
    const products = await getProductByCategoryName(sectionName, categoryName);
    setProducts(products.data);
  };

  // Limit the number of products to 6
  const limitedProducts = products.slice(0, 6);
  // const limitedProducts = products;
  return (
    <Container className="productsSlider">
      <h2 className="productsSlider__title">our top seller products</h2>
      {/* render the sections */}
      <div className="container__sections__btn">
        {sections?.map((section) => (
          <button
            key={section.id}
            className={`secBtn mx-10 ${
              section.id === targetSectionId ? "active" : ""
            }`}
            onClick={() => handleSectionBtn(section)}
          >
            {section.name}
          </button>
        ))}
      </div>
      {/* render the categories of section */}
      <div className="container__sections__btn">
        {categoryData?.map((category) => (
          <button
            key={category.id}
            className={`secBtn mx-10 cateBtn ${
              category.name === targetCategoryName ? "activeAccent" : ""
            }`}
            onClick={() =>
              handleCategoriesBtn(targetSectionName, category.name)
            }
          >
            {category.name}
          </button>
        ))}
      </div>
      {/* render the products of category */}

      {limitedProducts && (
        <Carousel responsive={responsive} className="productsSlider__cards">
          {limitedProducts?.map((item) => (
            <SingleProduct key={item.id} item={item} />
          ))}
        </Carousel>
      )}
    </Container>
  );
};

export default ProductsSlider;
