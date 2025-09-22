package com.fsd.sdp.asthetica.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fsd.sdp.asthetica.enumeration.Category;
import com.fsd.sdp.asthetica.model.Artwork;
import com.fsd.sdp.asthetica.repository.ArtworkRepository;

@Service
public class ArtworkServiceImpl implements ArtworkService 
{
	@Autowired
	private ArtworkRepository artworkRepository;

	@Override
	public String addartwork(Artwork artwork) 
	{
		artworkRepository.save(artwork);
		return "Artwork added Successfully";
	}

	@Override
	public List<Artwork> viewallartworks() 
	{
		return artworkRepository.findAll();
	}

	@Override
	public Artwork viewartworkbyid(int id) 
	{
		 return artworkRepository.findById(id).orElse(null);
	}

	@Override
	public List<Artwork> viewartworksbyartist(int artistId) 
	{
		return artworkRepository.findByArtistId(artistId);
	}

	@Override
	public List<Artwork> viewbycategory(Category category) {
		return artworkRepository.findByCategory(category);
	}

	@Override
	public boolean deleteartwork(int aid) {
	    Optional<Artwork> obj = artworkRepository.findById(aid);
	    if (obj.isPresent()) {
	        artworkRepository.delete(obj.get());
	        return true;
	    }
	    return false;
	}


	
	@Override
	public long displayartworkcount() {
		return artworkRepository.count();
	}
	
	 @Override
	    public Map<String, Integer> getCategoryCounts() {
	        Map<String, Integer> counts = new HashMap<>();
	        for (Category category : Category.values()) {
	            int count = (int) artworkRepository.countByCategory(category);
	            counts.put(category.name(), count);
	        }
	        return counts;
	    }

	@Override
	public String updateartwork(Artwork artwork) {
		Optional<Artwork> obj = artworkRepository.findById(artwork.getId());
		if(obj.isPresent()) {
			Artwork a = obj.get();
			a.setHeight(artwork.getHeight());
			a.setWidth(artwork.getWidth());
			a.setPrice(artwork.getPrice());
			a.setDescription(artwork.getDescription());
			a.setStatus(artwork.getStatus());
			a.setTitle(artwork.getTitle());
			
			artworkRepository.save(a);
			return "Artwork updated successfully !";
		}else {
			return "Artwork Not found";
		}
		
	}

}
