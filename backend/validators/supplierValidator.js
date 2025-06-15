const { body } = require('express-validator');
const Supplier = require('../models/Supplier');

exports.createSupplier = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .trim()
    .isLength({ max: 100 })
    .withMessage('Name must not exceed 100 characters'),
  body('contact_email')
    .optional()
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (value) => {
      if (value) {
        const supplier = await Supplier.findOne({ where: { contact_email: value } });
        if (supplier) {
          throw new Error('Email already in use');
        }
      }
      return true;
    }),
  body('contact_phone')
    .optional()
    .isMobilePhone()
    .withMessage('Invalid phone number format'),
  body('address')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Address must not exceed 500 characters'),
  body('is_active')
    .optional()
    .isBoolean()
    .withMessage('is_active must be a boolean'),
];

exports.updateSupplier = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Name cannot be empty')
    .trim()
    .isLength({ max: 100 })
    .withMessage('Name must not exceed 100 characters'),
  body('contact_email')
    .optional()
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (value, { req }) => {
      if (value) {
        const supplier = await Supplier.findOne({ where: { contact_email: value } });
        if (supplier && supplier.id !== req.params.id) {
          throw new Error('Email already in use');
        }
      }
      return true;
    }),
  body('contact_phone')
    .optional()
    .isMobilePhone()
    .withMessage('Invalid phone number format'),
  body('address')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Address must not exceed 500 characters'),
  body('is_active')
    .optional()
    .isBoolean()
    .withMessage('is_active must be a boolean'),
];