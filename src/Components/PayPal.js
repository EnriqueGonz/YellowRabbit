import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// Install: npm i @paypal/react-paypal-js
import axios from 'axios';
import CrearEtiqueta from './CrearEtiqueta';

var orderPaypal = "";

var token = localStorage.getItem('tokenClient');



const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const PayPal = (parametros) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleAprove = (orderId) => {
        // Registrar que se guardó con éxito en el backend
        // if response is success
        setIsSuccess(true);
    }

    if (isSuccess){
        alert('El pago se hizo correctamente');
        // Se usa la API del back aqui.
        //https://yellowrabbit.herokuapp.com/payment/api/save-payment-intent-paypal/
        /**
         * datos ()
         * - user
         * - order // Lo obtienes del pedido
         * - paypal_order_id // Lo obtienes del response
         * - shipping_price // costo de envío.
         */
    }

    if(error){
        // Display error message
        alert(error);
    }


    function successmethodpay(){

        let datosEtiqueta = {
            user_id: parametros.idusuario,
            order_id: parametros.idorder,
            carrier: 'fedex', // fedex, dhl, estafeta
            service: 'ground', //express
            content: parametros.product_name,
        }
        
        console.log('respaldo de compra')
        axios.post('https://yellowrabbit.herokuapp.com/payment/api/save-payment-intent-paypal/',{
            user: parametros.idusuario,
            coupon_id:0,
            order: parametros.idorder,
            paypal_order_id: orderPaypal,
        },{ headers })
        .then((response) => {
            console.log(response)
            CrearEtiqueta.generarEtiqueta(datosEtiqueta);
            //Mostrar modal o redirigirlo alv
        })
        .catch((error) => {
            console.log(error);
        });
    }
    return (
        <><h4>{parametros.idusuario}</h4>
        <h3>{parametros.product_name}</h3>
        <br></br>
            <PayPalScriptProvider options={{ "client-id": "AVqSGBZdn8kfVjYFNOvBwFHWGGUkn-D73qLXbbaYN2BfSpQoO4OcoZGfAM_o9cIGr204vq3eEHkxX0tz", currency: "MXN" }}>
                <PayPalButtons
                    style={{ color: "silver", layout: "horizontal", height: 48, tagline: false, shape: "pill" }}

                    onClick = {(data, actions) => {
                        const hasAlreadyBoughtItem = false; //
                        if(hasAlreadyBoughtItem){
                            setError("Ya ha comprado este artículo");
                            return actions.reject()
                        }else{
                            return actions.resolve()
                        }
                    }}

                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    description: parametros.product_name, // Nombre del producto
                                    amount: {
                                        value: 1, // Es el precio en MXN, con todo y costo de envío.
                                    },
                                },
                            ]
                        });
                    }}

                    onApprove={ async (data, actions) => {
                        const order = await actions.order.capture();
                        console.log('order: ', order);
                        console.log(order.id)
                        orderPaypal = order.id;
                        successmethodpay();
                        handleAprove(data.orderID);

                    }}

                    onCancel = {()=>{
                        //display cancel message, or redirect to order details
                    }}

                    onError={(err) => {
                        setError(err);
                        console.error("PayPal checkout onError ", err);
                    }}
                />

            </PayPalScriptProvider>
        </>
    );
}

export default PayPal