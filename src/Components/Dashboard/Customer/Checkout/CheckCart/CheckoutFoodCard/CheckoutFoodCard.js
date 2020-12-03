import React, { useState } from 'react';
import { faMinus, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { UserContext } from '../../../../../../App';

const CheckoutFoodCard = ({fdDetail, idAndQuantity, setIdAndQuantity, cartFoodDetail ,setCartFoodDetail}) => {
    const{setCart} = useContext(UserContext);
    const [localQuantity, setLocalQuantity] = useState(fdDetail.quantity);

const handleLatestQuantity = (food_id, method) =>{
    const LatestQuantity = method ? localQuantity + 1 :  (localQuantity > 1 && localQuantity - 1);
    if(LatestQuantity > 0){
        setLocalQuantity(LatestQuantity);
        const filterById = idAndQuantity.find(food => food._id === food_id);
        filterById.quantity = LatestQuantity;
        const others = idAndQuantity.filter(fd => fd._id !== food_id);
        const newCart = [filterById, ...others];
        sessionStorage.setItem('cart', JSON.stringify(newCart));
        setIdAndQuantity(newCart);
    };
};

const handleDelete = id => {
    const removedSelected = idAndQuantity.filter(fd => fd._id !== id);
    setIdAndQuantity(removedSelected);
    setCart(removedSelected);
    const removedPassData = cartFoodDetail.filter(food => food._id !== id);
    setCartFoodDetail(removedPassData);
    sessionStorage.setItem('cart', JSON.stringify(removedSelected));
};
    return (
        <div style={{backgroundColor:'#F5F5F5', borderRadius:'10px'}} className="mt-0 mb-3 pt-2 pb-2 text-center" >
            <p className='mt-0 delete_btn'><FontAwesomeIcon onClick={() =>handleDelete(fdDetail._id)} icon={faTimes} /></p>
            <div className='d-flex justify-content-between'>
                <div className="d-flex align-items-center pl-3">
                    <img style={{width:'70px', height:'70px',borderRadius:'50%'}} className='mr-3 card-img' src={fdDetail.image_link} alt="clientPic"/>
                    <div className='text-left'>
                        <h5>{fdDetail.name}</h5>
                        <h3 style={{color:'#ff0000'}}>${fdDetail.price}</h3>
                    </div>
                </div>
                <div className="pr-3 d-flex align-items-center">
                    <FontAwesomeIcon onClick={() => handleLatestQuantity(fdDetail._id)} className='latestQuantity' icon={faMinus} />
                    <span className='count_number'>{localQuantity}</span>
                    <FontAwesomeIcon onClick={() => handleLatestQuantity(fdDetail._id, 'plus')} className='latestQuantity' icon={faPlus} />
                </div>
            </div>
        </div>
    );
};

export default CheckoutFoodCard;