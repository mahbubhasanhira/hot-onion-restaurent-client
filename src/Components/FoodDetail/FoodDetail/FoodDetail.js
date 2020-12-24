import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from '../Carousel/Carousel';
import './FoodDetail.css'
import AddToCartBtn from '../../Common/AddToCartBtn/AddToCartBtn';
import HandleQuantity from '../../Common/HandleQuantity/HandleQuantity';
import loadSpiner from '../../../hot-onion-restaurent-resources/ICON/loadSpiner.gif';

const FoodDetail = () => {
    const {category,foodId} = useParams();
    const [foodDetail, setFoodDetail] = useState({});
    const [foodQuantity, setFoodQuantity] = useState(1);
    const [foodItem, setFoodItem ] = useState([]);

useEffect(() =>{
    fetch(`https://hot-onion-101.herokuapp.com/get_single_food/${category}`)
    .then(res => res.json())
    .then(data =>{
        if(data.length > 0){
            const removeSame = data.filter(item => item._id !== foodId);
            const foodByCategory = removeSame.filter(data => data.category === category);
            setFoodItem(foodByCategory);

            const foodData = data.find(data => data._id === foodId);
            setFoodDetail(foodData);
        }
    })
    .catch(err => console.log(err));
},[category, foodId]);

    return (
        <>
            {foodDetail.name ? 
               
                <div className='container'>
                    <div className="row">
                        <div className='col-md-7 food_detail_img for_smallDevice'>
                            <img src={foodDetail.image_link} alt="food Pic"/>
                        </div>
                        <div className='food_detail_data col-md-5'>
                            <h1>{foodDetail.name}</h1>
                            <p>{foodDetail.description}</p>
                            <div className='d-flex align-items-center justify-content-start'>
                                <h3>${foodDetail.price}</h3>
                                <div className='food_quantity'>
                                    <HandleQuantity foodQuantity={foodQuantity} setFoodQuantity={setFoodQuantity}/>
                                </div>
                            </div>

                            <AddToCartBtn fromCard={false} foodQuantity={foodQuantity} foodPrice={foodDetail.price} foodId={foodId}/>  

                            {
                                foodDetail.category && <Carousel foodItem={foodItem} setFoodQuantity={setFoodQuantity} setFoodDetail={setFoodDetail} category={foodDetail.category}/>
                            }
                        </div>
                        <div className='col-md-7 food_detail_img for_largeDevice'>
                        <img src={foodDetail.image_link} alt="food Pic"/>
                        </div>
                    </div>
                </div>
                :
                <div className='text-center d-flex justify-content-center align-items-center categories_container w-100'>
                    <img className='loading_spin' src={loadSpiner} alt="loading"/>
                </div> 
            }
        </>
    );
};

export default FoodDetail;