const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const VehicleType = require('./VehicleType');

const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicleTypeId: {
    type: DataTypes.INTEGER,
    references: {
      model: VehicleType,
      key: 'id',
    },
  },
}, {
  tableName: 'vehicles',
  timestamps: false,
});

Vehicle.belongsTo(VehicleType, { foreignKey: 'vehicleTypeId' });
VehicleType.hasMany(Vehicle, { foreignKey: 'vehicleTypeId' });

module.exports = Vehicle;
