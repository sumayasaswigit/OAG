import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import './styles/Artist.css'
// Set app element for accessibility
Modal.setAppElement("#root");

const Artist = () => {
  const navigate = useNavigate()
  const [sellers, setSellers] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [selectedArtistId, setSelectedArtistId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${config.url}/customer/approvedsellers`)
      .then((response) => setSellers(response.data))
      .catch((error) => console.error("Error fetching sellers:", error));
  }, []);

  const handleViewArtworks = (artistId,artistName) => {
    setSelectedArtistId(artistName);
    axios
      .get(`${config.url}/seller/myartworks?artistId=${artistId}`)
      .then((response) => {
        setArtworks(response.data);
        setIsModalOpen(true);
      })
      .catch((error) => console.error("Error fetching artworks:", error));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setArtworks([]);
    setSelectedArtistId(null);
  };

  const handleClick = (artworkId) => {
    sessionStorage.setItem("artworks", JSON.stringify(artworks));
    navigate(`/view-product/${artworkId}`);
  };

  return (
    <div
      className="artist-container"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: "20px",
      }}
    >
      {sellers.map((seller) => (
        <div
          key={seller.id}
          className="artist-card"
          style={{
            width: "260px",
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 5px 20px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            textAlign: "center",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {seller.profileImage ? (
            <img
              src={seller.profileImage}
              alt={seller.name}
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "15px",
                border: "2px solid #fff",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
          ) : (
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                backgroundColor: "#ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
                fontWeight: "bold",
                color: "#555",
                margin: "0 auto 15px auto",
              }}
            >
              {seller.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
          <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#222", marginBottom: "10px" }}>
            {seller.name}
          </h3>
          <p style={{ fontSize: "14px", color: "#444", marginBottom: "6px" }}>
            <strong>Username:</strong> {seller.username}
          </p>
          <p style={{ fontSize: "14px", color: "#444", marginBottom: "6px" }}>
            <strong>Email:</strong> {seller.email}
          </p>
          <p style={{ fontSize: "14px", color: "#444", marginBottom: "6px" }}>
            <strong>Contact:</strong> {seller.contact}
          </p>
          <p style={{ fontSize: "14px", color: "#444", marginBottom: "20px" }}>
            <strong>Status:</strong> {seller.status || "N/A"}
          </p>
          <button
            onClick={() => handleViewArtworks(seller.id,seller.name)}
            style={{
              backgroundColor: "#0066cc",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              transition: "background-color 0.3s ease, transform 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#005bb5")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0066cc")}
          >
            View Artworks
          </button>
        </div>
      ))}

      {/* Modal for displaying artworks */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Artist Artworks"
        style={{
          content: {
            width: "90%",
            height: "90%",
            maxWidth: "1000px",
            maxHeight: "90vh",
            margin: "auto",
            padding: "30px",
            borderRadius: "12px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            position: "relative",
          },
        }}
      >
        {/* Close "X" Button */}
        <button
          onClick={closeModal}
          style={{
            position: "absolute",
            top: "15px",
            right: "20px",
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: "#333",
          }}
          aria-label="Close"
        >
          &times;
        </button>

        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontWeight: "600",
            color: "#222",
          }}
        >
          Artworks by Artist {selectedArtistId}
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            overflowY: "auto",
            maxHeight: "70vh",
            paddingRight: "10px",
          }}
        >
          {artworks.length > 0 ? (
            artworks.map((artwork) => (
              <div
                onClick={()=>{handleClick(artwork.id)}}
                key={artwork.id}
                className="artwork-artist-card"
                style={{
                  width: "220px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "15px",
                  backgroundColor: "#fff",
                  textAlign: "center",
                  cursor:"pointer"
                }}
              >
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  style={{
                    width: "100%",
                    height: "140px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "12px",
                  }}
                />
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#222",
                    marginBottom: "8px",
                  }}
                >
                  {artwork.title}
                </h4>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#555",
                    lineHeight: "1.4",
                  }}
                >
                  {artwork.description}
                </p>
              </div>
            ))
          ) : (
            <p style={{ fontSize: "16px", color: "#555" }}>No artworks found.</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Artist;
