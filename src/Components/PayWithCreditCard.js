import React from "react";
import axios from "axios";

/** 
 * npm i @stripe/stripe-js
 * npm i stripe
 * npm i @stripe/react-stripe-js
*/

var token = localStorage.getItem('tokenClient');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


class PaymentOptions {
    // Start -Pay with credit card
    payWithCreditCard(dataProductPay) {
        try {
            // Create and get Checkout Session ID - card
            axios.post('https://yellowrabbit.herokuapp.com/payment/api/create-payment-intent-card/', dataProductPay, { headers })
                .then((result) => { return result.data; })
                .then((data) => {
                    // Redirect to Stripe Checkout
                    window.location.href = data.sessionURL;
                    //return stripe.redirectToCheckout({ sessionId: data.sessionId })
                    return true;
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    return false;
                });

        } catch (error) {
            return false;
        }
        return false

    };
    // End - Pay with credit card
}

const PayWithCreditCard = new PaymentOptions();
export default PayWithCreditCard