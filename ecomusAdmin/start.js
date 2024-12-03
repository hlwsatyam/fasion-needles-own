const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3002;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "build")));

// Handle all requests and return the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
