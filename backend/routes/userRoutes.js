const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const userValidator = require('../validators/userValidator');

router.post('/', userValidator.createUser, UserController.create);
router.get('/', UserController.findAll);
router.get('/:id', UserController.findOne);
router.put('/:id', userValidator.updateUser, UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router;