import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import Loading from '../../../Loading/Loading';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe(process.env.REACT_APP_stripe_key)


const Payment = () => {


    const booking = useLoaderData()
    const navigation = useNavigation()
    const {productName, productPrice} = useLoaderData()


    if(navigation.state === "loading"){
        return <Loading></Loading>
    }
   
    return (
        <div>

        <h1 className="text-3xl text-center font-bold my-10">Checkout</h1>
        <h1 className="text-xl  text-center">
           Pay <strong>{productPrice}</strong> Taka for {productName}
        </h1>

           <div className='w-1/2 my-10 mx-auto shadow-lg rounded p-10'>
          <div className='border p-10'>
          <Elements stripe={stripePromise}>
             <CheckoutForm booking={booking}/>
          </Elements>
          </div>
           </div>
        
      
      
    </div>
    );
};

export default Payment;