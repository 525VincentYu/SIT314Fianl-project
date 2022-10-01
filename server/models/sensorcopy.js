const mongoose = require('mongoose');
module.exports = mongoose.model(
  'Sensor',
  new mongoose.Schema({
    id: Number,
    BuildingNumber: String,
    RoomNumber: String,
    LightNumber: String,
    action: String,
    time: Date,
  })
);
