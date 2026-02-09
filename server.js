const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// root test
app.get("/", (req, res) => {
  res.send("Greenopedia Backend is Running 🚀");
});

// LOGIN API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  console.log("Login request:", req.body); // DEBUG LINE

  if (email === "admin@greenopedia.com" && password === "123456") {
    return res.json({
      success: true,
      message: "Login successful",
      user: {
        email: email,
        role: "user"
      }
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid email or password"
  });
});

// start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
