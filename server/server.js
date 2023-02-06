const express = require("express");
require("./connector/mongo.connector");
const todoRouter = require("./routes/todo.routes");
const app = express();

app.use(express.json());
app.use("/api/todo", todoRouter);

app.get("/health", (req, res) => {
  res.send("Healty");
});

app.listen(3001, () => {
  console.log("server is running on 3000");
});
