import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';

const FlightsPage = () => {
  const [flights, setFlights] = useState([]);

  // Fetch available flights from the backend
  useEffect(() => {
    axios.get('http://localhost:3000/api/flights')
      .then(response => setFlights(response.data))
      .catch(error => console.error("There was an error fetching flights!", error));
  }, []);

  const handleBooking = (flight) => {
    axios.post('http://localhost:3000/api/bookings', { flightId: flight._id })
      .then(response => {
        alert("Flight booked successfully!");
      })
      .catch(error => {
        alert("There was an error booking the flight.");
      });
  };

  return (
    <div>
      <h1>Flight Booking</h1>
      <ul>
        {flights.map(flight => (
          <li key={flight._id}>
            {flight.name} - ${flight.price}
            <button onClick={() => handleBooking(flight)}>Book</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

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
              <h3>{flight.flightId.name}</h3>
              <p>{flight.flightId.departure} to {flight.flightId.destination}</p>
            </div>
          ))
        ) : (
          <p>You have no bookings yet.</p>
        )}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/flights">Available Flights</Link>
            </li>
            <li>
              <Link to="/my-bookings">My Bookings</Link>
            </li>
          </ul>
        </nav>

        {/* Use Routes instead of Switch and the element prop instead of component */}
        <Routes>
          <Route path="/flights" element={<FlightsPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/" element={<h2>Welcome to the Flight Booking App!</h2>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
