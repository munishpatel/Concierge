import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <h2>Welcome to Luxury Concierge</h2>
      <p>Select a service to continue:</p>
      <ul>
        <li><Link to="/couple-dates">Couple Dates</Link></li>
        <li>Hotel Booking (Coming Soon)</li>
        <li>Tech Support (Coming Soon)</li>
        <li>Shopping (Coming Soon)</li>
      </ul>
    </div>
  );
};

export default HomePage;
