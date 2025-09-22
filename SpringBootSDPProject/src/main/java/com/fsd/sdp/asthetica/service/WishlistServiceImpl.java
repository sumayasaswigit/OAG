package com.fsd.sdp.asthetica.service;

import java.util.List; 
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.fsd.sdp.asthetica.model.Artwork;
import com.fsd.sdp.asthetica.model.User;
import com.fsd.sdp.asthetica.model.Wishlist;
import com.fsd.sdp.asthetica.repository.ArtworkRepository;
import com.fsd.sdp.asthetica.repository.UserRepository;
import com.fsd.sdp.asthetica.repository.WishlistRepository;

@Service
public class WishlistServiceImpl implements WishlistService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ArtworkRepository artworkRepository;

    @Autowired
    private WishlistRepository wishlistRepository;

    @Override
    public void addToWishlist(int userId, int artworkId) {
        // Fetch the user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch the artwork
        Artwork artwork = artworkRepository.findById(artworkId)
                .orElseThrow(() -> new RuntimeException("Artwork not found"));

        // Check if the artwork is already in the user's wishlist
        if (wishlistRepository.existsByUserAndArtwork(user, artwork)) {
            // Instead of throwing an exception, simply return and do nothing
            return;
        }

        // If not, add the artwork to the wishlist
        Wishlist wishlistItem = new Wishlist();
        wishlistItem.setUser(user);
        wishlistItem.setArtwork(artwork);
        wishlistRepository.save(wishlistItem);
    }


    @Override
    public List<Artwork> getWishlistItems(int userId) {
        User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

        List<Wishlist> wishlistItems = wishlistRepository.findByUser(user);


        return wishlistItems.stream()
                .map(Wishlist::getArtwork) 
                .collect(Collectors.toList());
    }

    
    @Override
    public void removeFromWishlist(int userId, int artworkId) {
        Optional<Wishlist> wishlistItem = wishlistRepository.findByUserIdAndArtworkId(userId, artworkId);
        
        if (!wishlistItem.isPresent()) {
            throw new RuntimeException("Wishlist item not found for this user and artwork");
        }

        wishlistRepository.delete(wishlistItem.get());
    }



}
