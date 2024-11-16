"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Slide,
  Snackbar,
  Alert,
} from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import SendIcon from "@mui/icons-material/Send";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

const jobPositions = [
  { title: "Graphic Designer", icon: <WorkIcon fontSize="large" />, id: 1 },
  { title: "Marketing Specialist", icon: <WorkIcon fontSize="large" />, id: 2 },
  { title: "Staff Coordinator", icon: <WorkIcon fontSize="large" />, id: 3 },
];

const CareerPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");
  const [openToast, setOpenToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenToast(true);
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  return (
    <div>
      <Header />
      <Box
        sx={{
       
          textAlign: "center",
          backgroundColor: "#f4f4f4",
          animation: "fadeIn 2s",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 4 }}>
          Careers at Fashion Needles
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: "auto" }}>
          Join our team and help us redefine fashion. We are looking for
          talented individuals who are passionate about style, innovation, and
          quality.
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 3,
            mb: 5,
            "& > div": {
              transition: "transform 0.3s ease",
              cursor: "pointer",
              "&:hover": { transform: "scale(1.05)" },
            },
          }}
        >
          {jobPositions.map((job) => (
            <Box
              key={job.id}
              onClick={() => {
                setSelectedJob(job.title);
                setShowForm(true);
              }}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 2,
                width: 200,
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              {job.icon}
              <Typography variant="h6" sx={{ mt: 1 }}>
                {job.title}
              </Typography>
            </Box>
          ))}
        </Box>

        <Slide direction="up" in={showForm} mountOnEnter unmountOnExit>
          <Box
            sx={{
              maxWidth: 600,
              mx: "auto",
              p: 4,
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography variant="h5" sx={{ mb: 3 }}>
              Apply for: {selectedJob}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Full Name"
                fullWidth
                required
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: <MaleIcon sx={{ mr: 1 }} />,
                }}
              />
              <TextField
                label="Email"
                fullWidth
                type="email"
                required
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: <EmailIcon sx={{ mr: 1 }} />,
                }}
              />
              <TextField
                label="Gender"
                select
                fullWidth
                required
                sx={{ mb: 3 }}
                defaultValue="Male"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>
              <TextField
                label="Why are you a good fit for this role?"
                multiline
                rows={4}
                fullWidth
                required
                sx={{ mb: 3 }}
              />
              <Button
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                type="submit"
                sx={{ width: "100%", padding: "0.8rem" }}
              >
                Submit Application
              </Button>
            </form>
          </Box>
        </Slide>

        <Snackbar
          open={openToast}
          autoHideDuration={3000}
          onClose={handleCloseToast}
        >
          <Alert
            onClose={handleCloseToast}
            style={{ background: "red", color: "white" }}
            severity="success"
            sx={{ width: "100%" }}
          >
            Application submitted. We will contact you soon.
          </Alert>
        </Snackbar>
      </Box>
      <Footer />
    </div>
  );
};

export default CareerPage;
