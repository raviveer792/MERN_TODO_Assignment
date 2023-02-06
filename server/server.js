const express = require("express");
require("./connector/mongo.connector");
const app = express();
const router = express.Router();

app.use(express.json());
app.use(router);

router.get("/health", (req, res) => {
  res.send("Healty");
});

app.listen(3001, () => {
  console.log("server is running on 3000");
});
