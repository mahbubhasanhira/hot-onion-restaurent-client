import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './OrderListCard.css';

const OrderListCard = ({order_list, index}) => {
    const [status, setStatus] = useState(order_list.status);
    const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery');
    
    const token =  localStorage.getItem('token');
    const handleUpdateStatus = (e) => {
        const id = e.target.name;
        const changeStatus = e.target.value;
        setStatus(changeStatus);
        fetch(`https://hot-onion-101.herokuapp.com/updateStatus/${id}`, {
            method: 'PATCH',
            headers:{
                'Content-Type' : 'application/json',
                "authorization" : `Bearer ${token}`
            },
            body: JSON.stringify({changeStatus}),
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                alert('Order Status Updated Successfully');
            }
        })
        .catch(error => console.log(error));

    }
    
    let customColor = 'status_contain';
    if(status === 'Pending'){
        customColor = 'pending status_contain'
    }
    else if(status === 'Done'){
        customColor = 'done status_contain'
    }
    else if(status === 'On going'){
        customColor = 'on_going status_contain';
    }


useEffect(() => {
    if(order_list.paymentData.paymentMethod.id){
        setPaymentMethod('Payment By Credit Card');
    }
}, [order_list.paymentData.paymentMethod.id]);
    return (
        <div className='col-md-6 mt-3 mb-3 col-sm-6'>
        <div className="card m-0 p-1" >
            <div className="mb-2 d-flex align-items-center justify-content-between pt-3 pl-3">
                <h5>{index + 1}.</h5>
                <div className='status_Container'>
                    <select  className={customColor} id="select1" onChange={handleUpdateStatus} name={order_list._id}>
                    <option value={status} id='selected' defaultValue='selected'>{order_list.status}</option>
                    <option className='Pending'  value="Pending" >Pending</option>
                    <option className='Done' value="Done">Done</option>
                    <option className='ongoing' value="On going">On Going</option>
                   </select>
                </div>
            </div>
            <div className="card-body text-left">
                <div>
                    <p className='mt-0 mb-0'><strong>Order ID: </strong>{order_list._id}</p>
                    <p className='mt-0 mb-0'><strong>Order Email: </strong>{order_list.orderEmail}</p>
                    <p className='mt-0 mb-0'><strong>Order Time: </strong>{order_list.orderTime}</p>
                    <p className='mt-0 mb-2'><strong>Order Date: </strong>{order_list.orderDate}</p>
                </div>
                <button className="btn btn-info ml-auto d-block see_more" type="button" data-toggle="collapse" data-target={'#'+ order_list._id} aria-expanded="false" aria-controls={'#'+ order_list._id}>
                   Show Detail <FontAwesomeIcon icon={faChevronDown}/>
                </button>
               <div className='collapse' id={order_list._id}>
                <div>
                        <h5  style={{color:'green'}}>Shipping Detail:</h5>
                        <p className='mt-0 mb-0'><strong>Name:</strong>{order_list.shippingData.name}</p>
                        <p className='mt-0 mb-0'><strong>Email: </strong>{order_list.shippingData.email}</p>
                        <p className='mt-0 mb-0'><strong>Phone No: </strong>{order_list.shippingData.phone}</p>
                        <p className='mt-0 mb-0'><strong>Address: </strong>{`${order_list.shippingData.address1_village}, ${order_list.shippingData.address2_city}`}</p>
                    </div>
                    <div>
                        <h5  style={{color:'green'}} className='mt-3'>Food Detail:</h5>
                            <div>
                                <div className='table-responsive'>
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Food ID</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            order_list.checkCart.foodData.map((food, index) =>
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{food._id}</td>
                                                    <td className='text-center'>{food.quantity}</td>
                                                    <td>${food.price/food.quantity}</td>
                                                    <td>${food.price}</td>
                                                </tr>
                                            )
                                        }
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h5 style={{color:'green'}} className='mb-0'>Payment Info:</h5>
                        <p className='mt-0 mb-0'><strong>Total Item: </strong>{order_list.checkCart.totalFoodMoneyDetail.totalFoodQuantity}</p>
                        <p className='mt-0 mb-0'><strong>Subtotal: </strong>${order_list.checkCart.totalFoodMoneyDetail.subtotalAmount}</p>
                        <p className='mt-0 mb-0'><strong>Tax: </strong>${order_list.checkCart.totalFoodMoneyDetail.taxAmount}</p>
                        <p className='mt-0 mb-0'><strong>Delivery: </strong>${order_list.checkCart.totalFoodMoneyDetail.deliveryAmount}</p>
                        <p className='mt-0 mb-0'><strong>Total: </strong>${order_list.checkCart.totalFoodMoneyDetail.totalAmount}</p>
                        <p><strong>Payment Method:</strong> {paymentMethod}</p>
                    </div>
               </div>
            </div>
        </div>
    </div>
                
    );
};

export default OrderListCard;