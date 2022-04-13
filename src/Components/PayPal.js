import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";



const PayPal = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleAprove = (orderId) => {
        // Registrar que se guardó con éxito en el backend
        // if response is success
        setIsSuccess(true);
    }

    if (isSuccess){
        alert('El pago se hizo correctamente');
    }

    if(error){
        // Display error message
        alert(error);
    }

    return (
        <><h4>Pagar con PAYPAL</h4>
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
                                    description: "Sunflower", // Nombre del producto
                                    amount: {
                                        value: 20, // Es el precio
                                    },
                                },
                            ]
                        });
                    }}

                    onApprove={ async (data, actions) => {
                        const order = await actions.order.capture();
                        console.log('order: ', order);

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
