import React from "react";
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


class PaymentOptions {
    // Start -Pay with credit card
    payWithCreditCard(dataProductPay) {
        console.log('- card -', dataProductPay);
        /*
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
            });
            */
    };
    // End - Pay with credit card

    // Start - Pay with OXXO
    payWithOXXO(dataProductPay){
        console.log('- OXXO - ', dataProductPay);
    };

}

const PaymentMethods = new PaymentOptions();
export default PaymentMethods