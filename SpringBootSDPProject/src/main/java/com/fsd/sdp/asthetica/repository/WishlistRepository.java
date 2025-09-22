package com.fsd.sdp.asthetica.repository;

import com.fsd.sdp.asthetica.model.Wishlist;
import com.fsd.sdp.asthetica.model.User;
import com.fsd.sdp.asthetica.model.Artwork;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface WishlistRepository extends JpaRepository<Wishlist, Integer> {
	List<Wishlist> findByUser(User user);
	Optional<Wishlist> findByUserAndArtwork(User user, Artwork artwork);
	Optional<Wishlist> findByUserIdAndArtworkId(int userId, int artworkId);
	boolean existsByUserAndArtwork(User user, Artwork artwork);
	 
}
