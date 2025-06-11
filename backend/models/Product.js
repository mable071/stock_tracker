const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const SubCategory = require('./SubCategory');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sub_category_id: {
    type: DataTypes.UUID,
    references: {
      model: SubCategory,
      key: 'id',
    },
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reorder_level: {
    type: DataTypes.INTEGER,
    allowNull: false,
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

Product.belongsTo(SubCategory, { foreignKey: 'sub_category_id' });
SubCategory.hasMany(Product, { foreignKey: 'sub_category_id' });

module.exports = Product;