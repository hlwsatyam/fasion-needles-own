import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/contact-form`,
        formData
      );
      if (response.status === 200) {
        toast.success("Message sent successfully!", {
          autoClose: 3000,
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.", {
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <Header />
      <Container maxWidth="lg" sx={{ pt: 8, pb: 10 }}>
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 5, color: "#01579b" }}
        >
          Get in Touch with Us
        </Typography>

        <Grid container spacing={4}>
          {/* Contact Information Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 6, borderRadius: 3, p: 2 }}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ mb: 2, fontWeight: "medium", color: "#0277bd" }}
                >
                  Contact Information
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <FaPhone
                    color="#01579b"
                    size={20}
                    style={{ marginRight: "10px" }}
                  />
                  <Typography variant="body1">085954 90062</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <FaEnvelope
                    color="#01579b"
                    size={20}
                    style={{ marginRight: "10px" }}
                  />
                  <Typography variant="body1">
                    <a
                      href="mailto:support@fashionneedles.in"
                      style={{ textDecoration: "none", color: "#01579b" }}
                    >
                      support@fashionneedles.in
                    </a>
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FaMapMarkerAlt
                    color="#01579b"
                    size={20}
                    style={{ marginRight: "10px" }}
                  />
                  <Typography variant="body2">
                    First Floor, Lal Mandir Market, C-67, Main Rd, Shital Vihar,
                    Khora Colony, Sector 57, Noida, Uttar Pradesh 201301
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Form Card */}
          <Grid item xs={12} md={8}>
            <Card sx={{ boxShadow: 6, borderRadius: 3, p: 2 }}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ mb: 2, fontWeight: "medium", color: "#0277bd" }}
                >
                  Send Us a Message
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        required
                        sx={{ borderRadius: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Your Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        required
                        sx={{ borderRadius: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        required
                        sx={{ borderRadius: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Your Message (optional)"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        sx={{ borderRadius: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{
                          px: 6,
                          py: 1.5,
                          fontSize: "1rem",
                          backgroundColor: "#0288d1",
                          borderRadius: 3,
                          boxShadow: 3,
                          transition: "transform 0.3s ease",
                          "&:hover": {
                            backgroundColor: "#01579b",
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Embedded Google Map */}
        <Box sx={{ mt: 5, borderRadius: 3, overflow: "hidden" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d112085.88478390293!2d77.35136434543156!3d28.60925828659167!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce59d227a6879%3A0x276df0122d652387!2sFashion%20Needles!5e0!3m2!1sen!2sus!4v1730981395938!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>
      </Container>
      <ToastContainer />
      {/* <Footer /> */}
    </div>
  );
};

export default Contact;
