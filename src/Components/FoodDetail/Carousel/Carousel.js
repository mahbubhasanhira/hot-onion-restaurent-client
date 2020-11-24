import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import './Carousel.css';
import { useHistory } from 'react-router-dom';

const Carousel = props => {

    const {foodItem, setFoodDetail, setFoodQuantity} = props;

   
    const [sliderValue, setSliderValue] = useState(0);

    const history = useHistory();

    const foodItem1 = foodItem[sliderValue];
    const foodItem2 = foodItem[sliderValue + 1];

    const handleImage = food_item => {
        setFoodDetail(food_item);
        setFoodQuantity(1);
        history.push(`/${food_item.category}/${food_item._id}`);
    }

    return (     
        <div className='carousel_food w-100  d-flex align-items-center '>
            {
                sliderValue > 0 && <span><FontAwesomeIcon onClick={() => {if(sliderValue > 0 ){setSliderValue(sliderValue - 1)}}} className='arrow_icon' icon={faAngleLeft} /></span>
            }
            <img onClick={() => handleImage(foodItem1)} src={foodItem1 && `data:image/jpeg;base64,${foodItem1.image.img}`} alt=""/>
            <img onClick={() => handleImage(foodItem2)} src={foodItem2 && `data:image/jpeg;base64,${foodItem2.image.img}`} alt=""/>
            {
                sliderValue < (foodItem.length - 2)  && <span><FontAwesomeIcon onClick={() => {if(sliderValue < (foodItem.length - 2)){setSliderValue(sliderValue + 1)}}} className='arrow_icon' icon={faAngleRight} /></span>
            }
        </div>

    );
};

export default Carousel;