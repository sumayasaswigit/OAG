import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import './styles/Wishlist.css'; 

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [error, setError] = useState("");
  const userId = JSON.parse(localStorage.getItem("user"))?.id; // Get userId from localStorage

  useEffect(() => {
    if (!userId) {
      setError("User not logged in.");
      return;
    }

    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${config.url}/customer/wishlist/view/${userId}`);
        setWishlistItems(response.data); // Assuming the backend returns an array of wishlisted artworks
      } catch (err) {
        setError("Failed to fetch wishlist items");
        console.error(err);
      }
    };

    fetchWishlist();
  }, [userId]);

  const removeFromWishlist = async (artworkId) => {
    try {
      await axios.put(`${config.url}/customer/wishlist/remove`, null, {
        params: {
          userId: userId,
          artworkId: artworkId,
        },
      });
      setWishlistItems(wishlistItems.filter((art) => art.id !== artworkId));
    } catch (err) {
      setError("Failed to remove item from wishlist");
      console.error(err);
    }
  };
  
  

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">Your Wishlist</h2>

      {error && <p className="error-message">{error}</p>}

      {wishlistItems.length === 0 ? (
        <p>No items in your wishlist.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map((art) => (
            <div key={art.id} className="artwork-card">
              <img
                src={art.image} // Assuming artwork has an image field
                alt={art.title}
                className="artwork-image"
              />
              <div className="artwork-card-body">
                <h3 className="artwork-card-title">{art.title}</h3>
                <p className="artwork-description">{art.description}</p>
                <p className="artwork-price">₹{art.price}</p>
                <p className="artwork-dimensions">
                  {art.width} x {art.height} cm
                </p>
                <p className="artwork-status">
                  Status: {art.status ? art.status : "Unavailable"}
                </p>
                <button 
                  onClick={() => removeFromWishlist(art.id)} 
                  className="remove-button"
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
