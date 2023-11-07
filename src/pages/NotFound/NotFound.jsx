import React from "react";
import "./NotFound.css";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const Navigate = useNavigate();
  return (
    <div className="notFound">
      <h1 className="notFound__title">oops!</h1>
      <h3 className="notFound__titleSec">404-page not found</h3>
      <p className="notFound__description">
        The page you are looking for might have been removed had its name
        changed or is temporarily unavailable
      </p>
      <button className="mainBtn notFound__btn" onClick={() => Navigate("/")}>
        go to homepage
      </button>
    </div>
  );
};

export default NotFound;
