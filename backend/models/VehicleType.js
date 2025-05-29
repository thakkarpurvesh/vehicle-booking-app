const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const VehicleType = sequelize.define('VehicleType', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  wheelsCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'vehicle_types',
  timestamps: false,
});

module.exports = VehicleType;
