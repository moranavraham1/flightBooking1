const express = require('express');
const router = express.Router();

// Sample flight data
const flights = [
  { name: "Flight A", departure: "New York", destination: "Los Angeles", price: 300 },
  { name: "Flight B", departure: "New York", destination: "Chicago", price: 150 },
  { name: "Flight C", departure: "Chicago", destination: "San Francisco", price: 400 },
  { name: "Flight D", departure: "Los Angeles", destination: "Houston", price: 250 },
  { name: "Flight E", departure: "San Francisco", destination: "Miami", price: 350 },
];

// Endpoint for getting flights
router.get('/', (req, res) => {
  res.json(flights);
});

module.exports = router;
