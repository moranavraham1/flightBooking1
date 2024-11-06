// routes/bookingRoutes.js
const express = require('express');
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const router = express.Router();

// Book a flight
router.post('/bookings', async (req, res) => {
  const { flightId } = req.body;
  try {
    const flight = await Flight.findById(flightId);
    if (!flight) return res.status(404).json({ message: 'Flight not found' });

    const booking = new Booking({
      flightId: flight._id,
      user: 'test-user', // Replace with actual user from session or auth
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('flightId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
