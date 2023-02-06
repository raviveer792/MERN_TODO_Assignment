const mongoose = require("mongoose");
const todo = mongoose.model("todo", {
  id: { type: String },
  task: { type: String },
  isCompleted: { type: Boolean },
});
module.exports = { todo };
