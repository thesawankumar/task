const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description, category, deadline } = req.body;
    const task = await Task.create({
      title,
      description,
      category,
      deadline,
      user: req.user._id,
      image: req.file?.path || null,
    });
    res.status(201).json(task);
  } catch {
    res.status(400).json({ error: "Task creation failed" });
  }
};

exports.getTasks = async (req, res) => {
  const filter = { user: req.user._id };
  if (req.query.status) filter.status = req.query.status;
  if (req.query.category) filter.category = req.query.category;

  const tasks = await Task.find(filter);
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  res.json({ message: "Task deleted" });
};
