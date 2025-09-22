package com.fsd.sdp.asthetica.service;

import java.util.List;
import java.util.Map;

import com.fsd.sdp.asthetica.enumeration.Category;
import com.fsd.sdp.asthetica.model.Artwork;

public interface ArtworkService 
{
	public String addartwork(Artwork artwork);
	public List<Artwork> viewallartworks();
	public Artwork viewartworkbyid(int id);
	public List<Artwork> viewartworksbyartist(int artistId);
	public List<Artwork> viewbycategory(Category category);
	public boolean deleteartwork(int aid);
	public String updateartwork(Artwork artwork);
	public long displayartworkcount();
	public Map<String, Integer> getCategoryCounts();
	
}
