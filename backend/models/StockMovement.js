const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');
const User = require('./User');

const StockMovement = sequelize.define('StockMovement', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  product_id: {
    type: DataTypes.UUID,
    references: {
      model: Product,
      key: 'id',
    },
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('in', 'out'),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  performed_by: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  timestamps: true,
  createdAt: 'timestamp',
  updatedAt: false,
});

StockMovement.belongsTo(Product, { foreignKey: 'product_id' });
StockMovement.belongsTo(User, { foreignKey: 'performed_by' });
Product.hasMany(StockMovement, { foreignKey: 'product_id' });
User.hasMany(StockMovement, { foreignKey: 'performed_by' });

module.exports = StockMovement;