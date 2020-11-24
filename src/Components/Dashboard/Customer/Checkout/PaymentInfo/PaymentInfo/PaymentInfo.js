import React from 'react';
import './PaymentInfo.css';
import PaymentForm from '../PaymentForm/PaymentForm';
import ConfirmOrder from '../ConfirmOrder/ConfirmOrder';

const PaymentInfo = ({paymentData, setPaymentData, handleConfirm}) => {

    return (
        <section className='container'>
            <div className="row mt-3">
                <div className="col-md-6 shipping_data_container d-flex justify-content-center">
                   <PaymentForm setPaymentData={setPaymentData}/>
                </div>
                <div className="check_cart_container col-md-6">
                    <ConfirmOrder handleConfirm={handleConfirm} paymentData={paymentData} />
                </div>
            </div>
        </section>
    );
};

export default PaymentInfo;