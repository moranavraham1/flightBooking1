import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FlightsPage from './FlightsPage';
import MyBookingsPage from './MyBookingsPage';
import './index.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>Flight Booking App</h1>
        
        {/* Button-like Navigation Links */}
        <div className="button-container">
          <Link to="/flights" className="button">Available Flights</Link>
          <Link to="/my-bookings" className="button">My Bookings</Link>
          <Link to="/" className="button">Home</Link> {/* Home Button at the end */}
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/flights" element={<FlightsPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
