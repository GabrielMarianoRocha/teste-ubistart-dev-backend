const pool = require('../config/database');

exports.create = async (todo) => {
  await pool.query(
    `INSERT INTO todos (id, description, due_date, user_id)
     VALUES (?, ?, ?, ?)`,
    [todo.id, todo.description, todo.due_date, todo.user_id]
  );
};

exports.findByUser = async (userId) => {
  const [rows] = await pool.query(
    'SELECT * FROM todos WHERE user_id = ?',
    [userId]
  );
  return rows;
};

exports.findById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM todos WHERE id = ?',
    [id]
  );
  return rows[0];
};

exports.update = async (id, description, due_date) => {
  await pool.query(
    `UPDATE todos 
     SET description = ?, due_date = ?, updated_at = NOW()
     WHERE id = ?`,
    [description, due_date, id]
  );
};

exports.complete = async (id) => {
  await pool.query(
    `UPDATE todos 
     SET completed_at = NOW()
     WHERE id = ?`,
    [id]
  );
};

exports.findAllPaginated = async (limit, offset, late) => {
  let query = `
    SELECT t.*, u.email 
    FROM todos t
    JOIN users u ON t.user_id = u.id
  `;

  if (late) {
    query += ` WHERE t.completed_at IS NULL AND t.due_date < NOW() `;
  }

  query += ` LIMIT ? OFFSET ?`;

  const [rows] = await pool.query(query, [limit, offset]);
  return rows;
};