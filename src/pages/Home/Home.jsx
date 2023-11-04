import React from "react";
import AppSlider from "../../components/AppSlider/AppSlider";
import AppExperience from "../../components/AppExperience/AppExperience";
import ProductsSlider from "../../components/ProductsSlider/ProductsSlider";
import BannersSections from "../../components/BannersSections/BannersSections";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div>
      <AppSlider />
      <AppExperience />
      <BannersSections />
      <ProductsSlider />
      <Footer />
    </div>
  );
};

export default Home;
