import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import AddToCartBtn from '../AddToCartBtn/AddToCartBtn';
import './FoodCard.css';

const FoodCard = ({food}) => {
    const [viewCart, setViewCart] = useState('');

    const history = useHistory();
    const handleSingleFood = () => {
        history.push(`/${category}/${_id}`);
    }
    const quantity = 1;
    const { name ,title, price, image_link, category, _id} = food;

    useEffect(() => {
        const cartProduct =  JSON.parse(sessionStorage.getItem('cart'));
        if(cartProduct){
            const cartProductId = cartProduct.filter(product => product._id === _id);
            cartProductId.length > 0 && setViewCart(cartProductId[0]._id);
        }
    },[_id]);

    return (
            <Card style={{width:'18rem',cursor:"pointer",position:'relative', border:'1px solid #ffffff'}}>
                <div style={{marginBottom:'50px'}} onClick={handleSingleFood}>
                    <Card.Img variant="top" className='food_img' src={image_link}/>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Title>${price}</Card.Title>
                        <Card.Text>{title}</Card.Text>
                    </Card.Body>
                </div>
                <>
                    {
                        viewCart === food._id ?
                        <div className='viewCart'>
                            <div>
                                <Link to='/dashboard/checkout' className='text-white view_cart_link'><Button className='add_to_cart_btn' variant="dark"><FontAwesomeIcon icon={faCartArrowDown}/> View Cart</Button></Link>
                            </div>
                        </div>
                    :   
                        <div className='addToCart'>
                            <AddToCartBtn fromCard={true} setViewCart={setViewCart} foodId={_id} foodPrice={price} foodQuantity={quantity}/>                   
                        </div>
                    }
               </>
            </Card>   
    );
};

export default FoodCard;