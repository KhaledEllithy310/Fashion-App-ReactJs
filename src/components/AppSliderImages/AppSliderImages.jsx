import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./AppSliderImages.css";
const AppSliderImages = ({ images, selectedImage }) => {
  const [currentImage, setCurrentImage] = useState(null);

  //   Clear the selected image after 5 seconds
  useEffect(() => {
    if (selectedImage) {
      setCurrentImage(selectedImage);
      // const timeout = setTimeout(() => {
      //   setCurrentImage(null);
      // }, 3000);

      // // Clean up the timeout when the component unmounts or the selectedImage changes
      // return () => clearTimeout(timeout);
    }
    const imageTarget = document.querySelector(".imageTarget");
    // console.log(imageTarget);
    // imageTarget?.addEventListener("mouseover", (e) => {
    //   // console.log(e);
    //   let offsetX, offsetY, x, y;
    //   const zoomer = e.currentTarget;
    //   e.offsetX ? (offsetX = e.offsetX) : (offsetX = e.touches[0].pageX);
    //   e.offsetY ? (offsetY = e.offsetY) : (offsetX = e.touches[0].pageX);
    //   x = (offsetX / zoomer.offsetWidth) * 100;
    //   y = (offsetY / zoomer.offsetHeight) * 100;
    //   zoomer.style.backgroundPosition = `${x}% ${y}%`;
    // });
  }, [selectedImage]);
  const handleCarouselChange = (index) => {
    setCurrentImage(null);
  };

  // const handleImageHover = (e) => {
  //   let offsetX, offsetY, x, y;
  //   const zoomer = e.currentTarget;
  //   console.log("zoomer", zoomer);
  //   e.offsetX ? (offsetX = e.offsetX) : (offsetX = e.touches[0].pageX);
  //   e.offsetY ? (offsetY = e.offsetY) : (offsetX = e.touches[0].pageX);
  //   x = (offsetX / zoomer.offsetWidth) * 100;
  //   y = (offsetY / zoomer.offsetHeight) * 100;
  //   zoomer.style.backgroundPosition = `${x}% ${y}%`;
  // };

  const handleImageHover = (e) => {
    const img = e.currentTarget;
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;
    img.style.transformOrigin = `${x}px ${y}px`;
    img.style.transform = "scale(2)";
  };

  const handleImageLeave = (e) => {
    const img = e.currentTarget;
    img.style.transformOrigin = `center`;
    img.style.transform = "scale(1)";
  };
  return (
    <Carousel
      indicators={false}
      navButtonsAlwaysVisible={true}
      interval={5000}
      onChange={handleCarouselChange}
      className="Carousel"
    >
      {currentImage ? (
        <img
          src={currentImage}
          alt="imageProduct"
          className="imageTarget"
          id="imageProduct"
          onMouseMove={handleImageHover}
          onMouseLeave={handleImageLeave}
        />
      ) : (
        images?.map((image) => (
          <img
            key={image}
            src={image}
            alt="imageProduct"
            className="imageTarget"
            onMouseMove={handleImageHover}
            onMouseLeave={handleImageLeave}
          />
        ))
      )}
    </Carousel>
  );
};

export default AppSliderImages;
