import React from 'react';
import Footer from '../Shared/Footer/Footer';
import AddReview from './AddReview/AddReview';
import AdvertisedItems from './AdvertisedItems/AdvertisedItems';
import Carousel from './Carousel/Carousel';
import Category from './Category/Category';
import ShowRivew from './ShowRivew/ShowRivew';

const Home = () => {
    return (
        <div>
            <Carousel></Carousel>
            <AdvertisedItems />
            <Category />
            <ShowRivew />
            <AddReview />
            <Footer />


        </div>
    );
};

export default Home;