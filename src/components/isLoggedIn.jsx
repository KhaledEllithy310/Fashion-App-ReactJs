import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router";
import { PropTypes } from "prop-types";
import { getAuthFromLocalStorage } from "./../helpers/LocalStorageFunctions";

export default function IsLoggedIn({ children }) {
  const isAuth = getAuthFromLocalStorage();
  const navigate = useNavigate();

  //prevent the user logged from accessing the login page
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return isAuth ? <navigate to="/login" /> : <Fragment>{children}</Fragment>;
}

IsLoggedIn.propTypes = {
  children: PropTypes.any,
};
