import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { animated, useTransition } from "react-spring";
import "./AppSlider.css";
import AppButton from "../AppButton/AppButton";

const Item = ({ item, isVisible }) => {
  const textTransitions = useTransition(isVisible, {
    from: {
      opacity: 0,
      transform: "translateX(-200px) ",
    },
    enter: {
      opacity: 1,
      transform: "translateX(0) ",
    },
    config: { duration: 1500 },
  });

  const imageTransitions = useTransition(isVisible, {
    from: {
      opacity: 0,
      transform: " translateY(-100px)",
    },
    enter: {
      opacity: 1,
      transform: " translateY(0)",
    },
    config: { duration: 1500 },
  });

  return (
    <Container>
      <Grid container className="slide__item" spacing={3}>
        <Grid item xs={12} md={6} className="slide__item__content__container">
          {textTransitions((styles, status) => (
            <animated.div
              style={styles}
              className={`slide__item__content ${
                status ? "visible" : "hidden"
              }`}
            >
              <h2 className="slide__item__content__title">{item.name}</h2>
              <p className="slide__item__content__description">
                {item.description}
              </p>
              <div className="slide__item__content__btn">
                <AppButton title="shop now" path={item.path} />
              </div>
            </animated.div>
          ))}
        </Grid>
        <Grid item xs={6} md={6} className="slide__item__img__container">
          {imageTransitions((styles, status) => (
            <animated.div
              style={styles}
              className={`slide__item__img ${status ? "visible" : "hidden"}`}
            >
              <img src={item.img} alt="img" />
              <div
                src="../../assets/Images/Slider/dots.png"
                alt="img"
                className="img__add"
              ></div>
            </animated.div>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Item;
