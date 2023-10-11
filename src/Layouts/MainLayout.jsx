import React from "react";
import AppNavbar from "../components/AppNavbar/AppNavbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  );
};

export default Layout;
