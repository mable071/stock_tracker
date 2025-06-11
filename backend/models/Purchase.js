const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');
const User = require('./User');

const Purchase = sequelize.define('Purchase', {
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
  quantity_received: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cost_per_unit: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  total_cost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    get() {
      return (this.quantity_received * this.cost_per_unit).toFixed(2);
    },
  },
  purchased_by: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  supplier_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  invoice_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  createdAt: 'timestamp',
  updatedAt: false,
});

Purchase.belongsTo(Product, { foreignKey: 'product_id' });
Purchase.belongsTo(User, { foreignKey: 'purchased_by' });
Product.hasMany(Purchase, { foreignKey: 'product_id' });
User.hasMany(Purchase, { foreignKey: 'purchased_by' });

module.exports = Purchase;