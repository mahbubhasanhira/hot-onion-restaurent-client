import React, { useMemo, useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from "@stripe/react-stripe-js";


const useOptions = () => {
  const options = useMemo(
    () => ({
      style: {
        base: {
            backgroundColor:'#F5F5F5',
            fontSize:'20px',
            textAlign:'left',
            color: "#424770",
            letterSpacing: "0.025em",
            fontFamily: "Source Code Pro, monospace",
            "::placeholder": {
                color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    []
  );

  return options;
};

const CreditCardForm = ({setPaymentData}) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
    const [paymentError, setPaymentError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),

    });
    
    if(payload.error){
        setPaymentError(payload.error.message);
        setPaymentSuccess(null)
    }
    if(payload.paymentMethod){
        setPaymentSuccess('Your Payment is Successful. Please Click Confirm Button For Confirm Order')
        setPaymentError(null);
        setPaymentData(payload)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className='mb-3 w-100 text-left'>
        <strong>Card number</strong>
        <CardNumberElement
          options={options}
        />
      </label>
      <br/>
      <label  className='mb-3 w-100 text-left'>
        <strong>Expiration date</strong>
        <CardExpiryElement
          options={options}
        />
      </label>
      <br/>
      <label  className='w-100 text-left'>
       <strong>CVC</strong>
        <CardCvcElement
          options={options}
        />
      </label>
      <br/>
      {
          paymentError && <p style={{color:'red'}}>{paymentError}</p>
      }
      {
          paymentSuccess && <p style={{color:'#44bd32'}}>{paymentSuccess}</p>
      }
      {
          paymentSuccess ? 
            <button type='button' disabled className='mt-1 mb-5 w-100 check_your_food_disabled'>Pay</button>
            :
            <button type="submit" className='w-100 form_submit_btn' disabled={!stripe}>Pay</button>
      }


      
    </form>
  );
};

export default CreditCardForm;