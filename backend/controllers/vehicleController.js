const { VehicleType, Vehicle, Booking } = require('../models');
const { Op } = require('sequelize');

// Get vehicle types filtered by wheels count
exports.getVehicleTypesByWheels = async (req, res) => {
  try {
    const wheelsCount = parseInt(req.query.wheels);
    if (![2, 4].includes(wheelsCount)) {
      return res.status(400).json({ error: 'Invalid wheels count' });
    }
    const types = await VehicleType.findAll({
      where: { wheelsCount },
      attributes: ['id', 'name'],
    });
    res.json(types);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get vehicles by vehicle type ID
exports.getVehiclesByType = async (req, res) => {
  try {
    const typeId = parseInt(req.params.typeId);
    if (isNaN(typeId)) {
      return res.status(400).json({ error: 'Invalid vehicle type ID' });
    }
    const vehicles = await Vehicle.findAll({
      where: { vehicleTypeId: typeId },
      attributes: ['id', 'model'],
    });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create booking with overlap validation
exports.createBooking = async (req, res) => {
  try {
    const { firstName, lastName, vehicleId, startDate, endDate } = req.body;

    // Basic validation
    if (!firstName || !lastName || !vehicleId || !startDate || !endDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({ error: 'Start date must be before end date' });
    }

    // Check if vehicle exists
    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Check for overlapping bookings on the same vehicle
    const overlappingBooking = await Booking.findOne({
      where: {
        vehicleId,
        [Op.or]: [
          {
            startDate: { [Op.between]: [startDate, endDate] },
          },
          {
            endDate: { [Op.between]: [startDate, endDate] },
          },
          {
            startDate: { [Op.lte]: startDate },
            endDate: { [Op.gte]: endDate },
          },
        ],
      },
    });

    if (overlappingBooking) {
      return res.status(409).json({ error: 'Vehicle is already booked for the selected date range' });
    }

    // Create booking
    const booking = await Booking.create({
      firstName,
      lastName,
      vehicleId,
      startDate,
      endDate,
    });

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
