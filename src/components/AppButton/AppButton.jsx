import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import React from "react";
import "./AppButton.css";
const AppButton = ({ title }) => {
  const theme = useTheme();

  return (
    <Button
      variant="contained"
      className="mainBtn"
      sx={{
        background: theme.palette.button.main,
        color: theme.palette.getContrastText(theme.palette.button.main),
        "&:hover": {
          background: theme.palette.button.sec,
          color: theme.palette.getContrastText(theme.palette.button.sec),
        },
      }}
    >
      {title}
    </Button>
  );
};

export default AppButton;
