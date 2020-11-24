import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import AddToCartBtn from '../AddToCartBtn/AddToCartBtn';
import './FoodCard.css';

const FoodCard = props => {

    const history = useHistory();
    const handleSingleFood = () => {
        history.push(`/${category}/${_id}`);
    }
    const quantity = 1;
    const { name ,title, price, image, category, _id} = props.food;
    return (
            <Card style={{width:'18rem',position:'relative', border:'1px solid #ffffff'}}>
                <div style={{marginBottom:'50px'}} onClick={handleSingleFood}>
                    <Card.Img variant="top" className='food_img' src={`data:image/jpeg;base64,${image.img}`}/>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Title>${price}</Card.Title>
                        <Card.Text>{title}</Card.Text>
                    </Card.Body>
                </div>
                <div className='addToCart'>
                    <AddToCartBtn foodId={_id} foodPrice={price} foodQuantity={quantity}/>
                </div>
            </Card>   
    );
};

export default FoodCard;