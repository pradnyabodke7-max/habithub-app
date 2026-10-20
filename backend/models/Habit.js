const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Habit name is required"],
      trim: true,
      minlength: [2, "Habit name must be at least 2 characters"],
      maxlength: [50, "Habit name must be under 50 characters"],
    },
    category: {
      type: String,
      enum: {
        values: ["Health", "Study", "Fitness", "Personal"],
        message: "Category must be Health, Study, Fitness or Personal",
      },
      required: [true, "Category is required"],
    },
    dailyGoal: {
      type: String,
      trim: true,
      maxlength: [60, "Daily goal must be under 60 characters"],
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Habit", habitSchema);