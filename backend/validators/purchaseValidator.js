const { body } = require('express-validator');
const Product = require('../models/Product');
const User = require('../models/Product');

exports.createPurchase = [
  body('product_id')
    .isUUID().withMessage('Invalid UUID format for product_id')
    .custom(async (value) => {
      const product = await Product.findByPk(value);
      if (!product) {
        throw new Error('Product not found');
      }
      return true;
    }),
  body('quantity_received').isInt({ min: 1 }).withMessage('Quantity received must be a positive integer'),
  body('cost_per_unit').isFloat({ min: 0 }).withMessage('Cost per unit must be a positive number'),
  body('purchased_by')
    .isUUID().withMessage('Invalid UUID format for purchased_by')
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        throw new Error('User not found');
      }
      return true;
    }),
  body('supplier_name').notEmpty().withMessage('Supplier name is required'),
  body('invoice_number').notEmpty().withMessage('Invoice number is required'),
];

exports.updatePurchase = [
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
  body('quantity_received').optional().isInt({ min: 1 }).withMessage('Quantity received must be a positive integer'),
  body('cost_per_unit').optional().isFloat({ min: 0 }).withMessage('Cost per unit must be a positive number'),
  body('purchased_by')
    .optional()
    .isUUID().withMessage('Invalid UUID format for purchased_by')
    .custom(async (value) => {
      if (value) {
        const user = await User.findByPk(value);
        if (!user) {
          throw new Error('User not found');
        }
      }
      return true;
    }),
  body('supplier_name').optional().notEmpty().withMessage('Supplier name cannot be empty'),
  body('invoice_number').optional().notEmpty().withMessage('Invoice number cannot be empty'),
];