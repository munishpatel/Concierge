import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <nav>
        <h1>The Luxury Concierge Services</h1>
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>
      <main>
        <h2>Welcome to Your Premium Concierge Service</h2>
        <p>Experience luxury services at your fingertips.</p>
      </main>
      <footer>
        <p>&copy; 2025 Luxury Concierge</p>
      </footer>
    </div>
  );
};

export default LandingPage;
