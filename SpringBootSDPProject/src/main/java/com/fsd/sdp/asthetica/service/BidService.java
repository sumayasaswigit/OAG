package com.fsd.sdp.asthetica.service;
import java.util.List;
import com.fsd.sdp.asthetica.model.Bid;

public interface BidService 
{
    Bid placeBid(Long auctionId, Long buyerId, Double amount,String buyerName);
    List<Bid> getBidsForAuction(Long auctionId);
}
