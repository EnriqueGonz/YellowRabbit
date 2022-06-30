import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import PayWithCreditCard from "./PayWithCreditCard.js";
import '../config';
import ReactDOM from 'react-dom';
import PayWithOxxo from './PayWithOxxo';
import PayPal from './PayPal';

var baseUrl = global.config.yellow.rabbit.url;


var token = localStorage.getItem('tokenClient');
var idusuario = localStorage.getItem('userId');
var username = localStorage.getItem('usernameClient');
var idcupon = 0;



const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};



const ConfirmOrderModal = (parametros) => {
    const [listDireccion, setlistDireccion] = useState([]);

    const [descuento, setDescuento] = useState(0);

    const [precioaPagar, setprecioaPagar] = useState(0);

    const [paymentMethod, setPaymentMethod] = useState(null);

    const [inputCupon, setinputCupon] = useState({
        cupon: "",
    })

    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        //console.log(name + " " + value)
        setinputCupon((values => ({ ...values, [name]: value })))
    }

    //Direccion
    useEffect(() => {
        axios.get('https://yellowrabbit.herokuapp.com/addresses/api/my-addresses/' + username + "/", { headers })
            .then((response) => {
                console.log(response.data[0])
                setlistDireccion(response.data[0])
                setprecioaPagar(parametros.costoTotalAllProductos)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [setlistDireccion])
    

  

    //Cupon
    function redeemCoupon() {
        console.log(inputCupon.cupon);
        axios.post('https://yellowrabbit.herokuapp.com/redeemedcoupons/api/get-discount/' + username + "/", {
            coupon_key: '',
            total_price: parametros.costoTotalAllProductos
        }, { headers }) // LIOSEJ174678 // BYOOZO160661 IOLHEA842712 BYOOZO160661
            .then((response) => {
                console.log(response.data)
                idcupon = response.data.id
                setDescuento(response.data.discounted_amount)
                setprecioaPagar(((parametros.costoTotalAllProductos) - response.data.discounted_amount).toFixed(2))
            })
            .catch((error) => {
                console.log(error.response);
            });
    }


    const handleChangePaymentMethod = (item) => {
        item === paymentMethod ? setPaymentMethod(null) : setPaymentMethod(item);
    };


    function makeAnOrder() {

        let rowOrder = [];
        let datasUserRow = parametros.rowUser;
        let datasOrderRow = parametros.rowProductos;

        rowOrder.push([datasUserRow]);
        rowOrder.push(datasOrderRow);

        axios.post(baseUrl + '/orders/api/register/', {
            order: rowOrder
        }, { headers }
        ).then((response) => {
            console.log(response)

            var producto = parametros.cantidadProductos + " Productos"

            if (paymentMethod === "creditCardPayment") {
                let dataProductPay = {
                    coupon_id: idcupon,
                    user: idusuario,
                    order: response.data[0][0].orders_id,
                    product_name: parametros.cantidadProductos + " Productos",
                }

                PayWithCreditCard.payWithCreditCard(dataProductPay);
            }
            if (paymentMethod === "oxxoPayment") {

                ReactDOM.render(
                    <PayWithOxxo idusuario={idusuario} idorder={response.data[0][0].orders_id} product_name={producto} precio={precioaPagar.toFixed(2)} cupon={idcupon} />,
                    document.querySelector("#root")
                );
            }
            if (paymentMethod === "payPalPayment") {
                ReactDOM.render(
                    <PayPal idusuario={idusuario} idorder={response.data[0][0].orders_id} product_name={producto} precio={precioaPagar.toFixed(2)} cupon={idcupon} />,
                    document.querySelector("#root")
                );
            }

        }).catch((error) => {
            console.log(error.response)
        });

    }






    return (
        <>
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h2>Confirma tu compra</h2>

                            <div className='container'>
                                <Row>
                                    <Col>
                                        <Form.Label style={{ fontWeight: "bold", fontSize: "18px" }}>¿Tienes algun cupón?</Form.Label>
                                        <Row style={{ textAlign: "left" }}>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Control style={{ backgroundColor: "#DFDFDF" }} type="text" name="cupon" onChange={handleChange} placeholder='Ingresa tu cupón' />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Button style={{ backgroundColor: "#E94E1B", borderColor: "#E94E1B" }} onClick={() => { redeemCoupon() }} >Canjear</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col style={{ textAlign: "right", fontSize: "18px" }}>
                                        <div>
                                            <p>Total de productos: <span style={{ fontWeight: "bold" }}>{parametros.cantidadProductos}</span></p>
                                            <p>Descuento aplicado: <span style={{ fontWeight: "bold" }}>${descuento}</span></p>
                                            <p>Total sin descuento: <span style={{ fontWeight: "bold" }}>${parametros.costoTotalAllProductos}</span></p>
                                            <p>Total a pagar: <span style={{ fontWeight: "bold" }}>${precioaPagar}</span></p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            <div className='col-md' style={{ marginTop: "8%" }}>
                                <span style={{ fontWeight: "bold", fontSize: "18px" }}>FORMA DE PAGO</span>
                                <Form>
                                    <Form.Check
                                        type='checkbox'
                                        id="creditCardPayment"
                                        checked={paymentMethod === "creditCardPayment"} onChange={() => handleChangePaymentMethod("creditCardPayment")}
                                        label="Tarjeta de credito, debíto VISA, Master Card"
                                    />
                                    <Form.Check
                                        type='checkbox'
                                        id="payPalPayment"
                                        checked={paymentMethod === "payPalPayment"} onChange={() => handleChangePaymentMethod("payPalPayment")}
                                        label="PayPal"
                                    />
                                    <Form.Check
                                        type='checkbox'
                                        id="oxxoPayment"
                                        checked={paymentMethod === "oxxoPayment"} onChange={() => handleChangePaymentMethod("oxxoPayment")}
                                        label="Pago en OXXO"
                                    />
                                </Form>

                                <hr style={{ height: "5px", backgroundColor: "#EB5929", opacity: 1 }}></hr>
                            </div>



                            <div className='col-md' style={{ marginTop: "8%" }}>
                                <span>Hemos calculado los costos de envio para esta dirección:</span>
                                <div style={{ backgroundColor: "#F5F5F5", padding: 20 }}>
                                    <span>{"CP: " + listDireccion.postal_code + " | "}</span>
                                    <span>{listDireccion.city + " | "}</span>
                                    <span>{listDireccion.avenue + " | "}</span>
                                    <span>{listDireccion.neighborhood + " "}</span>
                                </div>


                            </div>

                            <div style={{ textAlign: "center", marginTop: "5%", marginBottom: "2%" }}>
                                <Button style={{ backgroundColor: "#E94E1B", borderColor: "#E94E1B", margin: "2%", fontSize: "19px", width: "100px" }} onClick={() => { makeAnOrder() }} > Comprar </Button>
                                <Button style={{ backgroundColor: "#E94E1B", borderColor: "#E94E1B", margin: "2%", fontSize: "19px", width: "100px" }} /* onClick={() => { returnToPreviousView() }}  */> Volver </Button>
                            </div>


                        </Col>
                    </Row>
                </Container>
            </div>
            <div><br></br></div>
        </>
    )

}

export default ConfirmOrderModal;