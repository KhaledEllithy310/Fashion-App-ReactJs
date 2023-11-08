import React from "react";
import "./AppExperience.css";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { experienceData } from "./../../helpers/data-experience";

const AppExperience = () => {
  return (
    <div className="experience">
      <Container>
        <h2 className="experience__title ">
          we provide best customer experience
        </h2>
        <Grid container className="experience__cards">
          {experienceData.map((data) => (
            <Grid
              key={data.title}
              item
              xs={12}
              sm={6}
              md={3}
              className="experience__cards__item"
            >
              <Paper className="experience__cards__item__content">
                <div>
                  <Typography
                    className="experience__cards__item__content__icon"
                    sx={{ fontSize: "50px" }}
                  >
                    {data.icon}
                  </Typography>
                  <h5 className="experience__cards__item__content__title">
                    {data.title}
                  </h5>
                  <Typography className="experience__cards__item__content__description">
                    {data.description}
                  </Typography>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default AppExperience;
