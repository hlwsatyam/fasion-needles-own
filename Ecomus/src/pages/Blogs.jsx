import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { FaBlog } from "react-icons/fa";
import Header from "../components/Header/Header";

function Blogs() {
  const blogs = []; // Replace this with actual data or state for blogs.

  return (
    <div>
      <Header />
      <div className="py-5 px-4">
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", mb: 4, color: "#0277bd" }}
        >
          Latest Blogs
        </Typography>
        {blogs.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "300px",
              border: "1px dashed #0288d1",
              borderRadius: 3,
              backgroundColor: "#f1f9ff",
              p: 3,
            }}
          >
            <FaBlog size={50} color="#0288d1" />
            <Typography
              variant="h6"
              align="center"
              sx={{ mt: 2, mb: 1, fontWeight: "medium", color: "#01579b" }}
            >
              No blogs found
            </Typography>
            <Typography
              variant="body2"
              align="center"
              sx={{ mb: 2, color: "#546e7a" }}
            >
              Stay tuned! Blogs will be available soon.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{
                px: 4,
                py: 1,
                fontSize: "0.9rem",
                backgroundColor: "#0288d1",
                borderRadius: 3,
                "&:hover": {
                  backgroundColor: "#01579b",
                },
              }}
            >
              Refresh
            </Button>
          </Box>
        ) : (
          <Box>
            {/* Map through blogs array and display blog items */}
            {blogs.map((blog, index) => (
              <Box
                key={index}
                sx={{ mb: 3, p: 2, boxShadow: 2, borderRadius: 3 }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "medium", color: "#01579b" }}
                >
                  {blog.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#546e7a" }}>
                  {blog.description}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </div>
    </div>
  );
}

export default Blogs;
