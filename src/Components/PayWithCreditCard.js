import React from "react";
import { loadStripe } from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import axios from "axios";


/** 
 * npm i @stripe/stripe-js
 * npm i stripe
 * npm i @stripe/react-stripe-js
*/

var token = localStorage.getItem('tokenClient');
var idusuario = localStorage.getItem('userId');
var username = localStorage.getItem('usernameClient');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};

const PayWithCreditCard = () => {
    // START CREDIT CARD
    function createPaymetCard() {
        var orderData = {
            product_name: 'Este es el product-name',
            price: 710, // Total price
            currency: 'mxn',
            quantity: 2,  // Cantidad de productos. 
        };

        // Get Stripe publishable key
        axios.get("https://yellowrabbit.herokuapp.com/payment/api/publishable-key/")
            .then((result) => {
                return result.data;
            })
            .then((data) => {
                // Initialize Stripe.js
                console.log('public: ', data.publicKey);
                const stripe = loadStripe(data.publicKey);

                // Create and get Checkout Session ID - card
                axios.post('https://yellowrabbit.herokuapp.com/payment/api/create-payment-intent-card/', orderData, { headers })
                    .then((result) => { return result.data; })
                    .then((data) => {
                        // Redirect to Stripe Checkout
                        window.location.href = data.sessionURL;
                        //return stripe.redirectToCheckout({ sessionId: data.sessionId })
                        return true;
                    })
                    .then((res) => {
                        console.log(res);
                    });
            });

    }
    return (
        <>
            <div><span>Holaaaa</span>
                <script src="https://js.stripe.com/v3/"></script>
                <button type="button" onClick={() => { createPaymetCard(); }}> Pagar </button>
            </div>
        </>
    )
}


export default PayWithCreditCard