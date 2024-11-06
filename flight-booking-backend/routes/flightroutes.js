const express = require('express');
const router = express.Router();

// Expanded sample flight data with more airlines and routes
const flights = [
  { name: "Flight A", departure: "New York", destination: "Los Angeles", price: 300, airline: "El Al" },
  { name: "Flight B", departure: "New York", destination: "Chicago", price: 150, airline: "Arkia" },
  { name: "Flight C", departure: "Chicago", destination: "San Francisco", price: 400, airline: "Israir" },
  { name: "Flight D", departure: "Los Angeles", destination: "Houston", price: 250, airline: "El Al" },
  { name: "Flight E", departure: "San Francisco", destination: "Miami", price: 350, airline: "Arkia" },
  { name: "Flight F", departure: "Tel Aviv", destination: "New York", price: 700, airline: "Israir" },
  { name: "Flight G", departure: "Tel Aviv", destination: "Paris", price: 450, airline: "El Al" },
  { name: "Flight H", departure: "Paris", destination: "Berlin", price: 120, airline: "Arkia" },
  { name: "Flight I", departure: "Berlin", destination: "Rome", price: 180, airline: "Israir" },
  { name: "Flight J", departure: "Rome", destination: "Madrid", price: 200, airline: "El Al" },

];

// Endpoint for getting flights
router.get('/', (req, res) => {
  res.json(flights);
});

module.exports = router;
