import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import "./AppInput.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const AppInput = ({ label, type, name, value, onChange, onBlur }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {type === "password" ? (
        <FormControl className="passwordInput " variant="filled">
          <InputLabel htmlFor={`filled-adornment-${name}`}>{label}</InputLabel>
          <FilledInput
            id={`filled-adornment-${name}`}
            type={showPassword ? "text" : "password"}
            value={value}
            name={name}
            // className="input"
            onChange={onChange}
            onBlur={onBlur}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  className="iconPassword"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      ) : (
        <TextField
          id={name}
          label={label}
          type={type}
          variant="filled"
          className="input"
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          // error={error}
        />
      )}
    </>
  );
};

export default AppInput;
