import React from "react";
import "./AppButton.css";
import { useNavigate } from "react-router-dom";
const AppButton = ({ title, path }) => {
  const Navigate = useNavigate();
  return (
    <button className="mainBtn" onClick={() => Navigate(path)}>
      {title}
    </button>
  );
};

export default AppButton;
