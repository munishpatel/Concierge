import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <nav>
        <div className="logo-container">
          <img src="/images/logo.png" alt="Luxury Concierge Logo" className="logo" />
          <h1>The Luxury Concierge Services</h1>
        </div>
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>
      <main>
        <section className="hero">
          <h2>If you want something done right...</h2>
          <p>You don't have to do it yourself.</p>
          <Link to="/register" className="cta-button">Get Started</Link>
        </section>

        <section id="services" className="services">
          <h2>Our Services</h2>
          <div className="service-item">
            <i className="fas fa-plane"></i>
            <h3>Couple Dates</h3>
            <p>We handle all your date arrangements, from booking to accommodations.</p>
          </div>
          <div className="service-item">
            <i className="fas fa-calendar-alt"></i>
            <h3>Event Management</h3>
            <p>Let us plan your next event, ensuring every detail is perfect.</p>
          </div>
          <div className="service-item">
            <i className="fas fa-car"></i>
            <h3>Transportation</h3>
            <p>Luxury transportation services for any occasion.</p>
          </div>
        </section>

        <section id="about" className="about">
          <h2>About Us</h2>
          <p>We are dedicated to providing exceptional concierge services that cater to your unique lifestyle. Our team of experts is here to assist you with any request, big or small.</p>
        </section>

        <section id="contact" className="contact">
          <h2>Contact Us</h2>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </section>
      </main>
      <footer>
        <p>&copy; 2025 Luxury Concierge</p>
      </footer>
    </div>
  );
};

export default LandingPage;