const { body } = require('express-validator');

exports.createUser = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
  body('role').isIn(['admin', 'employee']).withMessage('Role must be admin or employee'),
  body('is_active').optional().isBoolean().withMessage('is_active must be a boolean'),
];

exports.updateUser = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
  body('role').optional().isIn(['admin', 'employee']).withMessage('Role must be admin or employee'),
  body('is_active').optional().isBoolean().withMessage('is_active must be a boolean'),
];