const { body } = require('express-validator');
const Product = require('../models/Product');
const User = require('../models/Product');


exports.createStockMovement = [
  body('product_id')
    .isUUID().withMessage('Invalid UUID format for product_id')
    .custom(async (value) => {
      const product = await Product.findByPk(value);
      if (!product) {
        throw new Error('Product not found');
      }
      return true;
    }),
  body('type').isIn(['in', 'out']).withMessage('Type must be "in" or "out"'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
  body('performed_by')
    .isUUID().withMessage('Invalid UUID format for performed_by')
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        throw new Error('User not found');
      }
      return true;
    }),
  body('reason').optional().isString().withMessage('Reason must be a string'),
];

exports.updateStockMovement = [
  body('product_id')
    .optional()
    .isUUID().withMessage('Invalid UUID format for product_id')
    .custom(async (value) => {
      if (value) {
        const product = await Product.findByPk(value);
        if (!product) {
          throw new Error('Product not found');
        }
      }
      return true;
    }),
  body('type').optional().isIn(['in', 'out']).withMessage('Type must be "in" or "out"'),
  body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
  body('performed_by')
    .optional()
    .isUUID().withMessage('Invalid UUID format for performed_by')
    .custom(async (value) => {
      if (value) {
        const user = await User.findByPk(value);
        if (!user) {
          throw new Error('User not found');
        }
      }
      return true;
    }),
  body('reason').optional().isString().withMessage('Reason must be a string'),
];