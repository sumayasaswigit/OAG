package com.fsd.sdp.asthetica.controller;


import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fsd.sdp.asthetica.model.Artwork;
import com.fsd.sdp.asthetica.model.Auction;
import com.fsd.sdp.asthetica.model.Order;
import com.fsd.sdp.asthetica.model.User;
import com.fsd.sdp.asthetica.service.ArtworkService;
import com.fsd.sdp.asthetica.service.AuctionService;
import com.fsd.sdp.asthetica.service.UserService;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {
	@Autowired
	private UserService service;
	
	@Autowired
	private ArtworkService artworkService;
	
	 @Autowired
	    private AuctionService auctionService;
	
	@GetMapping("/viewallusers")
	public ResponseEntity<List<User>> viewallusers(){
		List<User> users=service.displayusers();
		return ResponseEntity.ok(users);
	}
	
	@DeleteMapping("/deleteuser")
	public ResponseEntity<String> deleteuser(@RequestParam int cid){
		try {
			String output=service.deleteuser(cid);
			return ResponseEntity.ok(output);
		}catch(Exception e) {
			return ResponseEntity.status(500).body("Failed to Delete User!");
		}
	}
	
	@GetMapping("/sellerRequests")
    public List<User> getAllSellerRequests() {
        return service.displayallsellerrequest();
    }
	
	@PutMapping("/approveSeller/{id}")
    public ResponseEntity<String> approveSeller(@PathVariable int id) {
        String result = service.approveseller(id);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/rejectSeller/{id}")
    public ResponseEntity<String> rejectSeller(@PathVariable int id) {
        String result = service.rejectseller(id);
        return ResponseEntity.ok(result);
    }
    
    @PutMapping("/removeseller/{id}")
    public ResponseEntity<String> removeSeller(@PathVariable int id) {
        try {
            String result = service.removeseller(id);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
    
    @GetMapping("/buyercount")
    public long getBuyerCount() {
        return service.displaybuyercount();
    }

    @GetMapping("/sellercount")
    public long getSellerCount() {
        return service.displaysellercount();
    }
    
    @GetMapping("/artworkcount")
    public long getArtworkCount() {
    	return artworkService.displayartworkcount();
    }

    @GetMapping("/viewbyid/{aid}")
    public ResponseEntity<List<Artwork>> viewbyartist(@PathVariable int aid) {
      try {
        return ResponseEntity.ok(artworkService.viewartworksbyartist(aid));
      } catch (Exception e) {
        return ResponseEntity.status(500).body(Collections.emptyList());
      }
    }

    @DeleteMapping("/deleteart/{aid}")
    public ResponseEntity<String> deletebyID(@PathVariable int aid) {
        boolean deleted = artworkService.deleteartwork(aid);
        if (deleted) {
            return ResponseEntity.ok("Artwork successfully deleted");
        } else {
            return ResponseEntity.status(404).body("Artwork not found");
        }
    }
    
    
    @GetMapping("/pending")
    public List<Auction> viewPendingAuctions() {
        return auctionService.getPendingAuctions();
    }

    @PutMapping("/approve/{id}")
    public Auction approveAuction(@PathVariable Long id) {
        return auctionService.approveAuction(id);
    }

    @PutMapping("/reject/{id}")
    public Auction rejectAuction(@PathVariable Long id) {
        return auctionService.rejectAuction(id);
    }
    @GetMapping("/approved")
    public List<Auction> viewApprovedAuctions() {
        return auctionService.getApprovedAuctions();
    }

    
    
    @GetMapping("/categorycounts")
    public Map<String, Integer> getCategoryCounts() {
        return artworkService.getCategoryCounts();
    }
    
    @GetMapping("/ordersviewall")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = service.getAllOrders(); // Use your service layer
        return ResponseEntity.ok(orders);
    }


    
}
