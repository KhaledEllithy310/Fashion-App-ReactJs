import {  Paper } from "@mui/material";
import React from "react";
import "./AppSlider.css";
import AppButton from "../AppButton/AppButton";
const Item = ({ item }) => {
  const slideStyle = {
    backgroundImage: `url(${item.img})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "100%",
    height: "80vh",
  };
  // const theme = useTheme();
  return (
    <Paper className="slide__item" style={slideStyle}>
      <div className="slide__item__content">
        <h2 className="slide__item__content__title">{item.name}</h2>
        <p className="slide__item__content__description">{item.description}</p>
        <p className="slide__item__content__word">fashion</p>
{/* 
        <Button
          variant="contained"
          className="CheckButton"
          sx={{
            background: theme.palette.button.main,
            color: theme.palette.getContrastText(theme.palette.button.main),
            "&:hover": { background: theme.palette.button.sec },
          }}
        >
          shop now
        </Button> */}
        <AppButton title="shop now" />
      </div>
    </Paper>
  );
};

export default Item;
