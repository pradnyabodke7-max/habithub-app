const mongoose = require("mongoose");

const checkInSchema = new mongoose.Schema(
  {
    habit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habit",
      required: true,
    },
    // Stored as "YYYY-MM-DD" text so time zones never shift the day
    date: {
      type: String,
      required: true,
      match: [/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"],
    },
  },
  { timestamps: true }
);

// A habit can only be checked in once per date
checkInSchema.index({ habit: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("CheckIn", checkInSchema);