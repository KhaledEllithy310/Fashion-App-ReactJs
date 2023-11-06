import { Container, Grid } from "@mui/material";
import React from "react";
import "./AboutUs.css";
import img1 from "../../assets/Images/ourVision.jpg";
import img2 from "../../assets/Images/whyWe.png";
import ourTeam1 from "../../assets/Images/our team/ourteam1.jpg";
import ourTeam2 from "../../assets/Images/our team/ourteam2.jpg";
import ourTeam3 from "../../assets/Images/our team/ourteam3.jpg";
import Footer from "../../components/Footer/Footer";
import { Check, Facebook, Instagram, Twitter } from "@mui/icons-material";

const ourTeam = [
  {
    img: ourTeam1,
    name: "Sosan",
    job: "Assistant",
  },
  {
    img: ourTeam2,
    name: "Maria",
    job: "Manger",
  },
  {
    img: ourTeam3,
    name: "Anita",
    job: "Customer support",
  },
];
const AboutUs = () => {
  return (
    <div className="aboutUs">
      <h2 className="aboutUs__title">About Us</h2>
      {/* WhoWeAre */}

      <div className="aboutUs__content__WhoWeAre p-50 backgroundSec">
        <Container className="aboutUs__content">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <div className="aboutUs__content__WhoWeAre__image">
                <img src={img1} alt="imageAboutUs" />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div>
                <h3 className="aboutUs__content__WhoWeAre__title aboutUs__main__title">
                  Who We Are
                </h3>
                <p className="aboutUs__content__WhoWeAre__description">
                  At Fashion, we believe that fashion is more than just
                  clothing; it's a statement. Our vision is to empower
                  individuals to express themselves through their unique style,
                  offering a curated collection that blends timeless elegance
                  with contemporary flair. We believe that everyone has a unique
                  story to tell, and that fashion is a powerful way to express
                  that story. That's why we offer a wide range of clothes that
                  are both stylish and affordable. We want our customers to be
                  able to find clothes that make them feel confident and
                  beautiful, no matter what their personal style is.
                </p>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>

      <div className="aboutUs__content__WhyWe p-50 ">
        <Container className="aboutUs__content__WhyWe">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <div>
                <h3 className="aboutUs__content__WhyWe__title aboutUs__main__title">
                  why choose us
                </h3>
                <ul className="aboutUs__content__WhyWe__description">
                  <li>
                    <Check />
                    <span>
                      Unique selection of clothes that you can't find anywhere
                      else
                    </span>
                  </li>
                  <li>
                    <Check />
                    <span>Focus on quality and sustainability</span>
                  </li>
                  <li>
                    <Check />
                    <span>Personalized shopping experience</span>
                  </li>
                  <li>
                    <Check />
                    <span>Commitment to customer service</span>
                  </li>
                </ul>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="aboutUs__content__WhyWe__image">
                <img src={img2} alt="imageAboutUs" />
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>

      <div className="p-50 backgroundSec">
        <h3 className="aboutUs__main__title textCenter pb-20">our team</h3>
        <Container>
          <div className="aboutUs__content__team">
            <Grid container spacing={4}>
              {ourTeam.map((member) => {
                return (
                  <Grid item xs={12} md={4}>
                    <div className="aboutUs__content__team__card">
                      <div className="aboutUs__content__team__card__image">
                        <img src={member.img} alt="" />
                      </div>
                      <div className="aboutUs__content__team__card__name">
                        <h5>{member.name}</h5>
                      </div>
                      <div className="aboutUs__content__team__card__role">
                        <p>{member.job}</p>
                      </div>
                      <div className="aboutUs__content__team__card__social">
                        <a
                          className="footer__social-icon"
                          href="https://www.facebook.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Facebook />
                        </a>
                        <a
                          className="footer__social-icon"
                          href="https://www.instagram.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Instagram />
                        </a>
                        <a
                          className="footer__social-icon"
                          href="https://twitter.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Twitter />
                        </a>
                      </div>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </Container>
      </div>

      {/* aboutUs__content__second */}
      {/* <Grid container spacing={4} className="aboutUs__content__second">
        <Grid item xs={12} md={6}>
          <div>
            <h4>about</h4>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div>
            <img src={img2} alt="imageAboutUs" />
          </div>
        </Grid>
      </Grid> */}

      <Footer />
    </div>
  );
};

export default AboutUs;
