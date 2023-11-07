import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./ContactUs.css";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import Footer from "../../components/Footer/Footer";

function ContactUs() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_5gavmdr",
      "template_cg26txg",
      form.current,
      "g-cBTCaGufYxirBWj"
    );
    e.target.reset();
  };

  return (
    <>
      <header className="contact__header">
        <Container>
          <h1 className="">Contact</h1>
        </Container>
      </header>

      <section className="contact-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d221140.70479715196!2d30.92881503650773!3d29.998865772488205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1szamalek%20club!5e0!3m2!1sen!2seg!4v1684875101201!5m2!1sen!2seg"
          style={{
            border: "0",
            display: "block",
            width: "100%",
            height: "400px",
          }}
          allowFullScreen=""
          title="Google Maps"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      <section className="contact__section p-50 backgroundSec">
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} className="contact__section__left">
              <h2 className="contact__section__left__header ">Get in Touch</h2>
              <Grid container className="">
                <Grid item xs={12} md={6} className="contact__get__touch">
                  <div className="contact__touch__Item">
                    <h5 className="contact__item__header">LOCATION</h5>
                    <p className="contact__text">
                      <a
                        className="contact__link"
                        href="https://www.google.com/maps/d/viewer?mid=1ksBysRv_ZSolbXZfUY7bqdJDYXM&hl=en_US&ll=30.069614000000037%2C31.222285999999986&z=17"
                      >
                        26, July Street - Mohandseen
                      </a>
                    </p>
                    <p className="">
                      <a
                        className="contact__link"
                        href="https://www.google.com/maps/place/Bronx,+NY,+USA/@40.85166,-73.840934,12z/data=!3m1!4b1!4m6!3m5!1s0x89c28b553a697cb1:0x556e43a78ff15c77!8m2!3d40.8447819!4d-73.8648268!16zL20vMDE1MzE?entry=ttu"
                      >
                        Bronx, NY 16544
                      </a>
                    </p>
                  </div>
                  <div className="contact__touch__Item">
                    <h5 className="contact__item__header">OUR HOURS</h5>
                    <p className="contact__text">MON-FRI 09:00 - 19:00</p>
                    <p className="contact__text">SAT-SUN 10:00 - 14:00</p>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className="contact__touch__Item">
                    <h5 className="contact__item__header">CONTACT US</h5>
                    <p className="contact__text">
                      <a
                        className="contact__link"
                        href="https://wa.me/+201011282551"
                      >
                        (020) 1011282551
                      </a>
                    </p>
                    <p className="contact__text">
                      <a
                        className="contact__link"
                        href="mailto:khaledellessy310@gmail.com"
                      >
                        khaledellessy310@gmail.com
                      </a>
                    </p>
                  </div>
                  <div className="contact__touch__Item">
                    <h5 className="contact__item__header">FOLLOW US</h5>
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
                    >
                      <YouTube />
                    </a>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item xs={12} md={6} className="contact-right py-2"> */}
            <Grid item xs={12} md={6}>
              <h2 className="contact__section__right__header">
                Send Us a Message
              </h2>
              <form className="contact-form" ref={form} onSubmit={sendEmail}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="name"
                      label="Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      className="input"
                      name="user_name"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      className="input"
                      name="user_email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="message"
                      label="Message"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                      rows={4}
                      className="input"
                      name="message"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      required
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      className="input"
                      name="subject"
                    >
                      <InputLabel id="subject-label">Subject</InputLabel>
                      <Select
                        labelId="subject-label"
                        id="subject"
                        label="Subject"
                      >
                        <MenuItem value="general">General Inquiry</MenuItem>
                        <MenuItem value="support">Support Request</MenuItem>
                        <MenuItem value="partnership">Partnership</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} className="contact__section__right__btn" >
                    <button
                      type="submit"
                      className="mainBtn contactBtn"
                    >
                      Send Message
                    </button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
          {/* </Grid> */}
        </Container>
      </section>

      <Footer />
    </>
  );
}

export default ContactUs;
