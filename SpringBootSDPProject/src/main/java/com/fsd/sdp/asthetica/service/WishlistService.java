package com.fsd.sdp.asthetica.service;

import java.util.List;

import com.fsd.sdp.asthetica.model.Artwork;

public interface WishlistService {
    void addToWishlist(int userId, int artworkId);
    List<Artwork> getWishlistItems(int userId);
    void removeFromWishlist(int userId, int artworkId); 
}
