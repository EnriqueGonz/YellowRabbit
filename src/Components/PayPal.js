import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// Install: npm i @paypal/react-paypal-js
import { useParams } from 'react-router-dom';
import axios from 'axios';

var orderPaypal = "";

var token = localStorage.getItem('tokenClient');



const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const PayPal = () => {
    var { idusuario,idorder,productName,envio,total } = useParams(); // params
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
        console.log('respaldo de compra')
        axios.post('https://yellowrabbit.herokuapp.com/payment/api/save-payment-intent-paypal/',{
            user: idusuario,
            order: idorder,
            paypal_order_id: orderPaypal,
            shipping_price: envio
        },{ headers })
        .then((response) => {
            console.log(response)
            //Mostrar modal o redirigirlo alv
        })
        .catch((error) => {
            console.log(error);
        });
    }
    return (
        <><h4>Pagar con PAYPAL</h4>
        <br></br>
            <PayPalScriptProvider options={{ "client-id": "AaUpVv8WDVM5uezwsQo79K6YBKmqm3EeLSOx5TFTX4RM2_ephwW68aJ4_ASXYPjbI8OyuXchwgkQ7bRl", currency: "MXN" }}>
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
                                    description: productName, // Nombre del producto
                                    amount: {
                                        value: total, // Es el precio en MXN, con todo y costo de envío.
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