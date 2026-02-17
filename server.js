// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Import routes
const authRoutes = require("./routes/authRoutes");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= DATABASE CONNECTION =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected 🌍"))
  .catch(err => console.log("MongoDB Error:", err.message));

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to protected dashboard",
    user: req.user
  });
});


// ================= ROOT TEST =================
app.get("/", (req, res) => {
  res.send("Greenopedia Backend Running 🚀");
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
