import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CoupleDatesPage.css";

const CoupleDatesPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [showSurprise, setShowSurprise] = useState(false); // State for surprise box
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Fetch initial restaurant data
    fetch("http://localhost:5002/api/restaurants")
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
      .catch((error) => console.error("Error fetching restaurants:", error));

    // Connect to WebSocket server
    const ws = new WebSocket("ws://localhost:5002");
    setSocket(ws);

    // Listen for updates from the server
    ws.onmessage = (event) => {
      const updatedRestaurants = JSON.parse(event.data);
      setRestaurants(updatedRestaurants);
    };

    // Cleanup WebSocket connection on component unmount
    return () => ws.close();
  }, []);

  const handleSurpriseClick = () => {
    setShowSurprise(true); // Show the surprise box
  };

  const handleReserveClick = (restaurantName) => {
    if (socket) {
      // Send reservation request to the server
      socket.send(JSON.stringify({ type: "RESERVE", restaurantName }));
    }

    alert(
      `Your reservation with ${restaurantName} is confirmed. You will receive the details in your mail. Thank you for choosing us.`
    );
    navigate("/home"); // Redirect to homepage
  };

  return (
    <div className="couple-dates-container">
      <h2>Plan Your Romantic Date</h2>
      <button onClick={handleSurpriseClick}>Open the Surprise Box</button>

      {showSurprise && (
        <div className="surprise-box">
          <h3>Available Reservations at Restaurants:</h3>
          <div className="restaurant-grid">
            {restaurants
              .filter((restaurant) => !restaurant.reserved) // Show only available restaurants
              .map((restaurant, index) => (
                <div key={index} className="restaurant-item">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="restaurant-image"
                  />
                  <div className="restaurant-name">{restaurant.name}</div>
                  <button
                    className="reserve-button"
                    onClick={() => handleReserveClick(restaurant.name)}
                  >
                    Reserve
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoupleDatesPage;