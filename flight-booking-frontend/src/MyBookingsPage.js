// src/MyBookingsPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyBookingsPage = () => {
  const [bookedFlights, setBookedFlights] = useState([]);

  // Fetch booked flights from the backend
  useEffect(() => {
    axios.get('http://localhost:3000/api/bookings')
      .then(response => setBookedFlights(response.data))
      .catch(error => console.error("There was an error fetching bookings!", error));
  }, []);
  
  return (
    <div>
      <h1>My Booked Flights</h1>
      <div>
        {bookedFlights.length > 0 ? (
          bookedFlights.map(flight => (
            <div key={flight._id} className="booked-flight-item">
              <h3>{flight.name}</h3>
              <p>{flight.departure} to {flight.destination}</p>
            </div>
          ))
        ) : (
          <p>You have no bookings yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
