const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const vehicleRoutes = require('./routes/vehicles');



const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', vehicleRoutes);

const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
  res.send('Vehicle Rental API Running');
});


app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
