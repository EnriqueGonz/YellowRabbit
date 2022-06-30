import axios from "axios";
import '../config';
import CrearEtiqueta from './CrearEtiqueta';

var baseUrl = global.config.yellow.rabbit.url;
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
        /* console.log(dataProductPay.order)
        console.log(dataProductPay.user) */
        let datosEtiqueta = {
            user_id: dataProductPay.user,
            order_id: dataProductPay.order,
            carrier: 'paquetexpress', // fedex, dhl, estafeta
            service: 'ground', //express
        }
        
        try {
            // Create and get Checkout Session ID - card
            axios.post(baseUrl+'/payment/api/create-payment-intent-card/', dataProductPay, { headers })
                .then((result) => { return result.data; })
                .then((data) => {
                    // Redirect to Stripe Checkout
                    if (data.sessionURL === undefined | data.sessionURL === null | data.sessionURL === ''){
                        return false;
                    }else{
                        CrearEtiqueta.generarEtiqueta(datosEtiqueta);
                        /* console.log('Session URL',data.sessionURL); */
                        window.location.href = data.sessionURL;
                    }
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
    };
    // End - Pay with credit card
}

const PayWithCreditCard = new PaymentOptions();
export default PayWithCreditCard
