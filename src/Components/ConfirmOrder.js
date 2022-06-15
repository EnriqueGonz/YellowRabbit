import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import Appbar from './appbarClient';
import Footer from './footer';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
//import imgErrorOrder from '../images/icons/iconErrorOrder.svg';
import PayWithCreditCard from "./PayWithCreditCard.js";
import '../config';
import { useParams } from 'react-router-dom';
import ReactDOM from 'react-dom'

import PayPal from './PayPal';
import PayWithOxxo from './PayWithOxxo';


var baseUrl = global.config.yellow.rabbit.url;


var token = localStorage.getItem('tokenClient');
var idusuario = localStorage.getItem('userId');
var username = localStorage.getItem('usernameClient');
var idcupon = 0;
var descuento = 0;




const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};



const ConfirmOrder = (parametros) => {
    //var { idProducto, cantidad, precio } = useParams(); // params

    const [listProducto, setListProducto] = useState([]);
    const [listDireccion, setlistDireccion] = useState([]);
    const [descuento, setDescuento] = useState(0);
    const [precioDescuento, setprecioDescuento] = useState(parametros.precio);
    const [precioTotal, setprecioTotal] = useState(0);

    const [paymentMethod, setPaymentMethod] = useState(null);

    // Address
    /* const [inputsDireccion, setinputsDireccion] = useState({
        user: 0,
        street: "",
        avenue: "",
        neighborhood: "",
        street_number: 0,
        apartment_number: "",
        postal_code: 0,
        city: "",
        state: "",
        additional_data: "",
    }) */

    const [inputCupon, setinputCupon] = useState({
        cupon: "",
    })

    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        //console.log(name + " " + value)
        setinputCupon((values => ({ ...values, [name]: value })))
    }

    //Productos
    useEffect(() => {
        try {
            axios.get('https://yellowrabbit.herokuapp.com/products/api/specific-product/' + parametros.idproducto + '/')
                .then((response) => {
                    //console.log(response);
                    setListProducto(response.data[0][0])
                    setprecioTotal(response.data[0][0].price * parametros.cantidad)
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setListProducto])


    //Direccion
    useEffect(() => {
        axios.get('https://yellowrabbit.herokuapp.com/addresses/api/my-addresses/' + username + "/", { headers })
            .then((response) => {
                console.log(response.data[0])
                setlistDireccion(response.data[0])
            })
            .catch((error) => {
                console.log(error);
            });
    }, [setlistDireccion])

    //Cupon
    function redeemCoupon() {
        console.log(inputCupon.cupon);
        axios.post('https://yellowrabbit.herokuapp.com/redeemedcoupons/api/get-discount/' + username + "/", {
            coupon_key: 'BYOasOZO160661',
            total_price: (parametros.precio)
        }, { headers }) // LIOSEJ174678 // BYOOZO160661 IOLHEA842712
            .then((response) => {
                console.log(response.data)
                idcupon = response.data.id
                setDescuento( descuento + response.data.discounted_amount)
                setprecioDescuento(parametros.precio - response.data.discounted_amount)
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
        let datasUserRow = {
            user: idusuario,
            addresses: listDireccion.id,
        }

        let datasOrderRow = {
            products: parametros.idproducto,
            amount: parametros.cantidad,
        }

        rowOrder.push([datasUserRow]);
        rowOrder.push([datasOrderRow]);

        axios.post(baseUrl + '/orders/api/register/', {
            order: rowOrder
        }, { headers }
        ).then((response) => {
            console.log(response.data)
            //notifyCouponRedemption(listDataOrder.id);

            if (paymentMethod === "creditCardPayment") {
                let dataProductPay = {
                    coupon_id: idcupon,
                    user: idusuario,
                    order: response.data[0][0].orders_id,
                    product_name: listProducto.product_name,
                }

                PayWithCreditCard.payWithCreditCard(dataProductPay);
            }


            if (paymentMethod === "oxxoPayment") {
                /* window.location.href = "/pagar/con/oxxo/" + idusuario + "/" + response.data[0][0].orders_id + "/" + listProducto.product_name + "/" + precioDescuento */
                ReactDOM.render(
                    <PayWithOxxo idusuario={idusuario} idorder={response.data[0][0].orders_id} product_name={listProducto.product_name} precio={precioDescuento} />,
                    document.querySelector("#root")
                );
                
            }

            if (paymentMethod === "payPalPayment") {
                ReactDOM.render(
                    <PayPal idusuario={idusuario} idorder={response.data[0][0].orders_id} product_name={listProducto.product_name} precio={precioDescuento} />,
                    document.querySelector("#root")
                );

            }





        }).catch((error) => {
            console.log(error)
        });




    }






    return (
        <>
            <Appbar></Appbar>
            <div>
                <Container>
                    <Row>
                        <Col>
                            <div style={{ margin: "3%", fontWeight: "bold", textAlign: "center" }}><h2>Confirma tu compra</h2></div>
                            <div>
                                <img alt='' style={{ width: "90%", height: 350 }} src={'https://yellowrabbitbucket.s3.amazonaws.com/' + listProducto.image_one} />
                            </div>
                        </Col>
                        <Col>
                            <div className='col-md'>
                                <div className='container' style={{ marginTop: "10%" }}>
                                    <h2 style={{ color: "#E94E1B" }}>{listProducto.product_name}</h2>
                                </div>
                            </div>

                            <div className='container'>
                                <br></br>
                                <Row style={{ textAlign: "left" }}>
                                    <Col><Form.Label style={{ fontWeight: "bold", fontSize: "18px" }}>¿Tienes algun cupón?</Form.Label></Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Control style={{ backgroundColor: "#DFDFDF" }} type="text" name="cupon" onChange={handleChange} placeholder='Ingresa tu cupón' />
                                        </Form.Group>

                                    </Col>
                                    <Col><Button style={{ backgroundColor: "#E94E1B", borderColor: "#E94E1B" }} onClick={() => { redeemCoupon() }} >Canjear</Button></Col>
                                </Row>
                            </div>
                            <br></br>

                            <div className='container'>
                                <Row>

                                    <Col style={{ textAlign: "right", fontSize: "18px" }}>
                                        <div>
                                            <p>Precio por producto: <span style={{ fontWeight: "bold" }}>${listProducto.price}</span> </p>
                                            <p>Total de productos: <span style={{ fontWeight: "bold" }}>{parametros.cantidad}</span></p>
                                            {/* <p>Costo de envío: <span style={{ fontWeight: "bold" }}>${costoEnvio}</span></p> */}
                                            <p>Descuento aplicado: <span style={{ fontWeight: "bold" }}>${descuento}</span></p>
                                            <p>Total sin descuento: <span style={{ fontWeight: "bold" }}>${precioTotal}</span></p>
                                            <p>Total a pagar: <span style={{ fontWeight: "bold" }}>${precioDescuento}</span></p>
                                        </div>
                                    </Col>

                                    <Col></Col>

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

            <Footer></Footer>
        </>
    )

}

export default ConfirmOrder;