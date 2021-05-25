import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import loadSpiner from '../../../hot-onion-restaurent-resources/ICON/loadSpiner.gif';
import FoodCard from '../../Common/FoodCard/FoodCard';
import CategoriesMenu from '../CategoriesMenu/CategoriesMenu';
import './FoodCategoriesContainer.css';

const FoodCategoriesContainer = () => {

    const {allFood, setAllFood, cart} = useContext(UserContext);
    const [foodsCategory, setFoodsCategories] = useState([]);
    const [sliceValue, setSliceValue] = useState(6);
    const [classCat, setClassCat] = useState('All');


const handleFilterProduct = product => {
    const newFoodCategory = allFood.filter(food => food.category === product);
    if(newFoodCategory.length > 0){
     setFoodsCategories(newFoodCategory);
     return true;
    }
    if(newFoodCategory.length === 0){
     setFoodsCategories(allFood);
     return false;
    }
}

    const handleCategories = category => {
        setSliceValue(6);
        setClassCat(category);
        handleFilterProduct(category);
    };

useEffect(()=>{
    const sessionClassCat = JSON.parse(localStorage.getItem('classCat'));
    if(sessionClassCat){
        setClassCat(sessionClassCat);
    }
    if(allFood.length > 0){
        setFoodsCategories(allFood);
        handleFilterProduct(sessionClassCat);
    }
 if(allFood.length === 0){
    fetch('https://hot-onion-101.herokuapp.com/get_all_food')
    .then(res => res.json())
    .then(data => {
        if(data.length){
            setAllFood(data);
            const newFoodCategory = data.filter(food => food.category === sessionClassCat);
            if(newFoodCategory.length > 0){
                setFoodsCategories(newFoodCategory);
            };
            if(newFoodCategory.length === 0){
                setFoodsCategories(data);
            }
        };
    })
    .catch(err => console.log(err));
 }
},[]);
    return (
        <>
            <CategoriesMenu classCat={classCat} handleCategories={handleCategories}/>
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
                        <button onClick={() => setSliceValue(sliceValue + 6)} className='check_your_food_active'>See More</button><br/>
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