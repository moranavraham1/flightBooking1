import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FlightsPage.css';

const FlightsPage = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/flights')
      .then(response => {
        console.log("Flight data fetched:", response.data);
        setFlights(response.data);
      })
      .catch(error => console.error("There was an error fetching flights!", error));
  }, []);

  const handleBooking = (flight) => {
    axios.post('http://localhost:3000/api/bookings', { flightId: flight._id })
      .then(() => alert("Flight booked successfully!"))
      .catch(() => alert("There was an error booking the flight."));
  };

  return (
    <div className="container">
      <h1 className="heading">Available Flights</h1>
      {flights.length > 0 ? (
        <div className="flightsList">
          {flights.map(flight => (
            <div key={flight._id} className="flightItem">
              <h3 className="flightName">{flight.name}</h3>
              <p className="flightDetails">Airline: {flight.airline}</p>
              <p className="flightDetails">From: {flight.departure} to {flight.destination}</p>
              <p className="flightDetails">Price: ${flight.price.toFixed(2)}</p>
              <button onClick={() => handleBooking(flight)} className="bookButton">Book Flight</button>
            </div>
          ))}
        </div>
      ) : (
        <p className="noFlightsText">No flights available.</p>
      )}
    </div>
  );
};

export default FlightsPage;
