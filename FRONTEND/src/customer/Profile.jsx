import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import { useAuth } from '../contextapi/AuthContext';
import { TextField, Button } from '@mui/material';
import './styles/Profile.css';
import defaultUserImage from '../assets/default-user.jpg'; // <-- Add this image
import { Avatar, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const Profile = () => {
  const { username } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    contact: "",
    profileImage: "", // Added
  });
  const [userId, setUserId] = useState(null);
  const [sellerRequestStatus, setSellerRequestStatus] = useState("");
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [imageError, setImageError] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setError("");
    setMessage("");
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'fpfjo2h5');
    data.append('cloud_name', 'dgmk3fhuz');
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgmk3fhuz/image/upload",
        data
      );
      const imageUrl = response.data.secure_url;
      setFormData({ ...formData, profileImage: imageUrl });
      setImageError(false);
      setMessage("Image uploaded successfully.");
    } catch (err) {
      setError("Image upload failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${config.url}/user/updateprofile`, formData);
      if (response.status === 200) {
        setMessage("Profile updated successfully.");
      } else {
        setError("Failed to update profile.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Unexpected Error");
    }
  };

  const handleSellerRequest = async () => {
    try {
      const response = await axios.put(`${config.url}/customer/requestSeller/${userId}`);
      if (response.status === 200) {
        setMessage(response.data);
        setSellerRequestStatus("PENDING");
      } else {
        setError("Failed to submit seller request.");
      }
    } catch (err) {
      setError(err.response?.data || "Error while requesting seller access.");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${config.url}/user/getprofile?username=${username}`);
        if (response.status === 200) {
          setFormData(response.data);
          setUserId(response.data.id);
          setSellerRequestStatus(response.data.sellerRequestStatus || "");
        } else {
          setMessage("Failed to load profile.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Unexpected Error");
      }
    };

    fetchProfile();
  }, [username]);

  return (
    <div className="profile-form">
      <center><h2>User Profile</h2></center>

      {/* Profile Image */}
      <div className="profile-image">
      <center>
  <div style={{ position: 'relative', display: 'inline-block', marginBottom: 20 }}>
    <Avatar
      src={!imageError && formData.profileImage ? formData.profileImage : defaultUserImage}
      alt="Profile"
      sx={{ width: 100, height: 100 }}
      onError={() => setImageError(true)}
    />

    <input
      type="file"
      accept="image/*"
      id="profile-image-upload"
      style={{ display: 'none' }}
      onChange={handleImageUpload}
    />

    <Tooltip title="Edit">
      <IconButton
        component="label"
        htmlFor="profile-image-upload"
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

      {error ? (
        <center><p className="error">{error}</p></center>
      ) : (
        <div>
          <center>{message && <p className="message">{message}</p>}</center>
          <form className="form-control" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <TextField id="name" variant="filled" value={formData.name} onChange={handleChange} />

            <label htmlFor="email">Email</label>
            <TextField id="email" variant="filled" value={formData.email} onChange={handleChange} />

            <label htmlFor="role">Role</label>
            <TextField id="role" variant="filled" value={formData.role} disabled />

            <label htmlFor="contact">Contact</label>
            <TextField id="contact" variant="filled" value={formData.contact} onChange={handleChange} />

            <div className="form-btn">
              <Button variant="outlined" type="button">Cancel</Button>
              <Button variant="contained" type="submit">Save</Button>
            </div>
          </form>

          {formData.role === "BUYER" && sellerRequestStatus !== "PENDING" && (
            <center style={{ marginTop: "20px" }}>
              <Button variant="outlined" color="primary" onClick={handleSellerRequest}>
                Request to Become a Seller
              </Button>
            </center>
          )}

          {formData.role === "BUYER" && sellerRequestStatus === "PENDING" && (
            <center style={{ marginTop: "20px", color: "orange" }}>
              <p>Seller request status: <strong>PENDING</strong></p>
            </center>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
