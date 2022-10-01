const mongoose = require('mongoose');
module.exports = mongoose.model(
  'Sensordata',
  new mongoose.Schema({
    id: Number,
    BuildingNumber: String,
    RoomNumber: String,
    LightNumber: String,
    action: String,
    time: Date,
  })
);
