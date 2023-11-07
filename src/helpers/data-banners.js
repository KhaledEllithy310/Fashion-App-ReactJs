import Women from "../assets/Images/banner/Women.png";
import men from "../assets/Images/banner/men.png";
import Accessories from "../assets/Images/banner/Accessories.png";

export const Banners = [
  {
    products: 100,
    sectionName: "women",
    description: "lorem Ips",
    categories: ["blazer", "T-Shirt and Blouses", "Dresses", "Jeans"],
    img: Women,
    height_img: "400",
    className: "h-100",
    path: "/products/women",
  },
  {
    products: 50,
    sectionName: "men",
    description: "lorem Ips",
    categories: ["blazer", "Jeans"],
    img: men,
    height_img: "50",
    path: "/products/men",
  },
  {
    products: 100,
    sectionName: "Accessories",
    description: "lorem Ips",
    categories: ["watches", "handBag", "Hat"],
    img: Accessories,
    height_img: "50",
    path: "/products/women",
  },
];
