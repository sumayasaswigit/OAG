package com.fsd.sdp.asthetica.repository;

import com.fsd.sdp.asthetica.model.Bid;
import com.fsd.sdp.asthetica.model.Auction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BidRepository extends JpaRepository<Bid, Long> 
{
    List<Bid> findByAuctionOrderByAmountDesc(Auction auction);
}
