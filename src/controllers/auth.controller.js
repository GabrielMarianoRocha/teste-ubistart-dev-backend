const authService = require('../services/auth.service');

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await authService.register(email, password);
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};