const todoModel = require("../model/todo.schema");

const create = async (req, res) => {
  try {
    const { id, task, isCompleted } = req.body;
    const session = todoModel({ id, task, isCompleted });
    const result = await session.save();
    if (result) res.send({ success: true, data: result });
    else res.send({ success: false, data: null });
  } catch (error) {}
  res.send({ success: false, data: error });
};

const getAll = async (req, res) => {
  try {
    const result = await todoModel.find();
    if (result) res.send({ success: true, data: result });
    else res.send({ success: false, data: null });
  } catch (error) {}
  res.send({ success: false, data: error });
};

const update = async (req, res) => {
  try {
    const { id, task, isCompleted } = req.body;
    const result = await todoModel.findOneAndUpdate(
      { id },
      { id, task, isCompleted },
      { upsert: true }
    );
    if (result) res.send({ success: true, data: result });
    else res.send({ success: false, data: null });
  } catch (error) {}
  res.send({ success: false, data: error });
};

const remove = async (req, res) => {
  try {
    const { id } = req.query;
    const result = await todoModel.deleteOne({ id });
    if (result) res.send({ success: true, data: result });
    else res.send({ success: false, data: null });
  } catch (error) {}
  res.send({ success: false, data: error });
};

module.exports = { create, getAll, update, remove };
