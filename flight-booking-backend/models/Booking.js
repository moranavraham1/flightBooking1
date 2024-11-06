// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
  user: String,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
