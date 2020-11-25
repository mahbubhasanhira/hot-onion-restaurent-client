import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CategoriesMenu from '../CategoriesMenu/CategoriesMenu';
import FoodCard from '../../Common/FoodCard/FoodCard';
import './FoodCategoriesContainer.css';
import { UserContext } from '../../../App';
import loadSpiner from '../../../hot-onion-restaurent-resources/ICON/loadSpiner.gif';

const FoodCategoriesContainer = () => {

    const {allFood, setAllFood, cart} = useContext(UserContext);
    const [foodsCategory, setFoodsCategories] = useState([]);
    const [sliceValue, setSliceValue] = useState(6);
    
    const handleCategories = category => {
        const newFoodCategory = allFood.filter(food => food.category === category)
        setFoodsCategories(newFoodCategory);
        setSliceValue(6);
        //apply css for active categories
        var categoryLink = document.querySelector('.nav_item');
        var nav_link = categoryLink.getElementsByClassName("nav_link");

        for (var i = 0; i < nav_link.length; i++) {
            nav_link[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    };
};
    const handleSliceValue = () => {
        setSliceValue(sliceValue + 6);
    }

useEffect(()=>{
 if(allFood.length > 0){
    setFoodsCategories(allFood);
 }
 if(allFood.length === 0){
    fetch('https://hot-onion-101.herokuapp.com/get_all_food')
    .then(res => res.json())
    .then(data => {
        if(data.length){
            setAllFood(data);
            const newFoodCategory = data.filter(food => food.category === 'Breakfast');
            if(newFoodCategory.length > 0){
                setFoodsCategories(newFoodCategory);
            };
        };
    })
    .catch(err => console.log(err));
 }
},[]);
    
    return (
        <>
            <CategoriesMenu handleCategories={handleCategories}/>
            <div className='container foodCard'>
                {
                    foodsCategory.length > 0 ?
                     foodsCategory.slice(0,sliceValue).map(food => <FoodCard key={food._id} food={food}/>)
                    :
                    <div className='text-center d-flex justify-content-center align-items-center categories_container w-100'>
                        <img className='loading_spin' src={loadSpiner} alt="loading"/>
                    </div>    
                }
            </div>
            {
                sliceValue > foodsCategory.length ?
                    <>
                    </>
                :
                    <>
                        <button onClick={handleSliceValue} className='check_your_food_active'>See More</button><br/>
                    </>
            }
            {
                cart.length > 0 ?
                <Link to='/dashboard/checkout'><button type='button' className='check_your_food_active'>Checkout Your Food</button></Link>:
                <button type='button' disabled className='check_your_food_disabled'>Checkout Your Food</button>
            }
        </>
    );
};

export default FoodCategoriesContainer;