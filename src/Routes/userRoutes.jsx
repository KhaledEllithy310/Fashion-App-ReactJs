import IsNotLoggedIn from "../components/IsNotLoggedIn";
import IsLoggedIn from "../components/isLoggedIn";
import AboutUs from "../pages/AboutUs/AboutUs";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/CheckOut/CheckOut";
import ContactUs from "../pages/ContactUs/ContactUs";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Products from "../pages/Products/Products";
import Register from "../pages/Register/Register";
import WishList from "../pages/WishList/WishList";
import MainLayout from "./../Layouts/MainLayout";

const userRoutes = {
  path: "/",
  element: <MainLayout />,

  children: [
    {
      path: "",
      element: <Home />,
    },
    {
      path: "aboutUs",
      element: <AboutUs />,
    },
    {
      path: "contactus",
      element: <ContactUs />,
    },
    {
      path: "products/:sectionName",
      element: <Products />,
    },

    {
      path: "/product-details/:id",
      element: <ProductDetails />,
    },
    {
      path: "cart",
      element: (
        <IsNotLoggedIn>
          <Cart />
        </IsNotLoggedIn>
      ),
    },
    {
      path: "wishList",
      element: (
        <IsNotLoggedIn>
          <WishList />
        </IsNotLoggedIn>
      ),
    },
    {
      path: "checkout",
      element: (
        <IsNotLoggedIn>
          <Checkout />
        </IsNotLoggedIn>
      ),
    },
    {
      path: "login",
      element: (
        <IsLoggedIn>
          <Login />
        </IsLoggedIn>
      ),
    },
    {
      path: "register",
      element: (
        <IsLoggedIn>
          <Register />
        </IsLoggedIn>
      ),
    },

    {
      path: "*",
      element: <NotFound />,
    },
  ],
};

export default userRoutes;
