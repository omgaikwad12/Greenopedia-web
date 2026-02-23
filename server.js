// ================= LOAD ENV =================
require("dotenv").config();

// ================= IMPORTS =================
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorMiddleware");

// Routes
const authRoutes = require("./routes/authRoutes");
const plantRoutes = require("./routes/plantRoutes");

// Middleware
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

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

// Protected Test Route
app.get("/api/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to protected dashboard",
    user: req.user
  });
});

// Root Route
app.get("/", (req, res) => {
  res.send("Greenopedia Backend Running 🚀");
});

app.use(errorHandler);

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
