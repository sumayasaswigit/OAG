import React from 'react';
import HomeCarousel from '../homecomps/HomeCarousel';
import Discover from '../customer/Discover';

const MainHome = () => {
    return (
        <div>
            <center><h1>Explore Artworks of your taste</h1></center>
            <HomeCarousel/>
            <Discover/>
        </div>
    );
}

export default MainHome;
