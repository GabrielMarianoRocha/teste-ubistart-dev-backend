const todoService = require('../services/todo.service');

exports.create = async (req, res, next) => {
  try {
    const { description, due_date } = req.body;
    await todoService.create(description, due_date, req.user.id);
    res.status(201).json({ message: 'TODO created' });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { description, due_date } = req.body;
    await todoService.update(req.params.id, description, due_date);
    res.json({ message: 'TODO updated' });
  } catch (err) {
    next(err);
  }
};

exports.complete = async (req, res, next) => {
  try {
    await todoService.complete(req.params.id);
    res.json({ message: 'TODO completed' });
  } catch (err) {
    next(err);
  }
};

exports.listUser = async (req, res, next) => {
  try {
    const todos = await todoService.listUser(req.user.id);
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

exports.listAdmin = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, late } = req.query;
    const todos = await todoService.listAdmin(
      Number(page),
      Number(limit),
      late === 'true'
    );
    res.json(todos);
  } catch (err) {
    next(err);
  }
};