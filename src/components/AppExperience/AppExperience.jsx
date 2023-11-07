import React from "react";
import "./AppExperience.css";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { experienceData } from "./../../helpers/data-experience";
import styled from "@emotion/styled";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "react-spring";

const AppExperience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    // threshold: .2,
  });
  console.log("inView", inView);
  const cardTransitions = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(100px)",
  });

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
              ref={ref}
            >
              <Paper className="experience__cards__item__content">
                <animated.div style={cardTransitions}>
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
                </animated.div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default AppExperience;
