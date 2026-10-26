require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const habitRoutes = require("./routes/habitRoutes");
const checkinRoutes = require("./routes/checkinRoutes");
const requireAuth = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "HabitHub API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/habits", requireAuth, habitRoutes);
app.use("/api/checkins", requireAuth, checkinRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

async function start() {
  if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    console.error("MONGO_URI or JWT_SECRET is missing. Check backend/.env");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

start();