import React from "react";
import "./BannersSections.css";
const BannerItem = ({
  products,
  sectionName,
  description,
  categories,
  img,
  className,
  height,
}) => {
  return (
    <div className={`banner__content ${className}`}>
      <img src={img} alt="img banner" height={height} />
      <p className="banner__content__productsNum">{products}+ products</p>
      <h3 className="banner__content__sectionName">{sectionName}</h3>
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
