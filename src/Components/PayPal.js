import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// Install: npm i @paypal/react-paypal-js
import axios from 'axios';
import CrearEtiqueta from './CrearEtiqueta';
import Appbar from "./appbarClient";
import Footer from "./footer";
import LogoPaypal from '../images/LogoPaypal.png';

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

    if (isSuccess) {
        console.log('Pago aceptado');
    }

    if (error) {
        // Display error message
        alert(error);
    }


    function successmethodpay() {

        let datosEtiqueta = {
            user_id: parametros.idusuario,
            order_id: parametros.idorder,
            carrier: 'paquetexpress', // fedex, dhl, estafeta
            service: 'ground', //express
        }

        axios.post('https://yellowrabbit.herokuapp.com/payment/api/save-payment-intent-paypal/', {
            user: parametros.idusuario,
            coupon_id: parametros.cupon,
            order: parametros.idorder,
            paypal_order_id: orderPaypal,
        }, { headers })
            .then((response) => {
                console.log(response)
                CrearEtiqueta.generarEtiqueta(datosEtiqueta);
                window.location.href = '/success/buyproductpaypal/'
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <>
            <Appbar></Appbar>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <img src={LogoPaypal} alt='' style={{ width: "70%", padding: 50 }}></img>

                    </div>
                    <div className="col" style={{paddingTop:50}}>
                        <h3>Pagar con PayPal</h3><br/>


                        <h6>{parametros.product_name}</h6>
                        <h6>Total a Pagar: ${parametros.precio}MXN</h6>
                        <br/><br/>
                        <div>
                            <PayPalScriptProvider options={{ "client-id": "AVqSGBZdn8kfVjYFNOvBwFHWGGUkn-D73qLXbbaYN2BfSpQoO4OcoZGfAM_o9cIGr204vq3eEHkxX0tz", currency: "MXN" }}>
                                <PayPalButtons
                                    style={{ color: "silver", layout: "horizontal", height: 48, tagline: false, shape: "pill" }}

                                    onClick={(data, actions) => {
                                        const hasAlreadyBoughtItem = false; //
                                        if (hasAlreadyBoughtItem) {
                                            setError("Ya ha comprado este artículo");
                                            return actions.reject()
                                        } else {
                                            return actions.resolve()
                                        }
                                    }}

                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    description: parametros.product_name, // Nombre del producto
                                                    amount: {
                                                        value: parametros.precio, // Es el precio en MXN, con todo y costo de envío.
                                                    },
                                                },
                                            ]
                                        });
                                    }}

                                    onApprove={async (data, actions) => {
                                        const order = await actions.order.capture();
                                        console.log('order: ', order);
                                        console.log(order.id)
                                        orderPaypal = order.id;
                                        successmethodpay();
                                        handleAprove(data.orderID);

                                    }}

                                    onCancel={() => {
                                        //display cancel message, or redirect to order details
                                    }}

                                    onError={(err) => {
                                        setError(err);
                                        console.error("PayPal checkout onError ", err);
                                    }}
                                />

                            </PayPalScriptProvider>
                        </div>

                    </div>

                </div>

            </div>
            <br></br>

            <Footer></Footer>
        </>
    );
}

export default PayPal