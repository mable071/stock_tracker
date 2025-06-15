const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');
const Supplier = require('./Supplier');

const Purchase = sequelize.define('Purchase', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  product_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  supplier_id: {
    type: DataTypes.UUID,
    allowNull: true,
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
    get() {
      const quantity = this.getDataValue('quantity_received');
      const cost = this.getDataValue('cost_per_unit');
      return quantity && cost ? (quantity * cost).toFixed(2) : null;
    },
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

// Associations
Purchase.belongsTo(Product, { foreignKey: 'product_id' });
Purchase.belongsTo(Supplier, { foreignKey: 'supplier_id' });
Product.hasMany(Purchase, { foreignKey: 'product_id' });
Supplier.hasMany(Purchase, { foreignKey: 'supplier_id' });

module.exports = Purchase;