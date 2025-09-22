import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';
import GavelIcon from '@mui/icons-material/Gavel';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import PublicIcon from '@mui/icons-material/Public';
import GroupsIcon from '@mui/icons-material/Groups';
import VerifiedIcon from '@mui/icons-material/Verified';

// Team members
const team = [
  {
    name: 'SUMA YASASWINI',
    
    img: 'https://media.licdn.com/dms/image/v2/D5603AQEMKFKpjAu99A/profile-displayphoto-shrink_400_400/B56ZT7RamfGQAg-/0/1739382435061?e=1750291200&v=beta&t=n1UCBZsJsCSIVlv1FqFubx4nUtIvO-VfpnQq0Xx5M6c',
  },
  {
    name: 'ROSHINI',
    
    img: 'https://media.licdn.com/dms/image/v2/D4E03AQGa0qNysmoOkA/profile-displayphoto-shrink_800_800/B4EZRLzTCCGYAc-/0/1736438527234?e=1750291200&v=beta&t=X8V_Hi6tC6p5LlCAIHtsKtouskUfi6hbp_RPDeMvytw',
  },
  {
    name: 'SAHITHI',
    
    img: 'https://media.licdn.com/dms/image/v2/D4E03AQGfXAxVAVvxEA/profile-displayphoto-shrink_800_800/B4EZWt2t1dGgAc-/0/1742378558964?e=1750291200&v=beta&t=SFpNiK4dMBbuC1J1cbmqWw_S7fF7uGj640oqCRzmCcM',
  },
];

// What We Offer Section
const offers = [
  {
    icon: <BrushIcon sx={{ fontSize: 40 }} />,
    title: 'Showcase Art',
    desc: 'Upload and display your artwork in a stunning digital gallery.',
  },
  {
    icon: <AccountBoxIcon sx={{ fontSize: 40 }} />,
    title: 'Artist Profiles',
    desc: 'Build your personal brand and share your portfolio.',
  },
  {
    icon: <GavelIcon sx={{ fontSize: 40 }} />,
    title: 'Live Bidding',
    desc: 'Participate in real-time auctions and sell to the highest bidder.',
  },
  {
    icon: <ShoppingCartIcon sx={{ fontSize: 40 }} />,
    title: 'Secure Purchases',
    desc: 'Buy unique art pieces with confidence and security.',
  },
];

// Our Values Section
const values = [
  {
    icon: <EmojiObjectsIcon sx={{ fontSize: 40 }} />,
    title: 'Creativity',
    desc: 'We empower artistic innovation and freedom of expression.',
  },
  {
    icon: <VerifiedIcon sx={{ fontSize: 40 }} />,
    title: 'Integrity',
    desc: 'We build trust through transparency and fairness.',
  },
  {
    icon: <PublicIcon sx={{ fontSize: 40 }} />,
    title: 'Accessibility',
    desc: 'Art for everyone, regardless of geography or background.',
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 40 }} />,
    title: 'Community',
    desc: 'We foster connection between creators and collectors.',
  },
];

const MainAbout = () => {
  return (
    <Box>
      {/* Hero Banner */}
      <Box
        sx={{
          backgroundImage:
            'url(https://c.wallhere.com/photos/c6/ae/1920x1080_px_abstract_artwork_Colorful_digital_art_geometry_Simon_C_Page-777436.jpg!d)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textShadow: '0 0 10px rgba(0,0,0,0.7)',
        }}
      >
        <Typography variant="h2" align="center" fontWeight="bold">
          Welcome to Asthetica
        </Typography>
      </Box>

      {/* Our Story */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom>
          Our Story
        </Typography>
        <Typography variant="body1" align="justify">
          Asthetica is your digital gateway to the world of art. We’re here to connect artists
          and enthusiasts through a beautifully curated platform that supports creativity,
          commerce, and community. Whether you're an emerging artist or an avid collector,
          Asthetica brings art to life through technology.
        </Typography>
      </Container>

      {/* What We Offer */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom>
          What We Offer
        </Typography>
        <Grid container spacing={4} sx={{ flexDirection: 'row', justifyContent: 'center' }}>
          {offers.map((item, i) => (
            <Grid item xs={2} sm={2} md={2} key={i}>
              <Card
                sx={{
                  p: 3,
                  textAlign: 'center',
                  backgroundColor: '#fff',
                  color: '#000',
                  boxShadow: 4,
                  borderRadius: 4,
                  height: '150px',
                  width: '215px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 8,
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>{item.icon}</Box>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2">{item.desc}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Meet the Team */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom align="center">
          Meet the Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {team.map((member, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  backgroundColor: '#fff',
                  color: '#000',
                  height: '200px',
                  width: '215px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Avatar
                  src={member.img}
                  alt={member.name}
                  sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                />
                <Typography variant="h6">{member.name}</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {member.role}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Our Values */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom>
          Our Values
        </Typography>
        <Grid container spacing={4} sx={{ flexDirection: 'row', justifyContent: 'center' }}>
          {values.map((val, i) => (
            <Grid item xs={2} sm={2} md={2} key={i}>
              <Card
                sx={{
                  p: 3,
                  textAlign: 'center',
                  backgroundColor: '#fff',
                  color: '#000',
                  boxShadow: 4,
                  borderRadius: 4,
                  height: '150px',
                  width: '215px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 8,
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>{val.icon}</Box>
                <Typography variant="h6">{val.title}</Typography>
                <Typography variant="body2">{val.desc}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default MainAbout;
