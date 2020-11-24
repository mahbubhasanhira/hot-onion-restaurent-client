import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../../../../Common/Sidebar/Sidebar';
import MyOrderCard from '../MyOrderCard/MyOrderCard';
import loading_spin from '../../../../../hot-onion-restaurent-resources/ICON/loadSpiner.gif';
import { UserContext } from '../../../../../App';

const MyOrder = () => {
    const {loggedInUser} = useContext(UserContext);
    const [orderLists, setOrderLists] = useState([]);

const handleLoadOrder = () => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        const token =  sessionStorage.getItem('token');
        if(userInfo.email && token){
            fetch(`http://localhost:8080/my_orders?email=${userInfo.email}`,{
                method: 'GET',
                headers:{
                    'Content-Type' : 'application/json',
                    "authorization" : `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => setOrderLists(data))
            .catch(error => console.log(error));
        };
}

useEffect(() => {
    const token =  sessionStorage.getItem('token');
    if(!token){
        setTimeout(() => {
            handleLoadOrder();
        }, 4000);
    }
    if(token){
        handleLoadOrder();
    }
   
},[]);

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
                            orderLists.length > 0 ?
                            <div className="row right_inside_container">
                                { 
                                    orderLists.map((orderList, index) => <MyOrderCard key={orderList._id} index={index} loggedInUser={loggedInUser} orderList={orderList}/>)
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