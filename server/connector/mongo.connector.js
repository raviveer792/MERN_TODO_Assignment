const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/todo", (error) => {
  if (error) console.log(error);
  else console.log("MongoDB Connected Successfully");
});

module.exports = mongoose;
