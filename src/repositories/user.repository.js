const pool = require('../config/database');

exports.findByEmail = async (email) => {
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0];
};

exports.create = async (user) => {
  await pool.query(
    'INSERT INTO users (id, email, password, role) VALUES (?, ?, ?, ?)',
    [user.id, user.email, user.password, user.role]
  );
};