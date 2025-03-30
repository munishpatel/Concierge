import React from "react";
import { Link } from "react-router-dom";
import { 
  FaHeart, 
  FaHotel, 
  FaCalendarAlt, 
  FaCarAlt, 
  FaHeadset, 
  FaShoppingBag,
  FaBell,
  FaUserCircle,
  FaSearch
} from "react-icons/fa";
import styles from "../styles/HomePage.module.css";

const serviceCards = [
  {
    title: "Couple Dates",
    icon: <FaHeart size={24} />,
    path: "/couple-dates",
    available: true,
    description: "Romantic experiences tailored for couples"
  },
  {
    title: "Hotel Booking",
    icon: <FaHotel size={24} />,
    path: "#",
    available: false,
    description: "Luxury accommodations for you worldwide"
  },
  {
    title: "Event Management",
    icon: <FaCalendarAlt size={24} />,
    path: "#",
    available: false,
    description: "Flawless execution of special occasions"
  },
  {
    title: "Travel Transportation",
    icon: <FaCarAlt size={24} />,
    path: "#",
    available: false,
    description: "Premium vehicles with professional drivers"
  },
  {
    title: "Tech Support",
    icon: <FaHeadset size={24} />,
    path: "#",
    available: false,
    description: "24/7 technical assistance for your devices"
  },
  {
    title: "Shopping",
    icon: <FaShoppingBag size={24} />,
    path: "#",
    available: false,
    description: "Personal shopping and delivery services"
  }
];

const HomePage = () => {
  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.dashboardHeader}>
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input type="text" placeholder="Search services..." />
        </div>
        <div className={styles.userControls}>
          <button className={styles.notificationBtn}>
            <FaBell size={18} />
            <span className={styles.notificationBadge}>3</span>
          </button>
          <div className={styles.userProfile}>
            <FaUserCircle size={32} />
          </div>
        </div>
      </header>

      <main className={styles.dashboardMain}>
        <div className={styles.welcomeBanner}>
          <h1>Welcome back to Luxury Concierge</h1>
          <p>How can we assist you today?</p>
        </div>

        <div className={styles.servicesGrid}>
          {serviceCards.map((service, index) => (
            <div 
              key={index} 
              className={`${styles.serviceCard} ${!service.available ? styles.comingSoon : ''}`}
            >
              <div className={styles.serviceIcon}>{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              {service.available ? (
                <Link to={service.path} className={styles.serviceLink}>
                  Access Service
                </Link>
              ) : (
                <span className={styles.comingSoonLabel}>Coming Soon</span>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;