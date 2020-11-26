import React, { useEffect, useState } from 'react';
import './MyOrderCard.css';

const MyOrderCard = ({orderList, index}) => {

const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery');

    let customColor = 'status_contain';
    if(orderList.status === 'Pending'){
        customColor = 'pending status_contain'
    }
    else if(orderList.status === 'Done'){
        customColor = 'done status_contain'
    }
    else if(orderList.status === 'On going'){
        customColor = 'on_going status_contain';
    }
useEffect(() => {
    if(orderList.paymentData.paymentMethod.id){
        setPaymentMethod('Payment By Credit Card');
    }
}, []);
    return (    
        <div className='col-md-6 mt-3 mb-3 col-sm-6'>
            <div className="card card_height p-1" >
                <div className="d-flex align-items-center justify-content-between pt-3 pl-3">
                    <h5>{index + 1}.</h5>
                    <p className={customColor}>{orderList.status}</p>
                </div>
                <div className="card-body card_over text-left">
                    <div>
                    <p className='mt-0 mb-0'><strong>Order ID: </strong>{orderList._id}</p>
                    <p className='mt-0 mb-0'><strong>Order Time: </strong>{orderList.orderTime}</p>
                    <p className='mt-0 mb-2'><strong>Order Date: </strong>{orderList.orderDate}</p>
                    </div>
                    <div>
                        <h5  style={{color:'green'}}>Shipping Detail:</h5>
                        <p className='mt-0 mb-0'><strong>Name:</strong>{orderList.shippingData.name}</p>
                        <p className='mt-0 mb-0'><strong>Email: </strong>{orderList.shippingData.email}</p>
                        <p className='mt-0 mb-0'><strong>Phone No: </strong>{orderList.shippingData.phone}</p>
                        <p className='mt-0 mb-0'><strong>Address: </strong>{`${orderList.shippingData.address1_village}, ${orderList.shippingData.address2_city}`}</p>
                    </div>
                    <div>
                        <h5  style={{color:'green'}} className='mt-3'>Food Detail:</h5>
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orderList.checkCart.foodData.map((food, index) =>
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{food.quantity}</td>
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
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h5 style={{color:'green'}} className='mb-0'>Payment Info:</h5>
                        <p className='mt-0 mb-0'><strong>Total Item: </strong>{orderList.checkCart.totalFoodMoneyDetail.totalFoodQuantity}</p>
                        <p className='mt-0 mb-0'><strong>Subtotal: </strong>${orderList.checkCart.totalFoodMoneyDetail.subtotalAmount}</p>
                        <p className='mt-0 mb-0'><strong>Tax: </strong>${orderList.checkCart.totalFoodMoneyDetail.taxAmount}</p>
                        <p className='mt-0 mb-0'><strong>Delivery: </strong>${orderList.checkCart.totalFoodMoneyDetail.deliveryAmount}</p>
                        <p className='mt-0 mb-0'><strong>Total: </strong>${orderList.checkCart.totalFoodMoneyDetail.totalAmount}</p>
                        <p><strong>Payment Method:</strong> {paymentMethod}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyOrderCard; 