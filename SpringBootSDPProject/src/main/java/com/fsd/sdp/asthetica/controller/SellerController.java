package com.fsd.sdp.asthetica.controller;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.fsd.sdp.asthetica.model.Artwork;
import com.fsd.sdp.asthetica.model.Auction;
import com.fsd.sdp.asthetica.service.ArtworkService;
import com.fsd.sdp.asthetica.service.AuctionService;



@RestController
@RequestMapping("/seller")
@CrossOrigin("*")
public class SellerController 
{

	
	  @Autowired
	    private ArtworkService artworkService;
	  @Autowired
	    private AuctionService auctionService;
	  
	  @PostMapping("/upload")
	  public ResponseEntity<?> uploadArtwork(@RequestBody Artwork artworkRequest) {
	      try {
	          return ResponseEntity.status(200).body(artworkService.addartwork(artworkRequest));
	      } catch (Exception e) {
	          return ResponseEntity.status(500).body("Error: " + e.getMessage());
	      }
	  }

	  @GetMapping("/myartworks")
	  public ResponseEntity<List<Artwork>> viewMyArtworks(@RequestParam int artistId) {
	      List<Artwork> artworkList = artworkService.viewartworksbyartist(artistId);
	      return ResponseEntity.ok(artworkList);
	  }

	  @PostMapping("/request")
	  public Auction requestAuction(@RequestBody Auction auction) {
	      return auctionService.requestAuction(auction, auction.getArtwork());
	  }

	  @PutMapping("/update")
	  public ResponseEntity<String> updateArtwork(@RequestBody Artwork artwork){
		  try {
			  return ResponseEntity.ok(artworkService.updateartwork(artwork));
		  }catch(Exception e) {
			  return ResponseEntity.status(500).body("Unable to update the artwork");
		  }
	  }
	  
	  @GetMapping("/artwork/{aid}")
	  public ResponseEntity<?> getArtwork(@PathVariable int aid){
		  try {
			  return ResponseEntity.ok(artworkService.viewartworkbyid(aid));
		  }catch(Exception e) {
			  return ResponseEntity.status(500).body("Unable to fetch the artwork");
		  }
	  }
}
