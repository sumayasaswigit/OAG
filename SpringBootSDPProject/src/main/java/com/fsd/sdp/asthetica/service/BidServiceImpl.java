package com.fsd.sdp.asthetica.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fsd.sdp.asthetica.model.Auction;
import com.fsd.sdp.asthetica.model.Bid;
import com.fsd.sdp.asthetica.repository.AuctionRepository;
import com.fsd.sdp.asthetica.repository.BidRepository;

@Service
public class BidServiceImpl implements BidService {

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private AuctionRepository auctionRepository;

    @Override
    public Bid placeBid(Long auctionId, Long buyerId, Double amount,String buyerName) {
        Optional<Auction> optionalAuction = auctionRepository.findById(auctionId);
        
        if (!optionalAuction.isPresent()) {
            // Auction not found
            throw new IllegalArgumentException("Auction with ID " + auctionId + " does not exist.");
        }

        Auction auction = optionalAuction.get();

        // Check if auction is approved and active
        if (!auction.getStatus().name().equals("APPROVED")) {
            throw new IllegalStateException("Auction with ID " + auctionId + " is not approved.");
        }

        if (LocalDateTime.now().isAfter(auction.getEndTime())) {
            throw new IllegalStateException("Auction with ID " + auctionId + " has already ended.");
        }

        // Check if bid is valid (>= highest bid + minIncrement)
        double minValidBid = auction.getHighestBid() + auction.getMinIncrement();
        if (amount < minValidBid) {
            throw new IllegalArgumentException("Bid amount " + amount + " is less than the minimum required " + minValidBid);
        }

        // ✅ Manual object creation
        Bid bid = new Bid();
        bid.setAuction(auction);
        bid.setBuyerId(buyerId);
        bid.setAmount(amount);
        bid.setBuyerName(buyerName);
        bid.setTimestamp(LocalDateTime.now());

        // Update auction details
        auction.setHighestBid(amount);
        auction.setHighestBidderId(buyerId);
        auctionRepository.save(auction);

        return bidRepository.save(bid);
    }


    @Override
    public List<Bid> getBidsForAuction(Long auctionId) {
        Optional<Auction> optionalAuction = auctionRepository.findById(auctionId);
        if (optionalAuction.isPresent()) {
            return bidRepository.findByAuctionOrderByAmountDesc(optionalAuction.get());
        }
        return null;
    }
}
