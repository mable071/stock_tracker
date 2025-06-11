const { body } = require('express-validator');

const MainCategory = require('../models/MainCategory');


exports.createSubCategory = [
  body('name').notEmpty().withMessage('Name is required'),
  body('main_category_id')
    .isUUID().withMessage('Invalid UUID format for main_category_id')
    .custom(async (value) => {
      const category = await MainCategory.findByPk(value);
      if (!category) {
        throw new Error('MainCategory not found');
      }
      return true;
    }),
];

exports.updateSubCategory = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('main_category_id')
    .optional()
    .isUUID().withMessage('Invalid UUID format for main_category_id')
    .custom(async (value) => {
      if (value) {
        const category = await MainCategory.findByPk(value);
        if (!category) {
          throw new Error('MainCategory not found');
        }
      }
      return true;
    }),
];