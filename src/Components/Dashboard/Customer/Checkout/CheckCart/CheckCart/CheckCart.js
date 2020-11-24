import React, { useContext, useEffect, useState } from 'react';
import CheckoutFoodCard from './../CheckoutFoodCard/CheckoutFoodCard';
import './CheckCart.css';
import loadSpiner from '../../../../../../hot-onion-restaurent-resources/ICON/loadSpiner.gif';
import { UserContext } from '../../../../../../App';

const CheckCart = ({shippingData, setCheckCart}) => {

const {cart, allFood} = useContext(UserContext);
const [cartFoodDetail, setCartFoodDetail] = useState([]);
const [idAndQuantity, setIdAndQuantity] = useState([]);

    let totalFoodLength = 0;
    let subtotal = 0;
    let tax = 0;
    let delivery = 10;
    let total = 0;

    let CheckCartFinalData = {
        totalFoodMoneyDetail:{},
        foodData:[]
    };
  
    if(idAndQuantity.length){
        const individualFoodData = idAndQuantity.map(eachFood => {
            const latestFoodData = {
                _id: eachFood._id,
                price: Number(eachFood.quantity) * Number(eachFood.price),
                quantity:eachFood.quantity,
            };
            return latestFoodData;
        });

        const priceCalculation = individualFoodData.map(food => food.price);
        const subtotalCalculate = priceCalculation.reduce((acc, curr) => Number(acc) + Number(curr), 0);
        subtotal = Number(subtotalCalculate);
        tax = (subtotal * 5) / 100;
        total = subtotal +  tax + delivery;
        //total FoodLength
        const getQuantity = idAndQuantity.map(food =>  food.quantity);
        totalFoodLength = getQuantity.reduce((acc, curr) => acc + curr, 0);
       
        //cart product Detail for Database
        CheckCartFinalData.foodData = individualFoodData;

        //cart totalFoodMoneyDetail for Database
        CheckCartFinalData.totalFoodMoneyDetail = {
            totalFoodQuantity: totalFoodLength,
            subtotalAmount:subtotal,
            taxAmount: tax,
            deliveryAmount: delivery,
            totalAmount: total,
        };
    };

const handleConfirm = () => {
    setCheckCart(CheckCartFinalData);
};

const handleSetCartFoodDetail = FoodData => {
    if(FoodData.length){
        const cartFood = cart.map(food => {
            const matchedFood = FoodData.find(singleFood => singleFood._id === food._id);
            const getFood = {...matchedFood};
            getFood.quantity = food.quantity;
            return getFood;
        });
        if(cartFood.length){
            setCartFoodDetail(cartFood);
            const id_quantity = cartFood.map(food => {
                const id_and_quantity = {
                    _id:food._id,
                    quantity: food.quantity,
                    price: food.price,
                };
                return id_and_quantity;
            });
            setIdAndQuantity(id_quantity); 
        };
    };
};

useEffect(()=>{
    if(allFood.length){
        handleSetCartFoodDetail(allFood);
    };
    if(allFood.length === 0){
        fetch('http://localhost:8080/get_all_food')
        .then(res => res.json())
        .then(data => {
            handleSetCartFoodDetail(data);
        })
        .catch(err => console.log(err));
    };
},[]);

    return (
        <div className='check_cart'>
            <h5>Check Cart</h5>
            <hr/>
            <div className='text-left'>
                <p>From <strong>Red Onion Foods</strong> <br/>Arriving in 20-30 min <br/> 107 Rd No 8</p>
            </div>
            <div className='mt-3 checkOutCardContainer'>
                {
                    cartFoodDetail.length > 0 ?
                    cartFoodDetail.map(fdDetail => <CheckoutFoodCard key={fdDetail._id} idAndQuantity={idAndQuantity} setIdAndQuantity={setIdAndQuantity} fdDetail={fdDetail} cartFoodDetail={cartFoodDetail} setCartFoodDetail={setCartFoodDetail}/>)
                    :
                    <div className='text-center d-flex justify-content-center align-items-center categories_container w-100'>
                        <img className='loading_spin' src={loadSpiner} alt="loading"/>
                    </div>
                }
            </div>
            <div className='mt-3'>
                <div className='d-flex justify-content-between'>
                    <p>Subtotal- {totalFoodLength} item</p>
                    <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className='d-flex justify-content-between'>
                    <p>Tax</p>
                    <p>${tax.toFixed(2)}</p>
                </div> 
                <div className='d-flex justify-content-between'>
                    <p>Delivery Fee</p>
                    <p>${delivery.toFixed(2)}</p>
                </div>  
                <div className='d-flex justify-content-between'>
                    <h5 className='total'>Total</h5>
                    <p>${total.toFixed(2)}</p>
                </div>
            </div>
            {
                shippingData.name && cartFoodDetail.length > 0 ?
                <button onClick={handleConfirm} className='w-75 mt-3 check_your_food_active'>Processing To Pay</button>
                :
                <button type='button' disabled className='mt-3 w-75 check_your_food_disabled'>Processing To Pay</button>
            }
        </div>
    );
};

export default CheckCart;