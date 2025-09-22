import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../../config';

const PoppinsTypography = styled(Typography)({
  fontFamily: 'Poppins, sans-serif',
});

const ViewProduct = () => {
  const [artist, setArtist] = useState('');
  const [artworks, setArtworks] = useState([]);
  const { id } = useParams();
  const username = localStorage.getItem('username');
  let isCustomerLoggedIn = sessionStorage.getItem('isCustomerLoggedIn') === 'true';

  // Fallback: If isCustomerLoggedIn is not set in sessionStorage, infer from username
  if (!isCustomerLoggedIn && username) {
    isCustomerLoggedIn = true;
    sessionStorage.setItem('isCustomerLoggedIn', 'true');
  }

  // Fetch artworks
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const storedArtworks = JSON.parse(sessionStorage.getItem('artworks'));
        if (storedArtworks && Array.isArray(storedArtworks)) {
          setArtworks(storedArtworks);
        } else {
          const response = await axios.get(`${config.url}/artworks`);
          const fetchedArtworks = response.data;
          sessionStorage.setItem('artworks', JSON.stringify(fetchedArtworks));
          setArtworks(fetchedArtworks);
        }
      } catch (err) {
        toast.error('Failed to load artworks.');
      }
    };

    fetchArtworks();
  }, []);

  const painting = artworks.find((art) => art.id.toString() === id);

  // Fetch artist
  useEffect(() => {
    if (!painting) return;

    const handleArtist = async (artistId) => {
      try {
        const response = await axios.get(`${config.url}/user/getusername/${artistId}`);
        setArtist(response.data);
      } catch (err) {
        toast.error(err.message);
      }
    };

    handleArtist(painting.artistId);
  }, [painting?.artistId]);

  // Early returns
  if (!Array.isArray(artworks) || artworks.length === 0) {
    return <PoppinsTypography variant="h6">Loading artwork details...</PoppinsTypography>;
  }

  if (!painting) {
    return <PoppinsTypography variant="h6">Artwork not found.</PoppinsTypography>;
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        console.log('Razorpay script loaded successfully');
        resolve(true);
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay script');
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleBuyNow = async () => {
    if (!isCustomerLoggedIn || !username) {
      toast.error('Please log in to proceed with purchase.');
      return;
    }

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      toast.error('Failed to load Razorpay SDK.');
      return;
    }

    try {
      const orderRes = await axios.post(
        `${config.url}/api/payment/create-order/${id}?username=${username}&amount=${painting.price}`
      );
      const { orderId, amount, currency } = orderRes.data;

      const options = {
        key: 'rzp_test_rwXqAuEXwJyhk5',
        amount,
        currency,
        name: 'Asthetica',
        description: painting.title,
        order_id: orderId,
        handler: async (response) => {
          try {
            const verifyPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              username,
              artwork_id: id,
              amount: painting.price // Add amount to the payload
            };

            const verifyRes = await axios.post(`${config.url}/api/payment/verify`, verifyPayload);

            if (verifyRes.data === 'Payment verified') {
              toast.success('Payment successful!');
            } else {
              toast.error('Payment verification failed!');
            }
          } catch (err) {
            const errorMessage = err.response?.data || 'Verification failed. Try again.';
            toast.error(errorMessage);
          }
        },
        prefill: {
          name: username,
          email: 'user@example.com',
          contact: '9866166825',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      const errorMessage = err.response?.data || 'Payment initiation failed.';
      toast.error(errorMessage);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: '1200px',
        margin: '2rem auto',
        border: '2px solid #ccc',
        borderRadius: '12px',
        padding: { xs: '1rem', sm: '1.5rem', md: '2rem' },
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on mobile
        gap: { xs: '1rem', sm: '2rem' }, // Responsive gap
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          width: { xs: '100%', sm: '400px' }, // Full width on mobile, fixed width on larger screens
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={painting.image}
          alt={painting.title}
          style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        />
      </Box>

      {/* Details Section */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: { xs: '1rem', sm: '1.5rem', md: '2rem' },
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        }}
      >
        <PoppinsTypography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, // Responsive font size
          }}
        >
          {painting.title}
        </PoppinsTypography>
        <PoppinsTypography
          variant="subtitle1"
          color="textSecondary"
          sx={{
            fontSize: { xs: '0.9rem', sm: '1rem' },
          }}
        >
          By: {artist}
        </PoppinsTypography>
        <PoppinsTypography
          variant="h5"
          color="green"
          sx={{
            mt: 2,
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
          }}
        >
          ₹{painting.price.toLocaleString()}
        </PoppinsTypography>
        <PoppinsTypography
          variant="body1"
          sx={{
            mt: 2,
            fontSize: { xs: '0.875rem', sm: '1rem' },
          }}
        >
          {painting.description}
        </PoppinsTypography>
        <PoppinsTypography
          variant="body2"
          sx={{
            mt: 2,
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
          }}
        >
          Dimensions: {painting.height} x {painting.width} cm
        </PoppinsTypography>
        <PoppinsTypography
          variant="body2"
          sx={{
            mt: 1,
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
          }}
        >
          Category: {painting.category}
        </PoppinsTypography>
        <PoppinsTypography
          variant="body2"
          sx={{
            mt: 1,
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
          }}
        >
          Status: <strong>{painting.status}</strong>
        </PoppinsTypography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 3,
            borderRadius: 2,
            fontWeight: 'bold',
            padding: { xs: '0.75rem 1.5rem', sm: '0.75rem 2rem' },
            fontSize: { xs: '0.875rem', sm: '1rem' },
            width: { xs: '100%', sm: 'auto' }, 
          }}
          onClick={handleBuyNow}
        >
          Buy Now
        </Button>
      </Box>
    </Box>
  );
};

export default ViewProduct;