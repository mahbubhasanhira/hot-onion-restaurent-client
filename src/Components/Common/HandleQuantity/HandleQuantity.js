import React from 'react';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HandleQuantity = ({foodQuantity, setFoodQuantity}) => {
    return (
        <>
            <FontAwesomeIcon onClick={() => {if(foodQuantity > 1){setFoodQuantity(foodQuantity - 1)}}} className='decrease_btn' icon={faMinus} />
            <span className='count_number'>{foodQuantity}</span>
            <FontAwesomeIcon onClick={() =>setFoodQuantity(foodQuantity + 1)} className='increase_btn' icon={faPlus} />
        </>
    );
};

export default HandleQuantity;