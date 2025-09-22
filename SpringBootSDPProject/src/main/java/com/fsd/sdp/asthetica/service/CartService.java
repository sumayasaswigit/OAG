package com.fsd.sdp.asthetica.service;

import com.fsd.sdp.asthetica.model.Cart;

import java.util.List;

public interface CartService {
    // Add an artwork to the cart (or update quantity if already in the cart)
    Cart addToCart(int userId, int artworkId, int quantity);
    
    // Get all items in a user's cart
    List<Cart> getCartItems(int userId);
    
    // Update the quantity of an item in the cart
    Cart updateQuantity(int cartId, int quantity);
    
    // Remove an item from the cart
    void removeFromCart(int cartId);
    
    // Clear all items in the cart for a user (optional feature)
    void clearCart(int userId);
}
