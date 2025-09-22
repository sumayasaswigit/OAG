package com.fsd.sdp.asthetica.service;
import java.util.List;

import com.fsd.sdp.asthetica.model.Artwork;
import com.fsd.sdp.asthetica.model.Auction;

public interface AuctionService 
{
   public Auction requestAuction(Auction auction, Artwork artwork);
   public  Auction approveAuction(Long auctionId);
   public  Auction rejectAuction(Long auctionId);
   public  List<Auction> getLiveAuctions();
   public List<Auction> getApprovedAuctions();
   public List<Auction> getPendingAuctions();
}
