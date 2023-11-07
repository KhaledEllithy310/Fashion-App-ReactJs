import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logo.css";
const Logo = () => {
  //redirect to any page
  const navigate = useNavigate();

  return (
    <div className="logoContainer">
      <Typography
        className="preLogo"
        variant="h4"
        onClick={() => navigate("/")}
        noWrap
        component="a"
      >
        f
      </Typography>
      <Typography
        variant="h4"
        className="logo"
        noWrap
        onClick={() => navigate("/")}
        component="a"
        sx={{
          mr: 2,
          display: { md: "flex" },
          flexGrow: 1,
        }}
      >
        Fashion
      </Typography>
    </div>
  );
};

export default Logo;
