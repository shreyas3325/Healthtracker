const mongoose = require("mongoose");

const healthLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    calories: Number,

    water: Number,

    sleep: Number,

    weight: Number,

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "HealthLog",
  healthLogSchema
);