import { Container, Grid } from "@mui/material";
import React from "react";
import { Banners } from "../../helpers/data-banners";
import BannerItem from "./BannerItem";

const BannersSections = () => {
  return (
    <Container className="bannersSections__container">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} className="grid1">
          <BannerItem
            products={Banners[0].products}
            sectionName={Banners[0].sectionName}
            description={Banners[0].description}
            categories={Banners[0].categories}
            img={Banners[0].img}
            className="banner-section"
            height={Banners[0].height_img}
            path={Banners[0].path}
          />
        </Grid>

        <Grid item xs={12} md={6} className="grid2">
          {Banners.slice(1).map((banner, index) => (
            <BannerItem
              key={index + 1}
              products={banner.products}
              sectionName={banner.sectionName}
              description={banner.description}
              categories={banner.categories}
              img={banner.img}
              height={Banners[0].height_img}
              path={Banners[index].path}
            />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default BannersSections;
