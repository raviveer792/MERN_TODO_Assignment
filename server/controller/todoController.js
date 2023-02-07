const todoModel = require("../model/todo.schema");

const create = async (req, res) => {
  try {
    const { id, task, isCompleted } = req.body;
    const session = new todoModel({ id, task, isCompleted });
    const result = await session.save();
    if (result) res.send({ success: true, data: result });
    else res.status(400).send({ success: false, data: null });
  } catch (err) {
    if (err.name === "ValidationError")
      res
        .status(400)
        .send({ success: false, name: err.name, message: err.message });
    else res.status(500).send({ success: false, data: err });
  }
};

const getAll = async (req, res) => {
  try {
    const result = await todoModel.find({});
    if (result) res.send({ success: true, data: result });
    else res.status(400).send({ success: false, data: null });
  } catch (err) {
    res.status(500).send({ success: false, data: err });
  }
};

const update = async (req, res) => {
  try {
    const { id, task, isCompleted } = req.body;
    const result = await todoModel.findOneAndUpdate(
      { id },
      { id, task, isCompleted },
      { upsert: true, new: true }
    );
    if (result) res.send({ success: true, data: result });
    else res.status(400).send({ success: false, data: null });
  } catch (err) {
    res.status(500).send({ success: false, data: err });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await todoModel.deleteOne({ id });
    if (result.deletedCount) res.send({ success: true, data: result });
    else res.status(400).send({ success: false, data: null });
  } catch (err) {
    res.status(500).send({ success: false, data: err });
  }
};

module.exports = { create, getAll, update, remove };
