import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import { useAuth } from '../contextapi/AuthContext';
import { TextField, Button, Avatar, IconButton, Tooltip, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import defaultArtworkImage from '../assets/default-user.jpg'; // Placeholder image for artwork
import './styles/Profile.css'; // Reusing Profile.css for consistent styling
import { useParams, useNavigate } from 'react-router-dom';

const EditArtwork = () => {
  const { id } = useParams(); // Get artwork ID from URL
  const { username } = useAuth(); // Get logged-in user
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    price: '',
    width: '',
    height: '',
    status: '',
    image: '', // For display and separate image update
    artistId: '', // Non-editable
    category: '', // Non-editable
  });
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch artwork data and user info
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch user data to ensure the user is logged in and get user ID
        const userResponse = await axios.get(`${config.url}/user/getprofile?username=${username}`);
        if (userResponse.status === 200) {
          setUserId(userResponse.data.id);
        } else {
          setError("Failed to load user profile.");
          setLoading(false);
          return;
        }

        // Fetch artwork data
        const artworkResponse = await axios.get(`${config.url}/artwork/${id}`);
        if (artworkResponse.status === 200) {
          const artworkData = artworkResponse.data;
          // Verify the user is the artist
          if (artworkData.artistId !== userResponse.data.id) {
            setError("You are not authorized to edit this artwork.");
            setLoading(false);
            return;
          }
          setFormData({
            id: artworkData.id,
            title: artworkData.title,
            description: artworkData.description,
            price: artworkData.price,
            width: artworkData.width,
            height: artworkData.height,
            status: artworkData.status,
            image: artworkData.image,
            artistId: artworkData.artistId,
            category: artworkData.category,
          });
        } else {
          setError("Failed to load artwork.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || "Failed to fetch artwork data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, username]);

  const handleChange = (e) => {
    const { id, value, name } = e.target;
    setFormData({ ...formData, [name || id]: value });
    setError('');
    setMessage('');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'fpfjo2h5'); // Same preset as Profile component
    data.append('cloud_name', 'dgmk3fhuz');
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgmk3fhuz/image/upload",
        data
      );
      const imageUrl = response.data.secure_url;
      // Since the updateartwork method doesn't update the image, we need a separate endpoint or logic
      // For now, update the formData and handle image update separately if needed
      setFormData({ ...formData, image: imageUrl });
      setImageError(false);
      setMessage("Image uploaded successfully.");
    } catch (err) {
      setError("Image upload failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setError("You must be logged in to edit artwork.");
      return;
    }

    if (!formData.title || !formData.description || !formData.price || !formData.width || !formData.height) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      const updatedArtwork = {
        id: formData.id,
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        width: parseFloat(formData.width),
        height: parseFloat(formData.height),
        status: formData.status,
        artistId: formData.artistId, // Required field, but not updated
        image: formData.image, // Required field, but not updated by updateartwork
        category: formData.category, // Required field, but not updated
      };

      const response = await axios.put(`${config.url}/update`, updatedArtwork);
      if (response.status === 200) {
        setMessage(response.data); // "Artwork updated successfully !"
      } else {
        setError("Failed to update artwork.");
      }
    } catch (err) {
      console.error("Error updating artwork:", err);
      setError(err.response?.data?.message || "Failed to update artwork");
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return (
      <div className="profile-form">
        <center><h2>Loading...</h2></center>
      </div>
    );
  }

  return (
    <div className="profile-form">
      <center><h2>Edit Artwork</h2></center>

      {error ? (
        <center><p className="error">{typeof error === 'string' ? error : 'An error occurred'}</p></center>
      ) : (
        <div>
          {message && <center><p className="message">{message}</p></center>}
          
          {/* Artwork Image */}
          <div className="profile-image">
            <center>
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: 20 }}>
                <Avatar
                  src={!imageError && formData.image ? formData.image : defaultArtworkImage}
                  alt="Artwork"
                  sx={{ width: 100, height: 100 }}
                  onError={() => setImageError(true)}
                />
                <input
                  type="file"
                  accept="image/*"
                  id="artwork-image-upload"
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                />
                <Tooltip title="Edit Image">
                  <IconButton
                    component="label"
                    htmlFor="artwork-image-upload"
                    size="small"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      backgroundColor: 'white',
                      boxShadow: 1,
                      '&:hover': {
                        backgroundColor: '#f0f0f0'
                      }
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
            </center>
          </div>

          <form className="form-control" onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <TextField
              id="title"
              name="title"
              variant="filled"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <label htmlFor="description">Description</label>
            <TextField
              id="description"
              name="description"
              variant="filled"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              required
            />

            <label htmlFor="price">Price</label>
            <TextField
              id="price"
              name="price"
              variant="filled"
              type="number"
              value={formData.price}
              onChange={handleChange}
              inputProps={{ step: "0.01" }}
              required
            />

            <label htmlFor="width">Width (cm)</label>
            <TextField
              id="width"
              name="width"
              variant="filled"
              type="number"
              value={formData.width}
              onChange={handleChange}
              inputProps={{ step: "0.01" }}
              required
            />

            <label htmlFor="height">Height (cm)</label>
            <TextField
              id="height"
              name="height"
              variant="filled"
              type="number"
              value={formData.height}
              onChange={handleChange}
              inputProps={{ step: "0.01" }}
              required
            />

            <label htmlFor="status">Status</label>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <MenuItem value="AVAILABLE">Available</MenuItem>
                <MenuItem value="SOLD">Sold</MenuItem>
                <MenuItem value="PENDING">Pending</MenuItem>
                <MenuItem value="AUCTION">Auction</MenuItem>
              </Select>
            </FormControl>

            <label htmlFor="category">Category</label>
            <TextField
              id="category"
              name="category"
              variant="filled"
              value={formData.category}
              disabled
            />

            <div className="form-btn">
              <Button variant="outlined" type="button" onClick={handleCancel}>Cancel</Button>
              <Button variant="contained" type="submit">Update Artwork</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditArtwork;