import React, { useEffect, useRef, useState } from "react";
import { useFetchSections } from "../../hooks/useFetchSections";
import { useFetchCategories } from "../../hooks/useFetchCategories";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slider,
  SliderThumb,
  Typography,
} from "@mui/material";
import "./FilterProducts.css";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import styled from "@emotion/styled";
import { getProductsFilter } from "../../Services/ProductsApi";

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: "#3a8589",
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 3,
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 3,
  },
}));

function AirbnbThumbComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

const FilterProducts = ({ sectionName, page, filterProducts }) => {
  const [sections] = useFetchSections();
  const [products, setProducts] = useFetchProducts(null, sectionName);
  const [newproducts, setNewProducts] = useState([]);
  const [targetSection, setTargetSection] = useState();
  const [categorySearch, setCategorySearch] = useState("");
  const [colorSearch, setColorSearch] = useState("");
  const [sizeSearch, setSizeSearch] = useState("");
  const [priceSearch, setPriceSearch] = useState("");

  useEffect(() => {
    sections.forEach((section) => {
      if (section.name === sectionName) setTargetSection(section);
    });
  }, []);

  const [categories] = useFetchCategories(targetSection?.id);
  const categoryData = categories[0]?.categories;
  let searchDataRef = useRef([]);

  const handlePriceChange = (e) => {
    const priceRange = e.target.value;
    console.log(priceRange);
    // Add color to searchData if it's checked
    if (searchDataRef.current.length > 0) {
      searchDataRef.current.forEach((element, index) => {
        // console.log(element);
        console.log(element.includes("price_lte"));
        if (element.includes("price_lte")) {
          console.log("11");
          searchDataRef.current.splice(index, 1);
        } else {
          searchDataRef.current.push(
            `&price_gte=${priceRange[0]}&price_lte=${priceRange[1]}`
          );
          console.log("22");
        }
        // return element.contain("price_lte");
      });
    } else
      searchDataRef.current.push(
        `&price_gte=${priceRange[0]}&price_lte=${priceRange[1]}`
      );
  };

  const handleColorChange = (e, color) => {
    const isChecked = e.target.checked;
    // Add color to searchData if it's checked
    if (isChecked) searchDataRef.current.push(`&color=${color}`);
    else {
      // Remove color from searchData if it's unchecked
      const index = searchDataRef.current.indexOf(`&color=${color}`);
      if (index > -1) {
        searchDataRef.current.splice(index, 1);
      }
    }
    // Join searchData elements to form colorSearch string
    const colorSearch = searchDataRef.current.join("");
    // Set the colorSearch state
    setColorSearch(colorSearch);
    console.log(searchDataRef.current);
  };
  const handleSizeChange = (e, size) => {
    const isChecked = e.target.checked;
    // Add size to searchData if it's checked
    if (isChecked) searchDataRef.current.push(`&size=${size}`);
    else {
      // Remove size from searchData if it's unchecked
      const index = searchDataRef.current.indexOf(`&size=${size}`);
      if (index > -1) {
        searchDataRef.current.splice(index, 1);
      }
    }
    // Join searchData elements to form sizeSearch string
    const sizeSearch = searchDataRef.current.join("");
    // Set the sizeSearch state
    setSizeSearch(sizeSearch);
    console.log(searchDataRef.current);
  };

  const handleCategoryChange = (e, category) => {
    const isChecked = e.target.checked;
    // Add category to searchData if it's checked
    if (isChecked) searchDataRef.current.push(`&category=${category.name}`);
    else {
      // Remove category from searchData if it's unchecked
      const index = searchDataRef.current.indexOf(`&category=${category.name}`);
      if (index > -1) {
        searchDataRef.current.splice(index, 1);
      }
    }
    // Join searchData elements to form categorySearch string
    const categorySearch = searchDataRef.current.join("");
    // Set the categorySearch state
    setCategorySearch(categorySearch);
    console.log(searchDataRef.current);
  };

  console.log();
  // console.log(categorySearch);
  return (
    <div className="filter_products">
      <div className="filter_products__category filter_products__section">
        <h4 className="filter_products__titles">category</h4>
        <FormGroup>
          {categoryData?.map((category) => {
            return (
              <FormControlLabel
                key={category?.name}
                control={
                  <Checkbox
                    className="filter_products__category__checkbox"
                    onChange={(e) => handleCategoryChange(e, category)}
                  />
                }
                label={category?.name}
              />
            );
          })}
        </FormGroup>
      </div>
      <div className="filter_products__color filter_products__section ">
        <h4 className="filter_products__titles">colors</h4>

        <FormGroup>
          {products[0]?.colors?.map((color) => {
            return (
              <FormControlLabel
                key={color}
                control={
                  <Checkbox
                    className="filter_products__category__checkbox"
                    onChange={(e) => handleColorChange(e, color)}
                  />
                }
                label={color}
              />
            );
          })}
        </FormGroup>
      </div>

      <div className="filter_products__size filter_products__section">
        <h4 className="filter_products__titles">size</h4>
        <FormGroup>
          {products[0]?.sizes["black"]?.map((size) => {
            return (
              <FormControlLabel
                key={size}
                control={
                  <Checkbox
                    className="filter_products__category__checkbox"
                    onChange={(e) => handleSizeChange(e, size)}
                  />
                }
                label={size}
              />
            );
          })}
        </FormGroup>
      </div>
      <div className="filter_products__price filter_products__section filter_products__section--last">
        <h4 className="filter_products__titles">Price</h4>

        <AirbnbSlider
          slots={{ thumb: AirbnbThumbComponent }}
          getAriaLabel={(index) =>
            index === 0 ? "Minimum price" : "Maximum price"
          }
          defaultValue={[0, 10000]}
          valueLabelDisplay="on"
          className="slider_price"
          onChange={(e) => handlePriceChange(e)}
          max={10000}
        />
      </div>
      <div className="filter_products__btn">
        <button
          className="mainBtn"
          onClick={() =>
            // filterProducts(categorySearch, colorSearch, sizeSearch, priceSearch)
            filterProducts(searchDataRef.current)
          }
        >
          filter
        </button>
      </div>
    </div>
  );
};

export default FilterProducts;
