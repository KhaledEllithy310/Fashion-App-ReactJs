import React from "react";
import "./Spinner.css";
import { GridLoader, ScaleLoader } from "react-spinners";
const Spinner = () => {
  return (
    <div className="loader">
      <GridLoader />
    </div>
  );
};

export default Spinner;
