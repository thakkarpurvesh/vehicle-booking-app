const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');

const app = express();

app.use(cors());
app.use(express.json());

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
