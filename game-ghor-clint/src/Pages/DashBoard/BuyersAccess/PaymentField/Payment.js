import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';




const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);





const Payment = () => {

    const product = useLoaderData();
    return (
        <div>


            <div className=' shadow-2xl w-4/3 my-10 mx-auto h-[70rem] bg-white p-3 rounded-lg'>

                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        product={product}
                    />
                </Elements>

            </div>

        </div>
    );
};

export default Payment;