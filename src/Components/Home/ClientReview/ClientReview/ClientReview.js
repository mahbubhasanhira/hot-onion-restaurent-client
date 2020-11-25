import React, { useEffect, useState } from 'react';
import ReviewCard from '../ReviewCard/ReviewCard';
import loadSpiner from '../../../../hot-onion-restaurent-resources/ICON/loadSpiner.gif';
import Carousel from 'react-elastic-carousel';
import './ClientReview.css';

const ClientReview = () => {

const [allReview, setAllReview] = useState([]);

useEffect(() => {
    fetch('https://hot-onion-101.herokuapp.com/review')
    .then(res => res.json())
    .then(data => setAllReview(data))
    .catch(error =>console.log(error));
},[]);

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 1 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 1, itemsToScroll: 1 }
  ];
    return (
        <section>
            <div className="container">
                <h1 className='text-center'>Clients <span style={{color:'#E70A0A'}}>Feedback</span></h1>
                <div className="row mt-5 mb-5">
                        
                    { allReview.length > 0 ?
                        <Carousel enableAutoPlay  
                        autoPlaySpeed={2000} breakPoints={breakPoints}
                        > 
                            {
                                allReview.map(review => <ReviewCard key={review._id} review={review}/>)
                            }
                        </Carousel>
                        :
                        <div className='text-center w-100'>
                            <img className='loading_spin' src={loadSpiner} alt="loading"/>
                        </div>
                    }
                </div>
            </div>
        </section>
    );
};

export default ClientReview;