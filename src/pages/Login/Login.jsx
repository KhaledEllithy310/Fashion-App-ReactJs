import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import { useFormik } from "formik";
import "./Login.css";
import AppInput from "../../components/AppInput/AppInput";
import { validationSchemaLogin } from "../../helpers/validationForms";
// import { getAllUsers } from "../../Services/UsersApi";
import { useDispatch, useSelector } from "react-redux";
import toastrMin from "toastr/build/toastr.min";
import { getUsers, logIn } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { getCartByUserID } from "../../store/slices/cartSlice";
import { getUserIdFromLocalStorage } from "../../helpers/LocalStorageFunctions";
import { showNotification } from "../../helpers/Notification";
import { getWishListByUserID } from "../../store/slices/wishListSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get all users and store them in store
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const { users } = useSelector((state) => state.users);
  //login user function
  const loginUser = async (userData) => {
    const targetUser = users?.find(
      (user) =>
        user.email === userData.email && user.password === userData.password
    );
    if (targetUser) {
      //show message for user
      showNotification("success", "you are now logged in", 1000);
      //store the user data in local storage and store
      dispatch(logIn(targetUser));
      const userId = getUserIdFromLocalStorage();
      //get the cart by user id
      dispatch(getCartByUserID(userId));
      dispatch(getWishListByUserID(userId));
      setTimeout(() => {
        navigate("/");
      }, 1500);
      // localStorage.setItem("userData", JSON.stringify(targetUser));
    } else toastrMin.error("you have not account");
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: validationSchemaLogin,
    onSubmit: (userData) => {
      loginUser(userData);
      formik.resetForm();
    },
  });

  const renderError = (fieldName) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return (
        <div className="error" title={formik.errors[fieldName]}>
          {formik.errors[fieldName]}
        </div>
      );
    }
    return null;
  };

  return (
    <Container>
    <Grid container display="flex" justifyContent="center">
      <Grid item xs={12} md={8} lg={6}>
        <form className="form" onSubmit={formik.handleSubmit}>
          <h3 className="form__title">Sign In</h3>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            className="form__container"
          >
            <Grid item sm={12}>
              <AppInput
                label="Email Address"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {renderError("email")}
            </Grid>
            <Grid item sm={12}>
              <AppInput
                label="Password"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {renderError("password")}
            </Grid>
            <div className="form__btn">
              <button className="mainBtn" type="submit">
                Sign In
              </button>
            </div>
          </Grid>
        </form>
      </Grid>
    </Grid>
    </Container>
  );
};

export default Login;
