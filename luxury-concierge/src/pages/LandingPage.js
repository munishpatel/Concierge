import React from "react";
import { Link } from "react-router-dom";
import { 
  FaHeart, 
  FaCalendarAlt, 
  FaCarSide, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaInstagram, 
  FaTwitter, 
  FaLinkedin,
  FaCheckCircle,
  FaArrowDown
} from "react-icons/fa";
import "../styles/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <nav className="nav-container">
        <div className="logo-container">
          <img src="/images/logo.png" alt="Luxury Concierge Logo" className="logo" />
          <h1>The Luxury Concierge</h1>
        </div>
        <div className="nav-links">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link register-link">Register</Link>
        </div>
      </nav>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <h2 className="hero-title">If you want something done right...</h2>
            <p className="hero-subtitle">You don't have to do it yourself</p>
            <div className="hero-cta">
              <Link to="/register" className="cta-button primary">Get Started</Link>
              <Link to="#services" className="cta-button secondary">Our Services</Link>
            </div>
          </div>
          <div className="scroll-indicator">
            <span>Scroll Down</span>
            <FaArrowDown className="arrow-down" />
          </div>
        </section>

        <section id="services" className="services-section">
          <h2 className="section-title">Exclusive Services</h2>
          <p className="section-subtitle">Tailored experiences for the discerning client</p>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <FaHeart size={32} />
              </div>
              <h3>Couple Dates</h3>
              <p>We handle all your romantic arrangements, from intimate dinners to weekend getaways.</p>
            </div>
            
            <div className="service-card highlighted">
              <div className="service-icon">
                <FaCalendarAlt size={32} />
              </div>
              <h3>Event Management</h3>
              <p>Flawless execution of your special occasions with attention to every detail.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">
                <FaCarSide size={32} />
              </div>
              <h3>Transportation</h3>
              <p>Discreet and luxurious travel arrangements with professional chauffeurs.</p>
            </div>
          </div>
        </section>

        <section className="testimonial-section">
          <div className="testimonial-content">
            <blockquote>
              "The Luxury Concierge transformed what would have been a stressful event into a seamless experience. Their attention to detail is unmatched."
            </blockquote>
            <div className="testimonial-author">
              <div className="author-avatar"></div>
              <div>
                <p className="author-name">Munish Patel</p>
                <p className="author-title">CEO, Magic Enterprises</p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">Our Philosophy</h2>
              <p className="section-subtitle">Redefining luxury service</p>
              <p>
                We believe true luxury lies in effortless experiences. Our team of seasoned professionals anticipates your needs before you articulate them, delivering service that exceeds expectations.
              </p>
              <ul className="about-features">
                <li><FaCheckCircle className="feature-icon" /> Discretion guaranteed</li>
                <li><FaCheckCircle className="feature-icon" /> Global network of partners</li>
                <li><FaCheckCircle className="feature-icon" /> 24/7 availability</li>
              </ul>
            </div>
            <div className="about-image">
              {/* This would be your about us image */}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <h2 className="section-title">Ready to Experience Luxury?</h2>
          <p className="section-subtitle">Let us handle the details</p>
          
          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea placeholder="How can we assist you?" required></textarea>
            </div>
            <button type="submit" className="form-submit">Send Message</button>
          </form>
        </section>
      </main>

      <footer className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/images/logo.png" alt="Luxury Concierge Logo" className="logo" />
            <p>Exceptional service for exceptional people</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="#services">Services</Link>
            <Link to="#about">About</Link>
            <Link to="#contact">Contact</Link>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p><FaPhoneAlt className="contact-icon" /> +1 (555) 123-4567</p>
            <p><FaEnvelope className="contact-icon" /> contact@luxuryconcierge.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 The Luxury Concierge. All rights reserved.</p>
          <div className="social-links">
            <a href="https://www.instagram.com/"><FaInstagram className="social-icon" /></a>
            <a href="https://x.com/"><FaTwitter className="social-icon" /></a>
            <a href="https://www.linkedin.com/"><FaLinkedin className="social-icon" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;