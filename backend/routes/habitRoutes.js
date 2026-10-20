const express = require("express");
const mongoose = require("mongoose");
const Habit = require("../models/Habit");
const CheckIn = require("../models/CheckIn");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const habits = await Habit.find().sort({ createdAt: 1 });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch habits" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, category, dailyGoal } = req.body;
    const habit = await Habit.create({ name, category, dailyGoal });
    res.status(201).json(habit);
  } catch (error) {
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((e) => e.message).join(", ");
      return res.status(400).json({ message });
    }
    res.status(500).json({ message: "Failed to create habit" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid habit id" });
    }
    const { name, category, dailyGoal } = req.body;
    const habit = await Habit.findByIdAndUpdate(
      req.params.id,
      { name, category, dailyGoal },
      { new: true, runValidators: true }
    );
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }
    res.json(habit);
  } catch (error) {
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((e) => e.message).join(", ");
      return res.status(400).json({ message });
    }
    res.status(500).json({ message: "Failed to update habit" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid habit id" });
    }
    const habit = await Habit.findByIdAndDelete(req.params.id);
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }
    await CheckIn.deleteMany({ habit: req.params.id });
    res.json({ message: "Habit deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete habit" });
  }
});

module.exports = router;