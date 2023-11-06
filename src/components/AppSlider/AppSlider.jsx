import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { items } from "../../helpers/data-slider";
import Item from "./Item";
import { animated, useTransition } from "react-spring";

// console.log(items);
const AppSlider = () => {
  // const [isVisible, setIsVisible] = useState(false);
  // const fadeUpTransitions = useTransition(isVisible, {
  //   from: {
  //     opacity: 0,
  //     transform: "translateX(200px) translateY(100px)",
  //   },
  //   enter: {
  //     opacity: 1,
  //     transform: "translateX(0) translateY(0)",
  //   },
  //   config: { duration: 1500 },
  // });

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, [isVisible]);

  const handleSliderChange = () => {
    setIsVisible(false); // Reset visibility before slide change
  };

  // console.log("isVisible", isVisible);
  return (
    <Carousel
      indicators={false}
      navButtonsAlwaysVisible={true}
      className="slider"
      onChange={handleSliderChange}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} isVisible={isVisible} />
      ))}
    </Carousel>
  );
};

export default AppSlider;
