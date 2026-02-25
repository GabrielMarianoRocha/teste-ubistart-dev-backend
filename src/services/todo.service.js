const { v4: uuid } = require('uuid');
const AppError = require('../utils/appError');
const todoRepository = require('../repositories/todo.repository');

exports.create = async (description, due_date, user_id) => {
  await todoRepository.create({
    id: uuid(),
    description,
    due_date,
    user_id
  });
};

exports.update = async (id, description, due_date) => {
  const todo = await todoRepository.findById(id);
  if (!todo) throw new AppError('TODO not found', 404);

  if (todo.completed_at) {
    throw new AppError('Cannot update completed TODO', 400);
  }

  await todoRepository.update(id, description, due_date);
};

exports.complete = async (id) => {
  const todo = await todoRepository.findById(id);
  if (!todo) throw new AppError('TODO not found', 404);

  await todoRepository.complete(id);
};

exports.listUser = async (userId) => {
  const todos = await todoRepository.findByUser(userId);

  return todos.map(todo => ({
    ...todo,
    late:
      !todo.completed_at &&
      new Date(todo.due_date) < new Date()
  }));
};

exports.listAdmin = async (page, limit, late) => {
  const offset = (page - 1) * limit;
  return await todoRepository.findAllPaginated(limit, offset, late);
};