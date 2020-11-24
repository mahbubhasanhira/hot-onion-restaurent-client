import React, { useContext } from 'react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { UserContext } from '../../../App';


const AddToCartBtn = ({foodId, foodQuantity, foodPrice}) => {

    const {cart, setCart} = useContext(UserContext);
    
    const handleAddToCart = food_id => {
        
        const sameProduct = cart.find(food => food._id === food_id);
        let newCart;
        if(sameProduct){
            sameProduct.quantity = sameProduct.quantity + foodQuantity;
            const others = cart.filter(pd => pd._id !== food_id);
            newCart = [...others, sameProduct];
        }
        else{
            const newObj = {
                _id: food_id,
                quantity: foodQuantity,
                price:foodPrice,
            }
            newCart = [...cart, newObj];
        }
        setCart(newCart);
        sessionStorage.setItem(`cart`, JSON.stringify(newCart));
    };

    return (
        <div>
            <Button onClick={() => handleAddToCart(foodId)} className='add_to_cart_btn' variant="danger"><FontAwesomeIcon  icon={faShoppingCart} /> Add</Button>  
        </div>
    );
};

export default AddToCartBtn;