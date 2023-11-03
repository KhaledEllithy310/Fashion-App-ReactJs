import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import React from "react";
import "./AppButton.css";
const AppButton = ({ title }) => {
  const theme = useTheme();

  return <button className="mainBtn">{title}</button>;
};

export default AppButton;
