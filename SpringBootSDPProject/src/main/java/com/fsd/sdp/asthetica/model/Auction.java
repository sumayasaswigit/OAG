package com.fsd.sdp.asthetica.model;

import com.fsd.sdp.asthetica.enumeration.AuctionStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "auction_table")
public class Auction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Double startingBid;
    private Double minIncrement;

    @Enumerated(EnumType.STRING)
    private AuctionStatus status;

    private Double highestBid = 0.0;
    private Long highestBidderId;

    @OneToOne
    @JoinColumn(name = "artwork_id")
    private Artwork artwork;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDateTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalDateTime startTime) {
		this.startTime = startTime;
	}

	public LocalDateTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalDateTime endTime) {
		this.endTime = endTime;
	}

	public Double getStartingBid() {
		return startingBid;
	}

	public void setStartingBid(Double startingBid) {
		this.startingBid = startingBid;
	}

	public Double getMinIncrement() {
		return minIncrement;
	}

	public void setMinIncrement(Double minIncrement) {
		this.minIncrement = minIncrement;
	}

	public AuctionStatus getStatus() {
		return status;
	}

	public void setStatus(AuctionStatus status) {
		this.status = status;
	}

	public Double getHighestBid() {
		return highestBid;
	}

	public void setHighestBid(Double highestBid) {
		this.highestBid = highestBid;
	}

	public Long getHighestBidderId() {
		return highestBidderId;
	}

	public void setHighestBidderId(Long highestBidderId) {
		this.highestBidderId = highestBidderId;
	}

	public Artwork getArtwork() {
		return artwork;
	}

	public void setArtwork(Artwork artwork) {
		this.artwork = artwork;
	}
}
