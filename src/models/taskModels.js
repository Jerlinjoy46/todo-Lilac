const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    task: { type: String },
    date: { type: String },
    reminder: { type: Boolean },
    isCompleteds: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("task", taskSchema);
