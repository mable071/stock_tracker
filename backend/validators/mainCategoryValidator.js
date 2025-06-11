const { body } = require('express-validator');

exports.createMainCategory = [
  body('name').notEmpty().withMessage('Name is required'),
];

exports.updateMainCategory = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
];