import React, { useEffect } from "react";
import "./Register.css";
import { Container, Grid } from "@mui/material";
import AppInput from "../../components/AppInput/AppInput";
import AppRadioGroup from "../../components/AppRadioGroup/AppRadioGroup";
import { useFormik } from "formik";
import { validationSchemaRegister } from "../../helpers/validationForms";
import { addUser, getAllUsers } from "../../Services/UsersApi";
import { useDispatch, useSelector } from "react-redux";
import { addNewUser, getUsers } from "../../store/slices/userSlice";
const Register = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  //add user function
  const registerUser = async (userData) => {
    const allUsers = await getAllUsers();
    const isEmailExisted = allUsers.data.findIndex(
      (user) => user.email === userData.email
    );
    console.log(isEmailExisted);
    //if email is not found so add user
    if (isEmailExisted === -1) {
      const res = await addUser(userData);
      console.log(res);
      dispatch(addNewUser(userData));
      //reset form after successful registration
      formik.resetForm();
    } else console.log("this email is already registered");
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "",
      password: "",
      email: "",
    },
    validationSchema: validationSchemaRegister,
    onSubmit: (userData) => {
      try {
        // send request to add user
        registerUser(userData);
      } catch (e) {
        console.log(e);
      }
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
        <h3 className="form__title">Sign Up</h3>
        <Grid container spacing={2} justifyContent="center">
          <Grid item sm={6}>
            <AppInput
              label="First Name"
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {renderError("firstName")}
          </Grid>
          <Grid item sm={6}>
            <AppInput
              label="Last Name"
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {renderError("lastName")}
          </Grid>
          <Grid item sm={6}>
            <AppRadioGroup
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {renderError("gender")}
          </Grid>
          <Grid item sm={6}>
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
          <button className="mainBtn" type="submit">
            Sign Up
          </button>
        </Grid>
      </form>
    </Container>
  );
};

export default Register;
