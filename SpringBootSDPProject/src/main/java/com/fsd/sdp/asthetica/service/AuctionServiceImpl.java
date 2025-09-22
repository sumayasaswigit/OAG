package com.fsd.sdp.asthetica.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fsd.sdp.asthetica.enumeration.AuctionStatus;
import com.fsd.sdp.asthetica.model.Auction;
import com.fsd.sdp.asthetica.model.Artwork;
import com.fsd.sdp.asthetica.repository.AuctionRepository;
import com.fsd.sdp.asthetica.repository.ArtworkRepository;

@Service
public class AuctionServiceImpl implements AuctionService {

    @Autowired
    private AuctionRepository auctionRepository;
    
    @Autowired
    private ArtworkRepository artworkRepository;

    @Override
    public Auction requestAuction(Auction auction, Artwork artwork) {
        // Check if the artwork already exists (e.g., based on its ID or other unique properties)
        Artwork existingArtwork = artworkRepository.findById(artwork.getId()).orElse(null);

        if (existingArtwork == null) {
            // If the artwork doesn't exist, save the new artwork
            existingArtwork = artworkRepository.save(artwork);
        }

        // Set the artwork in the auction
        auction.setArtwork(existingArtwork);

        // Set the auction status and initial bid
        auction.setStatus(AuctionStatus.PENDING);
        auction.setHighestBid(auction.getStartingBid());

        // Save the auction
        return auctionRepository.save(auction);
    }

   

    @Override
    public Auction approveAuction(Long auctionId) {
        Optional<Auction> optionalAuction = auctionRepository.findById(auctionId);
        if (optionalAuction.isPresent()) {
            Auction auction = optionalAuction.get();
            auction.setStatus(AuctionStatus.APPROVED);
            return auctionRepository.save(auction);
        }
        throw new RuntimeException("Auction with ID " + auctionId + " not found for approval.");
    }

    @Override
    public Auction rejectAuction(Long auctionId) {
        Optional<Auction> optionalAuction = auctionRepository.findById(auctionId);
        if (optionalAuction.isPresent()) {
            Auction auction = optionalAuction.get();
            auction.setStatus(AuctionStatus.REJECTED);
            return auctionRepository.save(auction);
        }
        throw new RuntimeException("Auction with ID " + auctionId + " not found for rejection.");
    }

    @Override
    public List<Auction> getLiveAuctions() {
        return auctionRepository.findByStatus(AuctionStatus.APPROVED);
    }
    @Override
    public List<Auction> getApprovedAuctions() {
        return auctionRepository.findByStatus(AuctionStatus.APPROVED);
        
    }
    @Override
    public List<Auction> getPendingAuctions() {
        return auctionRepository.findByStatus(AuctionStatus.PENDING);
    }


}
