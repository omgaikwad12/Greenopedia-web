// ================= LOAD ENV =================
require("dotenv").config();

// ================= IMPORTS =================
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const errorHandler = require("./middleware/errorMiddleware");
const authMiddleware = require("./middleware/authMiddleware");

// Routes
const authRoutes = require("./routes/authRoutes");
const plantRoutes = require("./routes/plantRoutes");

const app = express();

// ================= SECURITY MIDDLEWARE =================
app.use(helmet());              // Security headers
app.use(cors());                // Enable CORS
app.use(express.json());        // Parse JSON
app.use(morgan("dev"));         // Logging

// ================= RATE LIMITER =================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});

// Apply limiter globally
app.use(limiter);

// ================= DATABASE CONNECTION =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected 🌍"))
  .catch((err) => {
    console.log("MongoDB Connection Error ❌");
    console.log(err.message);
  });

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/plants", plantRoutes);

// ================= PROTECTED ROUTE =================
app.get("/api/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to protected dashboard",
    user: req.user
  });
});

// ================= ROOT ROUTE =================
app.get("/", (req, res) => {
  res.send("Greenopedia Backend Running 🚀");
});

// ================= GLOBAL ERROR HANDLER =================
app.use(errorHandler);

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
