const sequelize = require('../config/database');
const { VehicleType, Vehicle, Booking } = require('../models');

async function seed() {
  try {
    await sequelize.sync({ force: true }); // drops tables and recreates

    // Seed Vehicle Types
    const hatchback = await VehicleType.create({ name: 'Hatchback', wheelsCount: 4 });
    const suv = await VehicleType.create({ name: 'SUV', wheelsCount: 4 });
    const sedan = await VehicleType.create({ name: 'Sedan', wheelsCount: 4 });
    const cruiser = await VehicleType.create({ name: 'Cruiser', wheelsCount: 2 });

    // Seed Vehicles
    await Vehicle.bulkCreate([
      { model: 'Honda Fit', vehicleTypeId: hatchback.id },
      { model: 'Toyota Yaris', vehicleTypeId: hatchback.id },
      { model: 'Ford Explorer', vehicleTypeId: suv.id },
      { model: 'Jeep Wrangler', vehicleTypeId: suv.id },
      { model: 'Honda Accord', vehicleTypeId: sedan.id },
      { model: 'Toyota Camry', vehicleTypeId: sedan.id },
      { model: 'Harley Davidson', vehicleTypeId: cruiser.id },
      { model: 'Kawasaki Vulcan', vehicleTypeId: cruiser.id },
    ]);

    console.log('Seed data created successfully');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();
