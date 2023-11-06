import React from "react";
import { Container, Grid, TextField, Typography } from "@mui/material";
import {
  Email,
  Facebook,
  Instagram,
  Twitter,
  YouTube,
  KeyboardArrowRight,
} from "@mui/icons-material";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import MainButton from "./MainButton";
// import Logo from "./Logo";
import { Link } from "react-router-dom";
import AppButton from "../AppButton/AppButton";
import Logo from "../Logo/Logo";
import "./Footer.css";
function Footer() {
  return (
    <>

      <footer className="footer">
        <Container className="footer__top">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3} className="footer__about">
              <h4 className="footer__header footer__logo">
                <Logo />
              </h4>
              <Typography className="footer__about-text">
                Our online ecommerce website offers a wide range of products for
                convenient shopping. Secure payment options and user-friendly
                interface ensure a seamless experience.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={2.5} className="footer__pages">
              <h4 className="footer__header">pages</h4>
              <div className="footer__link__container">
                <KeyboardArrowRight />

                <Link className="footer__link text-capitalize" to="/about">
                  about us
                </Link>
              </div>
              <div className="footer__link__container">
                <KeyboardArrowRight />
                <Link className="footer__link text-capitalize" to="/contact">
                  contact us
                </Link>
              </div>
              <div className="footer__link__container">
                <KeyboardArrowRight />
                <Link className="footer__link text-capitalize" to="/faq">
                  faq
                </Link>
              </div>
              <div className="footer__link__container">
                <KeyboardArrowRight />
                <Link className="footer__link text-capitalize" to="/terms">
                  terms and conditions
                </Link>
              </div>
              <div className="footer__link__container">
                <KeyboardArrowRight />
                <Link className="footer__link text-capitalize" to="/privacy">
                  privacy policy
                </Link>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={2.5} className="footer__pages">
              <h4 className="footer__header">products</h4>
              <div className="footer__link__container">
                <KeyboardArrowRight />
                <Link
                  className="footer__link text-capitalize"
                  to="/products/men"
                >
                  men
                </Link>
              </div>

              <div className="footer__link__container">
                <KeyboardArrowRight />

                <Link
                  className="footer__link text-capitalize"
                  to="/products/women"
                >
                  women
                </Link>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="footer__contact">
              <h4 className="footer__header">contact us</h4>
              <Typography className="footer__link__container footer__text">
                <KeyboardArrowRight />
                <a
                  className="footer__text footer__link"
                  target="_blank"
                  href="https://www.google.com/maps/d/viewer?mid=1ksBysRv_ZSolbXZfUY7bqdJDYXM&hl=en_US&ll=30.069614000000037%2C31.222285999999986&z=17"
                  rel="noreferrer"
                >
                  26, July Street - Mohandseen
                </a>
              </Typography>
              <Typography className=" footer__link__container ">
                <KeyboardArrowRight />
                <a
                  className="footer__text footer__link"
                  href="tel:(08) 8827 633354"
                >
                  (08) 8827 633354
                </a>
              </Typography>
              <Typography className="footer__link__container ">
                <KeyboardArrowRight />
                <a
                  className="footer__text footer__link"
                  href="fax:(08) 8827 633354"
                >
                  (08) 8827 633354
                </a>
              </Typography>
              <Typography className=" footer__link__container ">
                <KeyboardArrowRight />
                <a
                  className="footer__text footer__link"
                  href="mailto:khaledellssy310@gmail.com"
                >
                  khaledellssy310@gmail.com
                </a>
              </Typography>
              <Typography className="footer__link__container ">
                <KeyboardArrowRight />
                <a
                  className="footer__text footer__link"
                  href="mailto:khaledellssy310@gmail.com"
                >
                  Opening 9:00-16:00, Sat-Thur
                </a>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </footer>
      <div className="footer__bottom">
        <div className="footer__social">
          {/* <h4 className="footer__header">follow us</h4> */}
          <div className="footer__social-icons">
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
            <a
              className="footer__social-icon"
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YouTube />
            </a>
          </div>
        </div>
        <Typography align="center" className="footer__bottom__copyRight">
          © 2023 Your Company. All Rights Reserved.
        </Typography>
      </div>
    </>
  );
}

export default Footer;
