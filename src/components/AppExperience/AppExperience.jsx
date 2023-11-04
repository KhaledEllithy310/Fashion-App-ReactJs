import React from "react";
import "./AppExperience.css";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { experienceData } from "./../../helpers/data-experience";
import styled from "@emotion/styled";

const AppExperience = () => {
  const theme = useTheme();

  const StyledPaper = styled(Paper)(({ theme }) => ({
    ".experience__cards__item__content__icon": {
      transition: "transform 0.5s",
    },
    "&:hover .experience__cards__item__content__icon": {
      backgroundColor: theme.palette.background.default,
      border: "1px solid #a6a6a6",
    },
  }));

  return (
    <div className="experience">
      <Container>
        <h2 className="experience__title">
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
              <StyledPaper className="experience__cards__item__content">
                <Typography
                  className="experience__cards__item__content__icon"
                  sx={{ fontSize: "50px" }}
                >
                  {data.icon}
                </Typography>
                <Typography
                  // sx={{
                  //   fontSize: "20px",
                  //   textTransform: "capitalize",
                  //   fontWeight: "700",
                  //   mb: "10px",
                  // }}
                  className="experience__cards__item__content__title"
                >
                  {data.title}
                </Typography>
                <Typography className="experience__cards__item__content__description">
                  {data.description}
                </Typography>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default AppExperience;
