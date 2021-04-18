import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../../../../Common/Sidebar/Sidebar';
import MyOrderCard from '../MyOrderCard/MyOrderCard';
import loading_spin from '../../../../../hot-onion-restaurent-resources/ICON/loadSpiner.gif';
import { UserContext } from '../../../../../App';

const MyOrder = () => {
    const {loggedInUser, myOrderLists, setMyOrderLists} = useContext(UserContext);
   
const handleLoadOrder = () => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    const token =  sessionStorage.getItem('token');
    if(userInfo){
        if(userInfo.email && token){
            fetch(`https://hot-onion-101.herokuapp.com/my_orders?email=${userInfo.email}`,{
                method: 'GET',
                headers:{
                    'Content-Type' : 'application/json',
                    "authorization" : `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => setMyOrderLists(data))
            .catch(error => console.log(error));
        };
    };
};

useEffect(() => {
    const token =  sessionStorage.getItem('token');
    if(!token && !myOrderLists.length){
        setTimeout(() => {
            handleLoadOrder();
        }, 4000);
    }
    if(token && !myOrderLists.length){
        handleLoadOrder();
    }
   
},[myOrderLists.length]);

    return (
        <section>
             <div className="row">
                <div className="col-md-2 for_mobile_responsive">
                    <Sidebar/>
                </div>
                <div className="col-md-10 dashboard_r_div_container">
                    <div  className='dashboard_right_container'>
                        <h5 className='text-left mb-3'>My Order</h5>
                        {
                            myOrderLists.length > 0 ?
                            <div className="row right_inside_container">
                                { 
                                    myOrderLists.map((orderList, index) => <MyOrderCard key={index} index={index} loggedInUser={loggedInUser} orderList={orderList}/>)
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

export default MyOrder;