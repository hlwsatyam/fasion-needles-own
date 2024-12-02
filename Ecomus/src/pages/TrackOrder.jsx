"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Slide,
  Snackbar,
  Alert,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import axios from "axios";
import { set } from "lodash";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
//  const baseUrl ="http://localhost:3001"
// const baseUrl = "https://api.fashionneedles.com";
const baseUrl =process.env.REACT_APP_API_URL;

const TrackOrder = () => {
  const [orderID, setOrderID] = useState("");
  const [orderFound, setOrderFound] = useState(null);
  const [openToast, setOpenToast] = useState(false);
  const [message, setMessage] = useState("");
  const handleTrackOrder = async (e) => {
    e.preventDefault();

    if (orderID) {
      try {
        const res = await axios.get(
          `${baseUrl}/track/getPackageInfo?ref_ids=${orderID}`
        );

        if (res.status === 200) {
          setMessage(
            "Status: " +
              res.data?.data?.ShipmentData[0]?.Shipment?.Status?.Status +
              "  Product Location: " +
              res.data?.data?.ShipmentData[0]?.Shipment?.Status?.StatusLocation
          );
          setOrderFound(true);
        } else {
          setMessage("Order not found");
          setOrderFound(false);
        }
      } catch (error) {
        setMessage("Order not found");
        setOrderFound(false);
      }

      setOpenToast(true);
    }
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  return (
    <div>
      <Header />
      <Box
        sx={{
         padding:'4px',
          textAlign: "center",
          backgroundColor: "#f4f4f4",
          animation: "fadeIn 2s",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
          Track Your Order
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: "auto" }}>
          Enter your Order ID to check the status of your purchase.
        </Typography>

        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Box
            component="form"
            onSubmit={handleTrackOrder}
            sx={{
              maxWidth: 500,
              mx: "auto",
              p: 4,
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <TextField
              label="Order ID"
              fullWidth
              required
              value={orderID}
              onChange={(e) => setOrderID(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: <LocalShippingIcon sx={{ mr: 1 }} />,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ width: "100%", padding: "0.8rem", fontWeight: "bold" }}
            >
              Track Order
            </Button>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {message}
            </Typography>
          </Box>
        </Slide>

        <Snackbar
          open={openToast}
          autoHideDuration={3000}
          onClose={handleCloseToast}
        >
          <Alert
            onClose={handleCloseToast}
            severity={orderFound ? "success" : "error"}
            sx={{
              width: "100%",
              backgroundColor: orderFound ? "green" : "red",
              color: "white",
            }}
          >
            {orderFound
              ? "Order found! We’re preparing it for delivery."
              : "Order not found. Please check your Order ID."}
          </Alert>
        </Snackbar>
      </Box>
 
    </div>
  );
};

export default TrackOrder;
