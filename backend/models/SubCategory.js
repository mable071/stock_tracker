const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const MainCategory = require('./MainCategory');

const SubCategory = sequelize.define('SubCategory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  main_category_id: {
    type: DataTypes.UUID,
    references: {
      model: MainCategory,
      key: 'id',
    },
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

SubCategory.belongsTo(MainCategory, { foreignKey: 'main_category_id' });
MainCategory.hasMany(SubCategory, { foreignKey: 'main_category_id' });

module.exports = SubCategory;