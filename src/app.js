const express = require('express');
const authRoutes = require('./routes/auth.routes');
const todoRoutes = require('./routes/todo.routes');

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;