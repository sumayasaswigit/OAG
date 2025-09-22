import React from 'react';
import { Card, CardContent, CardOverflow, Typography, AspectRatio } from '@mui/joy';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';


const ArtworkCard = ({ art }) => {
  const navigate = useNavigate();
  const handleClick = (artid) => {
    navigate(`/edit/${artid}`)
  }
  return (
    <Card
      variant="outlined"
      sx={{
        width: 300,
        borderRadius: 'md',
        boxShadow: 'lg',
        transition: '0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 'xl',
        },
      }}
    >
      <CardOverflow>
        <AspectRatio ratio="4/3">
          <img
            src={art.image}
            alt={art.title}
            loading="lazy"
            style={{ objectFit: 'cover' }}
          />
        </AspectRatio>
      </CardOverflow>
      
      <CardContent>
        <Typography level="h5" fontWeight="bold">
          {art.title}
        </Typography>
        <Typography level="body2" color="neutral">
          {art.description.length > 60 ? `${art.description.slice(0, 60)}...` : art.description}
        </Typography>
        
        <Typography level="body1" fontWeight="lg" sx={{ mt: 1, color: 'success.600' }}>
          ₹{art.price}
        </Typography>

        <Typography level="body3" color="neutral" sx={{ mt: 0.5 }}>
          {art.width} x {art.height} cm
        </Typography>
        
        <Typography level="body3" color={art.status === 'Available' ? 'success' : 'danger'}>
          {art.status || 'Unavailable'}
        </Typography>

        {/* <Button onClick={()=>{handleClick(art.id)}} sx={{marginTop:"2px",fontSize:"small",width:"40%", display:"flex",gap:"0.5rem",fontFamily:"Poppins"}} variant="contained">
          <EditIcon sx={{fontSize:"medium"}}/>
          Edit
        </Button> */}
      </CardContent>
    </Card>
  );
};

export default ArtworkCard;
