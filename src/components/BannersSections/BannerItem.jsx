import React from "react";
import "./BannersSections.css";
import { useNavigate } from "react-router-dom";
const BannerItem = ({
  products,
  sectionName,
  description,
  categories,
  img,
  className,
  height,
  path,
}) => {
  const Navigate = useNavigate();
  return (
    <div className={`banner__content ${className}`}>
      <div className="banner__content__img__container">
        <img src={img} alt="img banner" height={height} />
      </div>
      <p className="banner__content__productsNum">{products}+ products</p>
      <h3
        className="banner__content__sectionName"
        onClick={() => Navigate(`/products/${sectionName}`)}
      >
        {sectionName}
      </h3>
      <p className="banner__content__description">{description}</p>
      <ul className="banner__content__categories">
        {categories.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default BannerItem;
