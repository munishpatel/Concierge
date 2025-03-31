import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaGift, FaGlassCheers } from "react-icons/fa";
import styles from "../styles/CoupleDatesPage.module.css";

const CoupleDatesPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [showSurprise, setShowSurprise] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    fetch("https://concierge-yyeh.onrender.com/api/restaurants")
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
      .catch((error) => console.error("Error fetching restaurants:", error));

    // Correct WebSocket connection with explicit path
    const wsUrl = process.env.NODE_ENV === 'production' 
      ? `wss://concierge-yyeh.onrender.com/ws`
      : 'ws://localhost:5002/ws';
    
    const ws = new WebSocket(wsUrl);
    setSocket(ws);

    ws.onmessage = (event) => {
      const updatedRestaurants = JSON.parse(event.data);
      setRestaurants(updatedRestaurants);
    };

    return () => ws.close();
  }, []);

  const handleSurpriseClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      setShowSurprise(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }, 1500);
  };

  const handleReserveClick = (restaurantName) => {
    if (socket) {
      socket.send(JSON.stringify({ type: "RESERVE", restaurantName }));
    }

    alert(
      `Your reservation with ${restaurantName} is confirmed. You will receive the details in your mail. Thank you for choosing us.`
    );
    navigate("/home");
  };

  return (
    <div className={styles.coupleDatesContainer}>
      <div className={styles.header}>
        <FaHeart className={styles.heartIcon} />
        <h2>Plan Your Romantic Date</h2>
        <FaHeart className={styles.heartIcon} />
      </div>

      <div className={styles.surpriseSection}>
        {!showSurprise && (
          <button
            className={`${styles.surpriseButton} ${isOpening ? styles.opening : ''}`}
            onClick={handleSurpriseClick}
            disabled={isOpening}
          >
            <FaGift className={styles.giftIcon} />
            {isOpening ? "Opening..." : "Open the Surprise Box"}
          </button>
        )}

        {showConfetti && <div className={styles.confetti}></div>}

        {showSurprise && (
          <div className={styles.surpriseBox}>
            <div className={styles.congratulations}>
              <FaGlassCheers className={styles.cheersIcon} />
              <h3>Congratulations!</h3>
              <p>For today's surprise date, you're going out to a restaurant!</p>
            </div>
            <h4>Available Reservations:</h4>
            <div className={styles.restaurantGrid}>
              {restaurants
                .filter((restaurant) => !restaurant.reserved)
                .map((restaurant, index) => (
                  <div key={index} className={styles.restaurantCard}>
                    <div className={styles.imageContainer}>
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className={styles.restaurantImage}
                        onError={(e) => {
                          e.target.onerror = null; // Prevent infinite loop if fallback fails
                          e.target.src = '/images/image1.jpeg'; // Fallback image from public folder
                        }}
                      />
                      <div className={styles.overlay}></div>
                    </div>
                    <div className={styles.restaurantInfo}>
                      <h5 className={styles.restaurantName}>{restaurant.name}</h5>
                      <button
                        className={styles.reserveButton}
                        onClick={() => handleReserveClick(restaurant.name)}
                      >
                        Reserve Now
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoupleDatesPage;