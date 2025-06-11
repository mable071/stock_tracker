const { body } = require('express-validator');
const Product = require('../models/Product');
const User = require('../models/Product');

exports.createSale = [
  body('product_id')
    .isUUID().withMessage('Invalid UUID format for product_id')
    .custom(async (value) => {
      const product = await Product.findByPk(value);
      if (!product) {
        throw new Error('Product not found');
      }
      return true;
    }),
  body('quantity_sold').isInt({ min: 1 }).withMessage('Quantity sold must be a positive integer'),
  body('sale_price').isFloat({ min: 0 }).withMessage('Sale price must be a positive number'),
  body('sold_by')
    .isUUID().withMessage('Invalid UUID format for sold_by')
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        throw new Error('User not found');
      }
      return true;
    }),
  body('customer_name').notEmpty().withMessage('Customer name is required'),
  body('payment_method').notEmpty().withMessage('Payment method is required'),
  body('invoice_number').notEmpty().withMessage('Invoice number is required'),
];

exports.updateSale = [
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
  body('quantity_sold')
    .optional()
    .isInt({ min: 1 }).withMessage('Quantity sold must be a positive integer'),
  body('sale_price')
    .optional()
    .isFloat({ min: 0 }).withMessage('Sale price must be a positive number'),
  body('sold_by')
    .optional()
    .isUUID().withMessage('Invalid UUID format for sold_by')
    .custom(async (value) => {
      if (value) {
        const user = await User.findByPk(value);
        if (!user) {
          throw new Error('User not found');
        }
      }
      return true;
    }),
  body('customer_name')
    .optional()
    .notEmpty().withMessage('Customer name cannot be empty'),
  body('payment_method')
    .optional()
    .notEmpty().withMessage('Payment method cannot be empty'),
  body('invoice_number')
    .optional()
    .notEmpty().withMessage('Invoice number cannot be empty'),
];