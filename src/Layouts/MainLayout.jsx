import React from "react";
import AppNavbar from "../components/AppNavbar/AppNavbar";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { amber, brown, deepOrange, grey } from "@mui/material/colors";

const Layout = () => {
  const mode = useSelector((state) => state.mode);
  console.log(mode);
  const darkTheme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            button: {
              main: grey[900],
              sec: grey[700],
            },
            background: {
              default: "#fff",
              sec: "black",
            },
            text: {
              primary: grey[900],
              secondary: grey[800],
              logoSec: "#fff",
            },
          }
        : {
            button: {
              main: grey[900],
              sec: grey[700],
            },
            background: {
              sec: "#fff",
            },
            text: {
              primary: "#fff",
              secondary: grey[500],
              logoSec: grey[900],
            },
          }),
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppNavbar />
        <Outlet />
      </ThemeProvider>
    </>
  );
};

export default Layout;
