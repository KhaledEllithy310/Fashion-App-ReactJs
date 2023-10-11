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
      path: "1",
      element: (
        //   <IsLoggedIn>
        <h1>Dashboard 1</h1>
        //   </IsLoggedIn>
      ),
    },
  ],
};

export default adminRoutes;
