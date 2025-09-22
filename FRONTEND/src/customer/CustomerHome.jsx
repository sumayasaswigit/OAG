import React from 'react';
import HomeCarousel from '../homecomps/HomeCarousel';
import Discover from './Discover';

const CustomerHome = () => {
    return (
        <div>
            <center><h1>Explore wide variety of artworks</h1></center>
            <HomeCarousel/>
            <Discover/>
        </div>
    );
}

export default CustomerHome;
