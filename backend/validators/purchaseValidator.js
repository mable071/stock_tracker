const { body } = require('express-validator');
const Product = require('../models/Product');
const User = require('../models/User');
const Supplier = require('../models/Supplier');

exports.createPurchase = [
  body('product_id')
    .isUUID()
    .withMessage('Invalid UUID format for product_id')
    .custom(async (value) => {
      const product = await Product.findByPk(value);
      if (!product) {
        throw new Error('Product not found');
      }
      return true;
    }),
  body('supplier_id')
    .isUUID()
    .withMessage('Invalid UUID format for supplier_id')
    .custom(async (value) => {
      const supplier = await Supplier.findByPk(value);
      if (!supplier) {
        throw new Error('Supplier not found');
      }
      return true;
    }),
  body('quantity_received')
    .isInt({ min: 1 })
    .withMessage('Quantity received must be a positive integer'),
  body('cost_per_unit')
    .isFloat({ min: 0 })
    .withMessage('Cost per unit must be a positive number'),

];

exports.updatePurchase = [
  body('product_id')
    .optional()
    .isUUID()
    .withMessage('Invalid UUID format for product_id')
    .custom(async (value) => {
      if (value) {
        const product = await Product.findByPk(value);
        if (!product) {
          throw new Error('Product not found');
        }
      }
      return true;
    }),
  body('supplier_id')
    .optional()
    .isUUID()
    .withMessage('Invalid UUID format for supplier_id')
    .custom(async (value) => {
      if (value) {
        const supplier = await Supplier.findByPk(value);
        if (!supplier) {
          throw new Error('Supplier not found');
        }
      }
      return true;
    }),
  body('quantity_received')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Quantity received must be a positive integer'),
  body('cost_per_unit')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Cost per unit must be a positive number'),


];