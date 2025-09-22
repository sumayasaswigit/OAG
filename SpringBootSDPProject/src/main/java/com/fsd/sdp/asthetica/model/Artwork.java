package com.fsd.sdp.asthetica.model;


import com.fsd.sdp.asthetica.enumeration.Category;

import com.fsd.sdp.asthetica.enumeration.Status;

import jakarta.persistence.*;

@Entity
@Table(name = "artwork_table")
public class Artwork
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "artwork_id")
    private int id;
    
    @Column(name = "artwork_title", nullable = false, length = 100)
    private String title;
    
    @Column(name = "artwork_description", nullable = false, length = 500)
    private String description;
    
    @Column(nullable = false)
    private Double width; 

    @Column(nullable = false)
    private Double height; 

    
    @Column(name = "artwork_price", nullable = false)
    private double price;
    
    @Column(name = "artwork_image", nullable = false)
    private String image;
    
    
    @Enumerated(EnumType.STRING) // Store the enum as a string in the DB
    @Column(nullable = false)
    private Status status; // Enum for artwork status

    
    @Column(name = "artist_id", nullable = false)
    private int artistId;  // Store the user_id who uploaded this artwork
    
    @Enumerated(EnumType.STRING)
    @Column(name="artwork_category", nullable=false)
    private Category category;

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    
    
    public int getArtistId() { return artistId; }
    public void setArtistId(int artistId) { this.artistId = artistId; }
    
    
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public Double getWidth() {
		return width;
	}
	public void setWidth(Double width) {
		this.width = width;
	}
	public Double getHeight() {
		return height;
	}
	public void setHeight(Double height) {
		this.height = height;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	public Category getCategory() {
		return category;
	}
	public void setCategory(Category category) {
		this.category = category;
	}
}
