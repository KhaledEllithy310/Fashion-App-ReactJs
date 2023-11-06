import React from "react";
// import { Circle } from "react-loading";
import ReactLoading from "react-loading";
import "./Spinner.css";
const Spinner = () => {
  return (
    <div className="loader">
      <ReactLoading
        type={"balls"}
        color={"#ffffff"}
        height={"100px"}
        width={"100px"}
      />
    </div>
  );
};

export default Spinner;
