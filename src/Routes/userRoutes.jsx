// import {MainLayout} from "../Layouts";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home/Home";
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
  ],
};

export default userRoutes;
