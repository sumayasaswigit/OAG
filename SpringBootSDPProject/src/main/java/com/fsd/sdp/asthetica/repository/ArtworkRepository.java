package com.fsd.sdp.asthetica.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fsd.sdp.asthetica.model.Artwork;
import com.fsd.sdp.asthetica.enumeration.Category;


public interface ArtworkRepository extends JpaRepository<Artwork, Integer>
{
	 List<Artwork> findByArtistId(int artistId);
	 List<Artwork> findByCategory(Category category);
	 long countByCategory(Category category);

}
