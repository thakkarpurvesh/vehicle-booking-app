const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Vehicle = require('./Vehicle');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Vehicle,
      key: 'id',
    },
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  tableName: 'bookings',
  timestamps: false,
});

Booking.belongsTo(Vehicle, { foreignKey: 'vehicleId' });
Vehicle.hasMany(Booking, { foreignKey: 'vehicleId' });

module.exports = Booking;
