import React, { useState } from "react";
import { Container, Grid } from "@mui/material";
import { useFormik } from "formik";
import "./Login.css";
import AppInput from "../../components/AppInput/AppInput";
import { validationSchemaLogin } from "../../helpers/validationForms";
import { getAllUsers } from "../../Services/UsersApi";

const Login = () => {
  const [userData, setUserData] = useState({});

  // const getUsers = async () => {
  //   const allUsers = await getAllUsers();
  //   return allUsers;
  // };
  const loginUser = async (userData) => {
    const allUsers = await getAllUsers();
    console.log(allUsers);
    const targetUser = allUsers.data.find(
      (user) =>
        user.email === userData.email && user.password === userData.password
    );

    if (targetUser) {
      console.log("user login");
      localStorage.setItem("userData", JSON.stringify(targetUser));
    } else console.log("you are not logged in");
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: validationSchemaLogin,
    onSubmit: (userData) => {
      console.log(userData);
      setUserData(userData);
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
      <form className="form" onSubmit={formik.handleSubmit}>
        <h3 className="form__title">Sign In</h3>
        <Grid container spacing={2} justifyContent="center">
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
          <button className="mainBtn" type="submit">
            Sign In
          </button>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
