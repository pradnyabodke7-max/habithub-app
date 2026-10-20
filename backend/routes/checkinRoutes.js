const express = require("express");
const mongoose = require("mongoose");
const Habit = require("../models/Habit");
const CheckIn = require("../models/CheckIn");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const checkins = await CheckIn.find().sort({ date: 1 });
    res.json(checkins);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch check-ins" });
  }
});

router.post("/toggle", async (req, res) => {
  try {
    const { habitId, date } = req.body;

    if (!mongoose.isValidObjectId(habitId)) {
      return res.status(400).json({ message: "Invalid habit id" });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) {
      return res.status(400).json({ message: "Date must be YYYY-MM-DD" });
    }

    const habit = await Habit.findById(habitId);
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const existing = await CheckIn.findOne({ habit: habitId, date });

    if (existing) {
      await CheckIn.deleteOne({ _id: existing._id });
      return res.json({ checked: false, habitId, date });
    }

    await CheckIn.create({ habit: habitId, date });
    res.status(201).json({ checked: true, habitId, date });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ checked: true, habitId: req.body.habitId, date: req.body.date });
    }
    res.status(500).json({ message: "Failed to update check-in" });
  }
});

module.exports = router;