import React from 'react';
import './Home.css';
import Blog from '../Blog/Blog';
import Footer from '../Footer/Footer';
import Banner from '../Banner/Banner';
import FoodCategoriesContainer from '../FoodCategoriesContainer/FoodCategoriesContainer';
import ClientReview from '../ClientReview/ClientReview/ClientReview';

const Home = () => {

    return (
        <>
            <Banner/>
            <FoodCategoriesContainer/>
            <Blog/>
            <ClientReview/>
            <Footer/>
        </>
    
    );
};

export default Home;