package com.fsd.sdp.asthetica.repository;

import com.fsd.sdp.asthetica.enumeration.AuctionStatus;
import com.fsd.sdp.asthetica.model.Auction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AuctionRepository extends JpaRepository<Auction, Long> 
{
    List<Auction> findByStatus(AuctionStatus status);
}
