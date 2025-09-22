import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from './../../config';
import './styles/UploadArtWork.css';
import { toast } from 'react-toastify';

const UploadArtwork = () => {
  const [artwork, setArtwork] = useState({
    title: '',
    artist: '',
    description: '',
    price: '',
    imageUrl: '',
    width: '',
    height: '',
    category: '',
    status: 'AVAILABLE',
  });

  const [artworkImage, setArtworkImage] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
      setArtwork(prev => ({ ...prev, artist: loggedInUser.username }));
    } else {
      setError("You must be logged in to upload artwork.");
    }
  }, []);

  const handleChange = (e) => {
    setArtwork({ ...artwork, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setArtworkImage(e.target.files[0]);
  };

  const uploadImageToCloudinary = async (imageFile) => {
    const data = new FormData();
    data.append('file', imageFile);
    data.append('upload_preset', 'vvz5zgoz');
    data.append('cloud_name', 'dgmk3fhuz');

    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/dgmk3fhuz/image/upload', data);
      return res.data.secure_url;
    } catch (err) {
      console.error('Error uploading image to Cloudinary:', err);
      throw new Error('Image upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to upload artwork.");
      return;
    }

    if (!artwork.title || !artwork.description || !artwork.price || !artwork.width || !artwork.height || !artworkImage) {
      setError("Please fill out all fields and upload an image.");
      return;
    }

    try {
      const imageUrl = await uploadImageToCloudinary(artworkImage);

      const newArtwork = {
        title: artwork.title,
        description: artwork.description,
        price: parseFloat(artwork.price),
        artistId: user.id,
        image: imageUrl,
        width: parseFloat(artwork.width),
        height: parseFloat(artwork.height),
        status: artwork.status,
        category: artwork.category
      };

      const response = await axios.post(`${config.url}/seller/upload`, newArtwork, {
        headers: { 'Content-Type': 'application/json' }
      });

      toast.success(response.data)
      setError("");

      setArtwork({
        title: '',
        artist: '',
        description: '',
        price: '',
        imageUrl: '',
        width: '',
        height: '',
        category:'',
        status: ''
      });
      setArtworkImage(null);

    } catch (error) {
      console.error('Error uploading artwork:', error);
      setMessage("");
      setError(error.message || "An error occurred while uploading artwork.");
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2 className="upload-title">Upload your Artwork here</h2>
        {message && <p className="upload-message success" style={{fontWeight:"700"}}>{message}</p>}
        {error && <p className="upload-message error" style={{fontWeight:"700"}}>{error}</p>}
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="upload-form">
          <input type="text" name="title" value={artwork.title} onChange={handleChange} placeholder="Enter Title" className="upload-input" required />
          <input type="text" name="artist" value={artwork.artist} disabled className="upload-input disabled" />
          <textarea name="description" rows="3" value={artwork.description} onChange={handleChange} placeholder="Description of your artwork" className="upload-textarea" required />
          <input type="number" name="price" value={artwork.price} onChange={handleChange} placeholder="Price" className="upload-input" step="0.01" required />
          <label htmlFor="width">Dimensions</label>
          <input type="number" name="width" value={artwork.width} onChange={handleChange} placeholder="Width (cm)" className="upload-input" step="0.01" required />
          <input type="number" name="height" value={artwork.height} onChange={handleChange} placeholder="Height (cm)" className="upload-input" step="0.01" required />
          <label htmlFor="status">Art status</label>
          <select name="status" value={artwork.status} onChange={handleChange} className="upload-select">
            <option value="" disabled>Select status</option>
            <option value="AVAILABLE">Available</option>
            <option value="SOLD">Sold</option>
            <option value="PENDING">Pending</option>
            <option value="AUCTION">Auction</option>
          </select>
          <label htmlFor="category">Art Category</label>
            <select name="category" value={artwork.category} onChange={handleChange} className="upload-select" required>
              <option value="" disabled>Select a category</option> {/* This prevents empty string from being sent */}
              <option value="POTRAIT">Potrait</option>
              <option value="ABSTRACT">Abstract</option>
              <option value="LANDSCAPE">Landscape</option>
              <option value="HOLISTIC">Holistic</option>
            </select>

          <input type="file" onChange={handleImageChange} className="upload-file" required />
          <button type="submit" className="upload-button">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default UploadArtwork;
