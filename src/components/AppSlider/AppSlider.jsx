import React from "react";
import Carousel from "react-material-ui-carousel";
import { items } from "../../helpers/data-slider";
import Item from "./Item";
import { Container } from "@mui/material";
// console.log(items);
const AppSlider = () => {
  return (
    <Carousel indicators={false} navButtonsAlwaysVisible={true}>
      {items.map((item, i) => (
          <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

export default AppSlider;
