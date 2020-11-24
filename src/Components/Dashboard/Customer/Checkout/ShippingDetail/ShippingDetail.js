import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './ShippingDetail.css';

const ShippingDetail = ({loggedInUser, setShippingData}) => {

 const { register, handleSubmit } = useForm();
 const [isData, setIsData] = useState(false);

 const onSubmit = data => {
    setShippingData(data);
    if(data){
        setIsData(true);
    }
 };

    return (
        <div className='form_container w-100'>
            <h5>Delivery Detail</h5>
            <hr/>
            <form onSubmit={handleSubmit(onSubmit)}> 
                <div className="form-group">
                    <input type="text" name='name' defaultValue={loggedInUser.name} className="form-control shipping_input"  placeholder="Full Name" ref={register({ required: true })}/>
                </div>
                <div className="form-group">
                    <input type="email" name='email' defaultValue={loggedInUser.email} className="form-control shipping_input"  placeholder="Email" ref={register({ required: true })}/>
                </div>
                <div className="form-group">
                    <input type="text" name='address1_village' className="form-control shipping_input"  placeholder="Village/ Road No/ House No" ref={register({ required: true })}/>
                </div>
                <div className="form-group">
                    <input type="text" name='address2_city' className="form-control shipping_input"  placeholder="City/ Town" ref={register({ required: true })}/>
                </div>
                <div className="form-group">
                    <input type="number" name='phone' className="form-control shipping_input"  placeholder="Phone Number" ref={register({ required: true })}/>
                </div>
                <div className="form-group">
                    <textarea  name='description' className="form-control shipping_input" placeholder='Description(Optional)' rows="4" ref={register}/>
                </div>
                {
                    isData ?
                    <button type='button' disabled className='w-100 mt-2 mb-0 check_your_food_disabled'>Save & Continue</button>
                    :
                    <button type="submit" className="w-100 form_submit_btn">Save & Continue</button>
                }
            </form>
        </div>
    );
};

export default ShippingDetail;