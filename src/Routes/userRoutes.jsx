// import {MainLayout} from "../Layouts";
import MainLayout from "../Layouts/MainLayout";
import AboutUs from "../pages/AboutUs/AboutUs";
import Cart from "../pages/Cart/Cart";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Products from "../pages/Products/Products";
import Register from "../pages/Register/Register";
import WishList from "../pages/WishList/WishList";
// import MainLayout from './../Layouts/MainLayout';

const userRoutes = {
  path: "/",
  element: <MainLayout />,

  children: [
    {
      path: "",
      element: (
        //   <IsLoggedIn>
        <Home />
        //   </IsLoggedIn>
      ),
    },
    {
      path: "products",
      element: (
        //   <IsLoggedIn>
        <Products />
        //   </IsLoggedIn>
      ),
    },
    {
      path: "aboutUs",
      element: (
        //   <IsLoggedIn>
        <AboutUs />
        //   </IsLoggedIn>
      ),
    },
    {
      path: "/product-details/:id",
      element: (
        //   <IsLoggedIn>
        <ProductDetails />
        //   </IsLoggedIn>
      ),
    },
    {
      path: "cart",
      element: (
        //   <IsLoggedIn>
        <Cart />
        //   </IsLoggedIn>
      ),
    },
    {
      path: "login",
      element: (
        //   <IsLoggedIn>
        <Login />
        //   </IsLoggedIn>
      ),
    },
    {
      path: "register",
      element: (
        //   <IsLoggedIn>
        <Register />
        //   </IsLoggedIn>
      ),
    },
    {
      path: "wishList",
      element: (
        //   <IsLoggedIn>
        <WishList />
        //   </IsLoggedIn>
      ),
    },
  ],
};

export default userRoutes;
