// import MainLayout from "../Layouts/mainLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
// import Home from "../pages/Home/Home";

const adminRoutes = {
  path: "dashboard",
  element: <Dashboard />,
  children: [
    {
      path: "",
      element: (
        //   <IsLoggedIn>
        <h1>Dashboard</h1>
        //   </IsLoggedIn>
      ),
    },
    {
      path: "products",
      element: (
        //   <IsLoggedIn>
        <h1>All Products</h1>
        //   </IsLoggedIn>
      ),
    },
    {
      path: "addProduct",
      element: (
        //   <IsLoggedIn>
        <h1>addProduct</h1>
        //   </IsLoggedIn>
      ),
    },
  ],
};

export default adminRoutes;
