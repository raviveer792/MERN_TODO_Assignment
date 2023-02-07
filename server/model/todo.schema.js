const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  id: { type: String, required: true },
  task: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
});
module.exports = mongoose.model("todo", todoSchema);
