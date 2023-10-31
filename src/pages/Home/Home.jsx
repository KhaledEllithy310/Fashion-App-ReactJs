import React from "react";
import AppSlider from "../../components/AppSlider/AppSlider";
import AppExperience from "../../components/AppExperience/AppExperience";
import ProductsSlider from "../../components/ProductsSlider/ProductsSlider";
import BannersSections from "../../components/BannersSections/BannersSections";

const Home = () => {
  return (
    <div>
      <AppSlider />
      <AppExperience />
      <BannersSections />
      <ProductsSlider />
    </div>
  );
};

export default Home;
