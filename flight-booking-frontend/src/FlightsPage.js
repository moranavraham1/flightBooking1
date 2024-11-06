// src/FlightsPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FlightsPage = () => {
  const [flights, setFlights] = useState([]);
  
  // Fetch available flights from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/flights')
      .then(response => setFlights(response.data))
      .catch(error => console.error("There was an error fetching flights!", error));
  }, []);
  
  const handleBookFlight = (flightId) => {
    axios.post(`http://localhost:5000/api/bookings`, { flightId })
      .then(response => {
        alert("Flight booked successfully!");
      })
      .catch(error => {
        alert("There was an error booking the flight.");
      });
  };
  
  return (
    <div>
      <h1>Available Flights</h1>
      <div>
        {flights.length > 0 ? (
          flights.map(flight => (
            <div key={flight._id} className="flight-item">
              <h3>{flight.name}</h3>
              <p>{flight.departure} to {flight.destination}</p>
              <button onClick={() => handleBookFlight(flight._id)}>Book Flight</button>
            </div>
          ))
        ) : (
          <p>No flights available.</p>
        )}
      </div>
    </div>
  );
};

export default FlightsPage;
