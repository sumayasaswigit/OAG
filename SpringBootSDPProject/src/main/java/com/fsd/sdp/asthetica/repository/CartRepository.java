package com.fsd.sdp.asthetica.repository;

import com.fsd.sdp.asthetica.model.Cart; 
import com.fsd.sdp.asthetica.model.User;
import com.fsd.sdp.asthetica.model.Artwork;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    List<Cart> findByUser(User user);
    Optional<Cart> findByUserAndArtwork(User user, Artwork artwork);
}
