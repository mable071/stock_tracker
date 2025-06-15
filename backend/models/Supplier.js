const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Supplier = sequelize.define('Supplier', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  contact_phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

// Associations will be defined in Purchase.js to avoid circular dependencies
module.exports = Supplier;