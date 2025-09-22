import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import './styles/Auction.css';
import config from '../../config';

function Auctions() {
  const [auctions, setAuctions] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidSuccess, setBidSuccess] = useState('');
  const [bids, setBids] = useState([]);
  const [countdowns, setCountdowns] = useState({});
  const [showModal, setShowModal] = useState(false);

  const buyer = JSON.parse(localStorage.getItem('user'));
  const buyerId = buyer?.id;
  const buyerName = buyer?.name;

  const fetchAuctions = async () => {
    const response = await axios.get(`${config.url}/customer/live`);
    setAuctions(response.data);
  };

  const fetchBids = async (auctionId) => {
    const response = await axios.get(`${config.url}/customer/bids/${auctionId}`);
    setBids(response.data);
  };

  const placeBid = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append('auctionId', selectedAuction.id);
      params.append('buyerId', buyerId);
      params.append('amount', bidAmount);
      params.append('buyerName',buyerName);

      const response = await axios.post(`${config.url}/customer/bid`, params);
      setBidSuccess(response.data);
      setBidAmount('');
      fetchAuctions();
      fetchBids(selectedAuction.id);
    } catch (error) {
      setBidSuccess(error.response?.data || 'Failed to place bid');
    }
  };

  const updateCountdowns = () => {
    const now = new Date();
    const updated = {};
    auctions.forEach((auction) => {
      const end = new Date(auction.endTime);
      const diff = Math.max(0, Math.floor((end - now) / 1000));
      const hours = String(Math.floor(diff / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
      const seconds = String(diff % 60).padStart(2, '0');
      updated[auction.id] = diff <= 0 ? 'Ended' : `${hours}:${minutes}:${seconds}`;
    });
    setCountdowns(updated);
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  useEffect(() => {
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [auctions]);

  return (
    <div className="auction-container">
      <h1 className="auction-header">Live Auctions</h1>

      <div className="auction-grid">
        {auctions.map((auction) => {
          const timeLeft = countdowns[auction.id] || 'Calculating...';
          const ended = timeLeft === 'Ended';

          return (
            <div key={auction.id} className="auction-card">
              <img
                src={auction.artwork?.image}
                alt={auction.artwork?.title}
                className="auction-image"
              />
              <h2 className="auction-title">{auction.artwork?.title}</h2>
              <p className="auction-price">Starting Bid: ₹{auction.startingBid}</p>
              <p className="auction-price bold">Highest Bid: ₹{auction.highestBid}</p>
              <p className="auction-time">Start Date: {format(new Date(auction.startTime), 'PPpp')}</p>
              <p className="auction-time">End Date: {format(new Date(auction.endTime), 'PPpp')}</p>
              <p className="countdown-timer">
                Time Remaining: {timeLeft}
              </p>

              <button
                className="auction-button"
                disabled={ended}
                style={{ opacity: ended ? 0.5 : 1, cursor: ended ? 'not-allowed' : 'pointer' }}
                onClick={() => {
                  setSelectedAuction(auction);
                  fetchBids(auction.id);
                  setBidSuccess('');
                  setShowModal(true);
                }}
              >
                View Bids & Place Bid
              </button>
            </div>
          );
        })}
      </div>

      {selectedAuction && showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="selected-auction-header">
              Bids for "{selectedAuction.artwork?.title}"
            </h2>
            <button className="close-modal" onClick={() => setShowModal(false)}>
              ✕
            </button>
            <div className="bids-section">
              <h3 className="bids-header">Bids for this Auction</h3>
              {bids.length === 0 ? (
                <p>No bids yet.</p>
              ) : (
                bids.map((bid) => (
                  <div key={bid.id} className="bid-item">
                    <span>
                      Bidder: {buyerName && bid.buyerId === buyerId ? buyerName : `ID: ${bid.buyerName}`}
                    </span>
                    <span>Amount: ₹{bid.amount}</span>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={placeBid}>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Enter your bid"
                className="input-bid"
                required
              />
              <button type="submit" className="place-bid-button">
                Place Bid
              </button>
            </form>
            {bidSuccess && <p className="bid-success">{bidSuccess}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Auctions;
