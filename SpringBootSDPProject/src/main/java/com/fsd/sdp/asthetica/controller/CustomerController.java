package com.fsd.sdp.asthetica.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.fsd.sdp.asthetica.enumeration.Category;
import com.fsd.sdp.asthetica.model.Artwork;
import com.fsd.sdp.asthetica.model.Auction;
import com.fsd.sdp.asthetica.model.Bid;
import com.fsd.sdp.asthetica.model.User;
import com.fsd.sdp.asthetica.service.ArtworkService;
import com.fsd.sdp.asthetica.service.AuctionService;
import com.fsd.sdp.asthetica.service.BidService;
import com.fsd.sdp.asthetica.service.UserService;
import com.fsd.sdp.asthetica.service.WishlistService;

@RestController
@RequestMapping("/customer")
@CrossOrigin("*")
public class CustomerController {
	@Autowired
	private UserService service;
	@Autowired
	private ArtworkService artworkService;
	@Autowired
	private WishlistService wishlistService;

	@Autowired
    private AuctionService auctionService;

    @Autowired
    private BidService bidService;
    
	@PostMapping("/adduser")
	public String adduser(@RequestBody User user) {
		return service.adduser(user);
	}
	
	@PutMapping("/requestSeller/{id}")
    public ResponseEntity<String> requestToBecomeSeller(@PathVariable int id) {
        String message = service.requestToBecomeSeller(id);
        return ResponseEntity.ok(message);
    }
	
	@GetMapping("/viewallartworks")
	public ResponseEntity<List<Artwork>> viewAllArtworks() {
	    try {
	        List<Artwork> artworkList = artworkService.viewallartworks(); 

	        return ResponseEntity.ok(artworkList);
	    } catch (Exception e) {
	        return ResponseEntity.status(500).body(null);
	    }
	}
	

	@PostMapping("/wishlist/add")
	public ResponseEntity<String> addToWishlist(@RequestParam int userId, @RequestParam int artworkId) {
	    try {
	        wishlistService.addToWishlist(userId, artworkId);
	        return ResponseEntity.ok("Artwork added to wishlist successfully!");
	    } catch (RuntimeException e) {
	        // If the artwork is already in the wishlist, send a custom message
	        return ResponseEntity.status(200).body("Artwork is already in your wishlist.");
	    } catch (Exception e) {
	        return ResponseEntity.status(500).body("Failed to add artwork to wishlist.");
	    }
	}


	  @GetMapping("/wishlist/view/{userId}")
	    public ResponseEntity<Object> viewWishlist(@PathVariable int userId) {
	        try {
	            return ResponseEntity.ok(wishlistService.getWishlistItems(userId));
	        } catch (RuntimeException e) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	        } catch (Exception e) {
	            return ResponseEntity.status(500).body("Failed to fetch wishlist items");
	        }
	    }


	@PutMapping("/wishlist/remove")
	public ResponseEntity<String> removeFromWishlist(@RequestParam int userId, @RequestParam int artworkId) {
	    try {
	        wishlistService.removeFromWishlist(userId, artworkId);
	        return ResponseEntity.ok("Item removed from wishlist successfully!");
	    } catch (RuntimeException e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	    } catch (Exception e) {
	        return ResponseEntity.status(500).body("Failed to remove item from wishlist");
	    }
	}

	@GetMapping("/category")
	public ResponseEntity<?> getByCategory(@RequestParam String category) {
	    try {
	        if (category.equalsIgnoreCase("ALL")) {
	            return ResponseEntity.ok(artworkService.viewallartworks());
	        } else {
	            Category catEnum = Category.valueOf(category.toUpperCase()); // This will throw if invalid
	            return ResponseEntity.ok(artworkService.viewbycategory(catEnum));
	        }
	    } catch (IllegalArgumentException e) {
	        return ResponseEntity.badRequest().body("Invalid category");
	    } catch (Exception e) {
	        return ResponseEntity.status(500).body("Unable to filter by category");
	    }
	}
	
	@GetMapping("/live")
    public List<Auction> getLiveAuctions() {
        return auctionService.getLiveAuctions();
    }

	@PostMapping("/bid")
	public ResponseEntity<String> placeBid(@RequestParam Long auctionId,
	                                       @RequestParam Long buyerId,
	                                       @RequestParam Double amount,
	                                       @RequestParam String buyerName) {
		
											
	    try {
	        bidService.placeBid(auctionId, buyerId, amount,buyerName);
	        return ResponseEntity.ok("Bid placed successfully!");
	    } catch (IllegalArgumentException | IllegalStateException ex) {
	        // Return appropriate error message
	        return ResponseEntity.status(400).body(ex.getMessage());
	    }
	}


    @GetMapping("/bids/{auctionId}")
    public List<Bid> getBids(@PathVariable Long auctionId) {
        return bidService.getBidsForAuction(auctionId);
    }
    
    @GetMapping("/approvedsellers")
    public List<User> getApprovedSellers() {
        return service.getApprovedSellers();
    }


}
