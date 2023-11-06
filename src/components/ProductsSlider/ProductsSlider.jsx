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
  const [categoryList, setCategoryList] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [categories] = useFetchCategories(targetSectionId);
  const [sections] = useFetchSections();

  const defaultSectionData = sections[0];

  // const [categoryData, sectionIdOfCategory] = categoriesData?.[0] || [];
  const defaultCategoryData = categories[0]?.categories;
  const sectionIdOfCategory = categories[0]?.sectionId;
  console.log("sections", sections);
  console.log("defaultSectionData", defaultSectionData);
  console.log("defaultCategoryData", defaultCategoryData);
  useEffect(() => {
    if (defaultSectionData && defaultCategoryData) {
      setAllCategories(categories);
      setCategoryList(defaultCategoryData);
      setTargetSectionId(sectionIdOfCategory);
      setTargetCategoryName(defaultCategoryData[0]?.name);
      setTargetSectionName(defaultSectionData?.name);

      handleSectionButtonClick(defaultSectionData, categories);
    }
    console.log("only default section");
  }, [defaultSectionData]);

  const handleSectionButtonClick = (section, categories) => {
    console.log(section);
    console.log(categories);
    setTargetSectionId(section.id);
    setTargetSectionName(section.name);

    const targetCategories = allCategories?.find(
      (category) => category.sectionId === section.id
    );
    setTargetCategoryName(targetCategories?.categories?.[0]?.name);

    console.log("targetCategories", targetCategories);
    // const categoryName = targetCategories?.categories?.[0]?.name;
    console.log("targetCategoryName", targetCategoryName);
    handleCategoryButtonClick(section.name, targetCategoryName);
  };
  // console.log("categoryList", categoryList);
  const handleCategoryButtonClick = async (sectionName, categoryName) => {
    console.log("categoryName222222222222", categoryName);
    setTargetCategoryName(categoryName);
    const products = await getProductByCategoryName(sectionName, categoryName);
    setProducts(products.data);
  };

  const limitedProducts = products.slice(0, 6);

  return (
    <div className="productsSlider">
      <Container>
        <h2 className="productsSlider__title">Our top-selling products</h2>
        <div className="container__sections__btn">
          {sections?.map((section) => (
            <button
              key={section.id}
              className={`secBtn mx-10 ${
                section.id === targetSectionId ? "active" : ""
              }`}
              onClick={() => handleSectionButtonClick(section, allCategories)}
            >
              {section.name}
            </button>
          ))}
        </div>
        <div className="container__sections__btn">
          {categoryList?.map((category) => (
            <button
              key={category.id}
              className={`secBtn mx-10 cateBtn ${
                category.name === targetCategoryName ? "activeAccent" : ""
              }`}
              onClick={() =>
                handleCategoryButtonClick(targetSectionName, category.name)
              }
            >
              {category.name}
            </button>
          ))}
        </div>
        {limitedProducts.length > 0 && (
          <Carousel responsive={responsive} className="productsSlider__cards">
            {limitedProducts.map((item) => (
              <SingleProduct key={item.id} item={item} />
            ))}
          </Carousel>
        )}
      </Container>
    </div>
  );
};

export default ProductsSlider;
