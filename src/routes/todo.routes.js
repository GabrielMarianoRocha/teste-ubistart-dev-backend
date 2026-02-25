const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');
const auth = require('../middlewares/auth.middleware');
const admin = require('../middlewares/admin.middleware');

router.use(auth);

router.post('/', todoController.create);
router.put('/:id', todoController.update);
router.patch('/:id/complete', todoController.complete);
router.get('/', todoController.listUser);

router.get('/admin/all', admin, todoController.listAdmin);

module.exports = router;