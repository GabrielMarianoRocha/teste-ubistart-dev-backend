const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const AppError = require('../utils/appError');
const userRepository = require('../repositories/user.repository');

exports.register = async (email, password) => {
  const userExists = await userRepository.findByEmail(email);
  if (userExists) {
    throw new AppError('User already exists', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    id: uuid(),
    email,
    password: hashedPassword,
    role: 'USER'
  };

  await userRepository.create(user);
};

exports.login = async (email, password) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return token;
};