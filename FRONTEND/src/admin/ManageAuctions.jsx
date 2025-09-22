import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import "./styles/ManageAuctions.css";

const ManageAuctions = () => {
  const [pendingAuctions, setPendingAuctions] = useState([]);
  const [approvedAuctions, setApprovedAuctions] = useState([]);
  const [error, setError] = useState("");

  const fetchAuctions = async () => {
    try {
      const pendingRes = await axios.get(`${config.url}/admin/pending`);
      const approvedRes = await axios.get(`${config.url}/admin/approved`);

      if (pendingRes.status === 200) {
        setPendingAuctions(pendingRes.data);
      }

      if (approvedRes.status === 200) {
        setApprovedAuctions(approvedRes.data);
      }
    } catch (err) {
      setError("Failed to fetch auctions");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`${config.url}/admin/approve/${id}`);
      fetchAuctions();
    } catch (err) {
      console.error("Approve error", err);
      setError("Failed to approve auction");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`${config.url}/admin/reject/${id}`);
      fetchAuctions();
    } catch (err) {
      console.error("Reject error", err);
      setError("Failed to reject auction");
    }
  };

  return (
    <div className="auction-container">
      <h2>Pending Auctions</h2>
      {error && <p className="error">{error}</p>}

      {pendingAuctions.length === 0 ? (
        <p>No pending or rejected auctions found.</p>
      ) : (
        <div className="auction-grid">
          {pendingAuctions.map((auction) => (
            <div className="auction-card" key={auction.id}>
              <img src={auction.artwork.image} alt={auction.artwork.title} />
              <h3>{auction.artwork.title}</h3>
              <p>{auction.artwork.description}</p>
              <p>Start: {new Date(auction.startTime).toLocaleString()}</p>
              <p>End: {new Date(auction.endTime).toLocaleString()}</p>
              <p>Starting Bid: ₹{auction.startingBid}</p>
              <p>Status: {auction.status}</p>

              {auction.status === "REJECTED" && (
                <span className="tag-rejected">Previously Rejected</span>
              )}

              <div className="button-group">
                <button onClick={() => handleApprove(auction.id)} className="approve-btn">
                  Approve
                </button>
                <button onClick={() => handleReject(auction.id)} className="reject-btn">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2>Approved Auctions</h2>
      {approvedAuctions.length === 0 ? (
        <p>No approved auctions found.</p>
      ) : (
        <div className="auction-grid">
          {approvedAuctions.map((auction) => (
            <div className="auction-card" key={auction.id}>
              <img src={auction.artwork.image} alt={auction.artwork.title} />
              <h3>{auction.artwork.title}</h3>
              <p>{auction.artwork.description}</p>
              <p>Start: {new Date(auction.startTime).toLocaleString()}</p>
              <p>End: {new Date(auction.endTime).toLocaleString()}</p>
              <p>Starting Bid: ₹{auction.startingBid}</p>
              <p>Status: {auction.status}</p>

              <div className="button-group">
                <button onClick={() => handleReject(auction.id)} className="reject-btn">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageAuctions;
