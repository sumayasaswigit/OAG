import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import './styles/Discover.css';
import all from '../assets/all.jpg';
import { useNavigate } from "react-router-dom";

const Discover = () => {
  const [artworks, setArtworks] = useState([]);
  const [error, setError] = useState("");
  const [addedToWishlist, setAddedToWishlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoadingArtworks, setIsLoadingArtworks] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  const navigate = useNavigate();

  // Retrieve and parse the user object from localStorage
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user?.id || null; // Safely access userId, default to null if not found

  const handleCategoryClick = async (categoryValue) => {
    setSelectedCategory(categoryValue);
    setIsLoadingCategories(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 350));
      const response = await axios.get(`${config.url}/customer/category`, {
        params: { category: categoryValue }
      });
      setArtworks(response.data);
      setError("");
      setIsLoadingCategories(false);
    } catch (err) {
      console.error("Error fetching by category:", err);
      setError("Unable to filter artworks by category");
      setIsLoadingCategories(false);
    }
  };

  useEffect(() => {
    const fetchAllArtworks = async () => {
      setIsLoadingArtworks(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 350));
        const response = await axios.get(`${config.url}/customer/viewallartworks`);
        setArtworks(response.data);
        setIsLoadingArtworks(false);
      } catch (err) {
        setError("Failed to fetch artworks");
        console.error(err);
        setIsLoadingArtworks(false);
      }
    };

    fetchAllArtworks();
  }, []);

  const handleAddToWishlist = async (artworkId) => {
    try {
      if(!userId){
        window.alert("Log into your account !!")
        navigate('/login')
        window.scroll(0,0)
        return;
      }
      const response = await axios.post(`${config.url}/customer/wishlist/add`, null, {
        params: { userId, artworkId } // Include userId in the request
      });
      alert(response.data);
      if (!addedToWishlist.includes(artworkId)) {
        setAddedToWishlist([...addedToWishlist, artworkId]);
      }
    } catch (error) {
      console.error("Failed to add artwork to wishlist:", error.response?.data || error.message);
      alert(error.response?.data || "Failed to add artwork to wishlist");
    }
  };

  const handleBuyNow = (artworkId) => {
    if(!userId){
        window.alert("Log into your account !!")
        navigate('/login')
        window.scroll(0,0)
        return;
      }
    sessionStorage.setItem("artworks", JSON.stringify(artworks));
    navigate(`/view-product/${artworkId}`);
  };

  const categories = [
    { value: "POTRAIT", name: "Potrait", url: "https://i.pinimg.com/736x/ab/92/38/ab9238f8a6d8aa7658f1128ef641fb0e.jpg" },
    { value: "ABSTRACT", name: "Abstract", url: "https://texturetones.com/wp-content/uploads/2022/12/2-2.png" },
    { value: "LANDSCAPE", name: "Land Scape", url: "https://www.fineart.pub/wp-content/uploads/2021/05/landscape-painting.jpg" },
    { value: "HOLISTIC", name: "Holistic", url: "https://www.artzolo.com/cdn/shop/files/Lord-Krishna-ArtZolo-com-7611.jpg?v=1706738876&width=900" },
  ];

  return (
    <div className="artwork-container">
      <h2 className="artwork-title">Artwork Categories</h2>
      <div className="artwork-category">
        {isLoadingCategories ? (
          Array(5)
            .fill()
            .map((_, index) => (
              <Skeleton
                key={index}
                height={100}
                width={200}
                borderRadius={8}
                baseColor="#e0e0e0"
                highlightColor="#f5f5f5"
              />
            ))
        ) : (
          <>
            <div
              style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${all})`
              }}
              className="artwork-category-card all-artworks-card"
              onClick={() => handleCategoryClick("ALL")}
            >
              All Artworks
            </div>
            {categories.map((val, ind) => (
              <div
                key={ind}
                className="artwork-category-card"
                style={{ backgroundImage: `url(${val.url})` }}
                onClick={() => handleCategoryClick(val.value)}
              >
                {val.name}
              </div>
            ))}
          </>
        )}
      </div>

      <div>
        <h2 className="artwork-title">Discover Artworks</h2>
        {error && <p className="error-message">{error}</p>}

        {isLoadingArtworks || isLoadingCategories ? (
          <div className="artwork-grid">
            {Array(6)
              .fill()
              .map((_, index) => (
                <div key={index} className="artwork-card">
                  <Skeleton
                    height={200}
                    width="100%"
                    borderRadius="8px 8px 0 0"
                    baseColor="#e0e0e0"
                    highlightColor="#f5f5f5"
                  />
                  <div style={{ padding: 15 }}>
                    <Skeleton
                      height={20}
                      width="80%"
                      style={{ marginBottom: 10 }}
                    />
                    <Skeleton
                      height={14}
                      width="90%"
                      style={{ marginBottom: 10 }}
                    />
                    <Skeleton
                      height={14}
                      width="60%"
                      style={{ marginBottom: 10 }}
                    />
                    <Skeleton
                      height={14}
                      width="50%"
                      style={{ marginBottom: 15 }}
                    />
                    <div style={{ display: "flex", gap: 10 }}>
                      <Skeleton height={30} width={120} />
                      <Skeleton height={30} width={100} />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : artworks.length === 0 ? (
          <p>No artworks available.</p>
        ) : (
          <div className="artwork-grid">
            {artworks.map((art) => (
              <div key={art.id} className="artwork-card">
                <img
                  src={art.image}
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

                  <div>
                    <button
                      className="wishlist-button"
                      onClick={() => handleAddToWishlist(art.id)}
                      disabled={addedToWishlist.includes(art.id)}
                    >
                      {addedToWishlist.includes(art.id) ? "Added to Wishlist" : "Add to Wishlist"}
                    </button>
                    <button
                      className="buy-button"
                      onClick={() => handleBuyNow(art.id)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;