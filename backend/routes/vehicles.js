const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// Get vehicle types filtered by wheels count
router.get('/types', vehicleController.getVehicleTypesByWheels);

// Get vehicles by vehicle type ID
router.get('/vehicles/:typeId', vehicleController.getVehiclesByType);

// Submit booking
router.post('/booking', vehicleController.createBooking);

module.exports = router;
