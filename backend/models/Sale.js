const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');
const User = require('./User');

const Sale = sequelize.define('Sale', {
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
  quantity_sold: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sale_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    get() {
      return (this.quantity_sold * this.sale_price).toFixed(2);
    },
  },
  // sold_by: {
  //   type: DataTypes.UUID,
  //   references: {
  //     model: User,
  //     key: 'id',
  //   },
  //   allowNull: false,
  // },
  
  // payment_method: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },

}, {
  timestamps: true,
  createdAt: 'timestamp',
  updatedAt: false,
});

Sale.belongsTo(Product, { foreignKey: 'product_id' });
// Sale.belongsTo(User, { foreignKey: 'sold_by' });
Product.hasMany(Sale, { foreignKey: 'product_id' });
// User.hasMany(Sale, { foreignKey: 'sold_by' });

module.exports = Sale;