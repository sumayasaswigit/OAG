import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import './styles/MyArtWork.css';
import ArtworkCard from "./ArtworkCard";


const MyArtWork = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "SELLER") {
      setError("Unauthorized access");
      setLoading(false);
      return;
    }

    const fetchArtworks = async () => {
      try {
        const response = await axios.get(`${config.url}/seller/myartworks`, {
          params: { artistId: user.id },
        });

        if (response.status === 200) {
          setArtworks(response.data);
        } else {
          setError("Failed to fetch artworks");
        }
      } catch (err) {
        console.error("Axios fetch error:", err);
        if (err.response) {
          setError(`Error: ${err.response.status} - ${err.response.data.message || 'Something went wrong.'}`);
        } else if (err.request) {
          setError("No response from server.");
        } else {
          setError("Request failed.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  if (loading) {
    return <div className="artwork-container"><p>Loading artworks...</p></div>;
  }

  if (error) {
    return <div className="artwork-container"><p className="error-message">{error}</p></div>;
  }

  return (
    <div className="artwork-container">
      <h2 className="artwork-title">My Artworks</h2>

      {artworks.length === 0 ? (
        <p>No artworks found.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
          {artworks.map((art) => (
            <ArtworkCard key={art.id} art={art} />
            
          ))}
        </div>
      )}
    </div>
  );
};

export default MyArtWork;