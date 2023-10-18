import * as yup from "yup";
export const validationSchemaRegister = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  gender: yup.string().required("Gender is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must have at least 8 characters, including uppercase letter, lowercase letter, digit, special character."
    ),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email Address is required"),
});

export const validationSchemaLogin = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must have at least 8 characters, including uppercase letter, lowercase letter, digit, special character."
    ),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email Address is required"),
});
