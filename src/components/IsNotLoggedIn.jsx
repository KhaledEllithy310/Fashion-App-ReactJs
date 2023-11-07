import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router";
import { PropTypes } from "prop-types";
import { getAuthFromLocalStorage } from "../helpers/LocalStorageFunctions";

export default function IsNotLoggedIn({ children }) {
  const isAuth = getAuthFromLocalStorage();
  const navigate = useNavigate();

  //prevent the user Not logged from accessing the cart AND wishlist pages
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return !isAuth ? <navigate to="/" /> : <Fragment>{children}</Fragment>;
}

IsNotLoggedIn.propTypes = {
  children: PropTypes.any,
};
