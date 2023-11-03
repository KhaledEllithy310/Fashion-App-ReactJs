import { Grid } from "@mui/material";
import React from "react";
import "./AppSlider.css";
import AppButton from "../AppButton/AppButton";
const Item = ({ item }) => {
  const slideStyle = {
    // backgroundImage: `url(${item.img})`,
    // backgroundPosition: "center",
    // backgroundSize: "contain",
    // backgroundImageRepeat: "no-repeat",
    // width: "100%",
    // height: "80vh",
  };
  // const theme = useTheme();
  return (
    <Grid container className="slide__item" style={slideStyle} spacing={2}>
      <Grid item xs={12} md={6} className="slide__item__content__container">
        <div className="slide__item__content">
          <h2 className="slide__item__content__title">{item.name}</h2>
          <p className="slide__item__content__description">
            {item.description}
          </p>
          <div className="slide__item__content__btn">
            <AppButton title="shop now" />
          </div>
        </div>
        {/* <p className="slide__item__content__word">fashion</p> */}
      </Grid>
      <Grid item xs={6} md={6} className="slide__item__img__container">
        <div className="slide__item__img">
          <img src={item.img} alt="img" />
          <div
            src="../../assets/Images/Slider/dots.png"
            alt="img"
            className="img__add"
          ></div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Item;
