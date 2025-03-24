import React, { useState } from "react";
import "../styles/CoupleDatesPage.css";

const CoupleDatesPage = () => {
  const [showSurprise, setShowSurprise] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  const handleSurpriseClick = () => {
    setShowSurprise(true);
    // TODO: Fetch real-time available restaurants
    setRestaurants(["Restaurant A", "Restaurant B", "Restaurant C"]);
  };

  return (
    <div className="couple-dates-container">
      <h2>Plan Your Romantic Date</h2>
      <button onClick={handleSurpriseClick}>Open the Surprise Box</button>

      {showSurprise && (
        <div className="surprise-box">
          <h3>Available Restaurants:</h3>
          <ul>
            {restaurants.map((restaurant, index) => (
              <li key={index}>{restaurant}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CoupleDatesPage;
