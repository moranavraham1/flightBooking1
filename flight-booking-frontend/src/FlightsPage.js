// src/FlightsPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FlightsPage.css';

const FlightsPage = ({ onBooking }) => { // Accept onBooking as prop to update MyBookingsPage
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    airline: '',
    departure: '',
    destination: '',
    maxPrice: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3000/api/flights')
      .then(response => {
        console.log("Flight data fetched:", response.data);
        setFlights(response.data);
        setFilteredFlights(response.data); // Initialize filtered flights to show all on load
      })
      .catch(error => console.error("There was an error fetching flights!", error));
  }, []);

  const handleBooking = (flight) => {
    axios.post('http://localhost:3000/api/bookings', { flightId: flight._id })
      .then(() => {
        alert("Flight booked successfully!");
        onBooking(flight); // Call onBooking to update MyBookingsPage immediately
      })
      .catch(() => alert("There was an error booking the flight."));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    setFilteredFlights(flights.filter(flight => {
      const matchesAirline = searchFilters.airline === '' || flight.airline.toLowerCase().includes(searchFilters.airline.toLowerCase());
      const matchesDeparture = searchFilters.departure === '' || flight.departure.toLowerCase().includes(searchFilters.departure.toLowerCase());
      const matchesDestination = searchFilters.destination === '' || flight.destination.toLowerCase().includes(searchFilters.destination.toLowerCase());
      const matchesPrice = searchFilters.maxPrice === '' || flight.price <= parseFloat(searchFilters.maxPrice);

      return matchesAirline && matchesDeparture && matchesDestination && matchesPrice;
    }));
  };

  return (
    <div className="container">
      <h1 className="heading">Available Flights</h1>

      {/* Search Form */}
      <div className="searchForm">
        <input
          type="text"
          name="airline"
          placeholder="Airline"
          value={searchFilters.airline}
          onChange={handleInputChange}
          className="searchInput"
        />
        <input
          type="text"
          name="departure"
          placeholder="Departure"
          value={searchFilters.departure}
          onChange={handleInputChange}
          className="searchInput"
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={searchFilters.destination}
          onChange={handleInputChange}
          className="searchInput"
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price ($)"
          value={searchFilters.maxPrice}
          onChange={handleInputChange}
          className="searchInput"
          step="50"
          min="0"
        />
        <button onClick={applyFilters} className="filterButton">Apply Filters</button>
      </div>

      {filteredFlights.length > 0 ? (
        <div className="flightsList">
          {filteredFlights.map(flight => (
            <div key={flight._id} className="flightItem">
              <div className="flightDetailsWrapper">
                <div>
                  <h3 className="flightName">{flight.name}</h3>
                  <p className="flightDetails">Airline: {flight.airline}</p>
                  <p className="flightDetails">From: {flight.departure} to {flight.destination}</p>
                </div>
                <div className="priceTag">
                  ${flight.price.toFixed(2)}
                </div>
              </div>
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
