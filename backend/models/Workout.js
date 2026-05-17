const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    workoutName: {
      type: String,
      required: true,
    },

    category: String,

    duration: Number,

    caloriesBurned: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Workout",
  workoutSchema
);