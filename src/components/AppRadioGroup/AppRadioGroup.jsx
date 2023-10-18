import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import "./AppRadioGroup.css";

const AppRadioGroup = ({ name, value, onChange, onBlur, error }) => {
  return (
    <FormControl component="fieldset" >
      <FormLabel component="legend" className="label">Gender:</FormLabel>
      <RadioGroup
        row
        aria-label="gender"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
      </RadioGroup>
    </FormControl>
  );
};

export default AppRadioGroup;
