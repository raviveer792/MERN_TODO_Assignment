const express = require("express");
const router = express.Router();
const {
  create,
  getAll,
  update,
  remove,
} = require("../controller/todoController");

router.post("/", create);

router.get("/", getAll);

router.put("/", update);

router.delete("/", remove);

module.exports = router;
