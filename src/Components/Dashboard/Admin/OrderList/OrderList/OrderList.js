import React, {  useContext, useEffect, useState } from 'react';
import Sidebar from '../../../../Common/Sidebar/Sidebar';
import OrderListCard from '../OrderListCard/OrderListCard';
import loading_spin from '../../../../../hot-onion-restaurent-resources/ICON/loadSpiner.gif';
import { UserContext } from '../../../../../App';

const OrderList = () => {
    const {isAdmin, loggedInUser} = useContext(UserContext)
    const [orderList, setOrderList] = useState([]);

useEffect(() => {
    if(isAdmin){
        fetch(`http://localhost:8080/order_list?admin_email=${loggedInUser.email}`)
        .then(res => res.json())
        .then(data => setOrderList(data))
        .catch(error => console.log(error));
    };
},[]);
    return (
        <section>
            <div className="row">
                <div className="col-md-2 for_mobile_responsive">
                    <Sidebar/>
                </div>
                <div className="col-md-10 dashboard_r_div_container">
                    <div  className='dashboard_right_container'>
                    <h5 className='text-left mb-3'>Order List</h5>
                        {
                            orderList.length > 0 ?
                            <div className="row right_inside_container">
                                { 
                                    orderList.map((order_list, index) => <OrderListCard key={orderList._id} index={index} order_list={order_list}/>)
                                }
                            </div>
                            :
                            <div className='text-center mt-5 w-100'>
                                <img className='loading_spin' src={loading_spin} alt="loading"/>
                            </div>
                        }
                    </div>                   
                </div>
            </div>
        </section>
    );
};

export default OrderList;