// pages/blogs.js
"use client"; // For client-side rendering

import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import { FaHeart, FaShareAlt } from "react-icons/fa";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

const blogsData = [
  {
    id: 1,
    title: "Top Fashion Trends for 2024",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIPYgd6u9Bln7hSxqdreFeub2dFRUsNUoj6w&s", // Replace with a relevant image URL
    content: `
      2024 is set to be an exciting year in fashion, with bold colors, sustainable fabrics, and retro styles making a comeback.
      Get ready for oversized jackets, statement accessories, and the revival of Y2K fashion with a modern twist. 
      Don't miss our tips on how to style these trends effortlessly for any occasion.
    `,
  },
  {
    id: 2,
    title: "The Best Sustainable Fabrics for Your Wardrobe",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIPYgd6u9Bln7hSxqdreFeub2dFRUsNUoj6w&s", // Replace with a relevant image URL
    content: `
      Sustainability is no longer just a buzzword; it’s a lifestyle. Learn about eco-friendly materials like organic cotton, bamboo,
      and Tencel that are revolutionizing the industry. Discover why sustainable fashion is better for both your skin and the planet.
    `,
  },
  {
    id: 3,
    title: "5 Must-Have Accessories for This Season",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIPYgd6u9Bln7hSxqdreFeub2dFRUsNUoj6w&s", // Replace with a relevant image URL
    content: `
      Accessories can make or break an outfit. This season, focus on chunky gold jewelry, silk scarves, and structured handbags.
      Our experts guide you through selecting the perfect pieces to elevate your everyday looks and evening attire.
    `,
  },
  // Add more blog entries as needed with image URLs and detailed content
];

const Blogs = () => {
  const [open, setOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleOpen = (blog) => {
    setSelectedBlog(blog);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBlog(null);
  };

  return (
    <div>
      <Header />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          align="center"
          sx={{ mb: 4, fontWeight: "bold", color: "#01579b" }}
        >
          Our Latest Blogs
        </Typography>

        <Grid container spacing={4}>
          {blogsData.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog.id}>
              <Card
                sx={{
                  boxShadow: 5,
                  borderRadius: 3,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <CardActionArea onClick={() => handleOpen(blog)}>
                  <CardMedia
                    component="img"
                    alt={blog.title}
                    height="200"
                    image={blog.image}
                    title={blog.title}
                    sx={{
                      transition: "transform 0.3s",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                      {blog.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {blog.content.substring(0, 100)}...
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 2,
                      }}
                    >
                      <IconButton>
                        <FaHeart color="#e91e63" />
                      </IconButton>
                      <IconButton>
                        <FaShareAlt color="#01579b" />
                      </IconButton>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Modal for blog content */}
        <Modal
          open={open}
          onClose={handleClose}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              bgcolor: "white",
              p: 4,
              borderRadius: 2,
              width: "80%",
              maxWidth: 600,
              boxShadow: 24,
            }}
          >
            {selectedBlog && (
              <>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  {selectedBlog.title}
                </Typography>
                <Typography variant="body1">{selectedBlog.content}</Typography>
              </>
            )}
          </Box>
        </Modal>
      </Container>
      <Footer />
    </div>
  );
};

export default Blogs;
