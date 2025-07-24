const express = require("express");
const cors = require("cors");
const app = express();
const resumeRoutes = require("./routes/resumeRoutes");
require("dotenv").config();
const db = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", resumeRoutes);

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});