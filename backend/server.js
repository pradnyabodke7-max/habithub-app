require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const habitRoutes = require("./routes/habitRoutes");
const checkinRoutes = require("./routes/checkinRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "HabitHub API is running" });
});

app.use("/api/habits", habitRoutes);
app.use("/api/checkins", checkinRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

async function start() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is missing. Create backend/.env first.");
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