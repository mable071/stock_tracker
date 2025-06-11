const { body } = require('express-validator');
const  SubCategory  = require('../models/SubCategory');

exports.createProduct = [
  body('name').notEmpty().withMessage('Name is required'),
  body('product_code').notEmpty().withMessage('Product code is required'),
  body('sub_category_id')
    .isUUID().withMessage('Invalid UUID format for sub_category_id')
    .custom(async (value) => {
      const subCategory = await SubCategory.findByPk(value);
      if (!subCategory) {
        throw new Error('SubCategory not found');
      }
      return true;
    }),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('stock_quantity').isInt({ min: 0 }).withMessage('Stock quantity must be a non-negative integer'),
  body('unit').notEmpty().withMessage('Unit is required'),
  body('reorder_level').isInt({ min: 0 }).withMessage('Reorder level must be a non-negative integer'),
  body('is_active').optional().isBoolean().withMessage('is_active must be a boolean'),
];

exports.updateProduct = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('product_code').optional().notEmpty().withMessage('Product code cannot be empty'),
  body('sub_category_id')
    .optional()
    .isUUID().withMessage('Invalid UUID format for sub_category_id')
    .custom(async (value) => {
      if (value) {
        const subCategory = await SubCategory.findByPk(value);
        if (!subCategory) {
          throw new Error('SubCategory not found');
        }
      }
      return true;
    }),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('stock_quantity').optional().isInt({ min: 0 }).withMessage('Stock quantity must be a non-negative integer'),
  body('unit').optional().notEmpty().withMessage('Unit cannot be empty'),
  body('reorder_level').optional().isInt({ min: 0 }).withMessage('Reorder level must be a non-negative integer'),
  body('is_active').optional().isBoolean().withMessage('is_active must be a boolean'),
];