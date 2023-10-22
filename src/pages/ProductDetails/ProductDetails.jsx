import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchProducts } from "./../../hooks/useFetchProducts";
import { Container, Grid } from "@mui/material";
import "./ProductDetails.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const [product, setProduct] = useFetchProducts(id || productId);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  // const userId = JSON.parse(localStorage.getItem("userData")).id;
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (userId) dispatch(getCartByUserID(userId));
  // }, [dispatch, userId, product]);
  const addProToCart = async (product) => {
    const newProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      discountPercentage: product.discountPercentage,
      description: product.description,
      color: selectedColor,
      size: selectedSize,
      images: product.images[selectedColor],
    };
    if (selectedColor && selectedSize) {
      // const cartData = {
      //   userId: JSON.parse(localStorage.getItem("userData")).id,
      //   products: [],
      // };
      // cartData.products.push(newProduct);
      // console.log(cartData);
      // const res = await addProductToCart(cartData);
      // console.log(res);

      dispatch(addToCart(newProduct));
    } else console.log(" no add product");
  };
  // set color for show his images in ui
  useEffect(() => {
    if (product?.colors) {
      // set color for show his images in ui
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  //set the color in the first with active class
  useEffect(() => {
    if (product?.colors) {
      const colorElements = document.querySelectorAll(".product__colors li");
      colorElements.forEach((colorElement) => {
        if (colorElement.id === selectedColor)
          colorElement.classList.add("active");
      });
    }
  }, [product, selectedColor]);

  //select the color product
  const selectColor = (e, color) => {
    setSelectedColor(color);
    const colorElements = document.querySelectorAll(".product__colors li");
    //remove old active
    colorElements.forEach((colorElement) => {
      colorElement.classList.remove("active");
    });
    e.target.classList.add("active");
  };

  //select the Size element
  const selectSize = (e, size) => {
    setSelectedSize(size);
    const sizeElements = document.querySelectorAll(".product__sizes li");
    //remove old active
    sizeElements.forEach((sizeElement) => {
      sizeElement.classList.remove("active");
    });

    e.target.classList.add("active");
  };

  //select the image element
  const handleSelectImage = (e, image) => {
    setSelectedImage(image);
    const imageElements = document.querySelectorAll(
      ".productDetails__slider__images img"
    );
    console.log(imageElements);
    //remove old active
    imageElements.forEach((imageElement) => {
      imageElement.classList.remove("active");
    });

    e.target.classList.add("active");
  };
  // useEffect(() => {
  //   console.log("selectedColor", selectedColor);
  //   console.log("selectedImage", selectedImage);
  //   console.log("selectedSize", selectedSize);
  // }, [selectedColor, product, selectedImage, selectedSize]);

  useEffect(() => {
    if (selectedColor && product?.images?.[selectedColor]) {
      setSelectedImage(product.images[selectedColor][0]);
    }
  }, [selectedColor, product]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const selectedSizes = product?.sizes?.[selectedColor] || [];
  const selectedImages = product?.images?.[selectedColor] || [];

  return (
    <Container>
      <Grid container>
        {product && (
          <>
            <Grid container className="productDetails">
              {/* <Grid item sm={3} className="productDetails__sliderImages">
                {selectedImages?.map((image) => (
                  <img
                    key={image}
                    src={image}
                    alt="imgProduct"
                    onClick={() => {
                      handleImageClick(image);
                    }}
                  />
                ))}
              </Grid>
              <Grid item sm={9}>
                <AppSliderImages
                  images={selectedImages}
                  selectedImage={selectedImage}
                />
              </Grid> */}

              <Grid item sm={6} className="productDetails__slider">
                <div className="productDetails__slider__images">
                  {selectedImages?.map((image) => (
                    <img
                      key={image}
                      src={image}
                      alt="imgProduct"
                      onClick={(e) => {
                        handleSelectImage(e, image);
                      }}
                    />
                  ))}
                </div>
                <div className="productDetails__slider__targetImage">
                  <img id="targetImage" src={selectedImage} alt="" />
                </div>
              </Grid>
              <Grid item sm={6} className="productDetails__content">
                <h5 className="productDetails__content__title">
                  {product.title}
                </h5>
                <p className="productDetails__content__description">
                  {product.description}
                </p>
                <div className="productDetails__content__price">
                  {product?.discountPercentage ? (
                    <>
                      <p className="productDetails__content__price__before">
                        <del>${product?.price}</del>
                      </p>
                      <p className="productDetails__content__price__after">
                        $
                        {(
                          (product?.price *
                            (100 - +product?.discountPercentage)) /
                          100
                        ).toFixed(2)}
                      </p>
                    </>
                  ) : (
                    <p>${product?.price}</p>
                  )}
                </div>

                <div className="product__colors">
                  {product?.colors &&
                    product?.colors.map((color) => (
                      <li
                        key={color}
                        id={color}
                        style={{ backgroundColor: color }}
                        onClick={(e) => selectColor(e, color)}
                      ></li>
                    ))}{" "}
                </div>
                <div className="product__sizes">
                  {selectedSizes.map((size) => (
                    <li key={size} onClick={(e) => selectSize(e, size)}>
                      {size}
                    </li>
                  ))}
                </div>

                <div className="productDetails__btns">
                  <button
                    className="productDetails__mainBtn"
                    onClick={() => {
                      addProToCart(product);
                    }}
                  >
                    add to cart
                  </button>
                  <button className="productDetails__wishBtn">
                    <FavoriteIcon className="wish" />
                  </button>
                </div>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default ProductDetails;
