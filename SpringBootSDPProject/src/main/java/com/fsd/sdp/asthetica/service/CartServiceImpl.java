package com.fsd.sdp.asthetica.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fsd.sdp.asthetica.model.Artwork;
import com.fsd.sdp.asthetica.model.Cart;
import com.fsd.sdp.asthetica.model.User;
import com.fsd.sdp.asthetica.repository.ArtworkRepository;
import com.fsd.sdp.asthetica.repository.CartRepository;
import com.fsd.sdp.asthetica.repository.UserRepository;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ArtworkRepository artworkRepository;

    @Override
    public Cart addToCart(int userId, int artworkId, int quantity) {
        // Find the user and artwork entities
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Artwork artwork = artworkRepository.findById(artworkId).orElseThrow(() -> new RuntimeException("Artwork not found"));

        // Check if the artwork is already in the cart
        Optional<Cart> existingCart = cartRepository.findByUserAndArtwork(user, artwork);

        if (existingCart.isPresent()) {
            // If artwork already exists in cart, update the quantity
            Cart cartItem = existingCart.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            return cartRepository.save(cartItem);
        } else {
            // Otherwise, create a new cart entry
            Cart cartItem = new Cart();
            cartItem.setUser(user);
            cartItem.setArtwork(artwork);
            cartItem.setQuantity(quantity);
            return cartRepository.save(cartItem);
        }
    }

    @Override
    public List<Cart> getCartItems(int userId) {
        // Find the user entity
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return cartRepository.findByUser(user);
    }

    @Override
    public Cart updateQuantity(int cartId, int quantity) {
        // Find the cart item by its ID
        Cart cartItem = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart item not found"));
        cartItem.setQuantity(quantity);
        return cartRepository.save(cartItem);
    }

    @Override
    public void removeFromCart(int cartId) {
        // Remove the cart item by its ID
        cartRepository.deleteById(cartId);
    }

    @Override
    public void clearCart(int userId) {
        // Find the user and remove all their cart items
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        List<Cart> cartItems = cartRepository.findByUser(user);
        cartRepository.deleteAll(cartItems);
    }
}
