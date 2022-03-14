import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Modal, Container, OverlayTrigger, Tooltip, InputGroup } from 'react-bootstrap';
import Appbar from './appbarClient';
import Footer from './footer';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MdOutlineFavorite, MdAddShoppingCart, MdAdd, MdRemove } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imgOXXOPay from '../images/icons/iconOxxoPay.svg';


var token = localStorage.getItem('tokenClient');
var idusuario = localStorage.getItem('userId');
var username = localStorage.getItem('usernameClient');

// datas(4): user datas, datas order, product datas, payment method
var dataToPayOrder = JSON.parse(localStorage.getItem('dataToPayOrder'));
var orderData = dataToPayOrder[1];
var productData = dataToPayOrder[2];
var paymentMethod = dataToPayOrder[3];
var usedCoupon = dataToPayOrder[4];
// Remocer estos datos al finalizar la compra
//localStorage.removeItem('dataToPayOrder');

// STRIPE
var stripe;
var fullName = undefined;
var email = undefined;

// CREDIT CARD


const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const RealizarPago = () => {
    const [inputsUser, setInputsUser] = useState({
        fullName: "",
        email: "",
    })

    // Show Error
    const [showErrorOxxo, setShowErrorOxxo] = useState(false);
    const [validated, setValidated] = useState(false);

    // Product data to pay
    var productDataPay = {
        product_name: productData.product_name,
        price: parseFloat(orderData[0].total_price), // Total price
        currency: 'mxn',
        quantity: parseInt(orderData[0].amount),  // Cantidad de productos. 
    };



    function handleChangeOXXO(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        console.log(name + value);
        setInputsUser(values => ({ ...values, [name]: value }))
    }


    function handleSubmitPayOXXO(event) {
        setShowErrorOxxo(false);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        console.log(' - - - ', validateInputsUser());
        // Validar campos
    }

    function validateInputsUser() {
        let userFullName = inputsUser.fullName;
        var fnArray = userFullName.split(/(\s+)/);
        // Remove space
        let rmArray = fnArray.filter(function (str) {
            return /\S/.test(str);
        });

        // Name, Last name, Mother´s last name
        if (rmArray.length >= 3) {
            setShowErrorOxxo(false);
            return true;
        } else {
            if (rmArray.length >= 1) {
                setShowErrorOxxo(true);
                return false;
            }
        }
    }


    /* Select a payment method message */
    const InputsUserMessage = () => (
        <div style={{ marginBottom: "1%" }}>
            <span style={{ color: "#FF5733" }}>El nombre ingresado no es aceptable</span>
        </div>
    )



    return (
        <>
            <Appbar></Appbar>
            <div>
                <Container>
                    <Row className="justify-content-md-center">

                        <Col xs lg="4" style={{ padding: 0 }}>
                            <div>
                                <div style={{ textAlign: "center", marginBottom: "5%" }}>
                                    <img alt='OXXO' src={imgOXXOPay} style={{ width: "80%", height: "100%", paddingTop: 50 }} />
                                </div>
                                <div style={{ fontSize: "19px", paddingLeft: 10, paddingBottom: 6, textAlign: "center" }}>Valor: <span style={{ fontWeight: "bold" }}>MXN</span></div>
                                <div style={{ fontSize: "19px", paddingLeft: 10, textAlign: "center" }}> <span style={{ color: "#358AE5", fontWeight: "bold" }}>TOTAL A PAGAR: </span> <span style={{ fontWeight: "bold" }}>${orderData[0].total_price} MXN</span></div>

                            </div>
                        </Col>
                        <Col xs lg="4" style={{ padding: 0 }}>
                            <div name="formContent" id='formContent' className='container' style={{ paddingTop: 50 }}>
                                <Form noValidate validated={validated} onSubmit={handleSubmitPayOXXO} style={{ backgroundColor: "#FFFFFF" }}>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="validationCustomUsername">
                                            <Form.Label>Nombre completo</Form.Label>
                                            <InputGroup hasValidation>
                                                <Form.Control
                                                    style={{ backgroundColor: "#DFDFDF" }}
                                                    name="fullName"
                                                    value={inputsUser.fullName}
                                                    onChange={handleChangeOXXO}
                                                    type="text"
                                                    aria-describedby="inputGroupPrepend"
                                                    required
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Por favor, ingrese su nombre completo.
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">

                                        <Form.Group as={Col} controlId="validationCustomUsername">
                                            <Form.Label>Correo electrónico</Form.Label>
                                            <InputGroup hasValidation>
                                                <Form.Control
                                                    style={{ backgroundColor: "#DFDFDF" }}
                                                    name="email"
                                                    value={inputsUser.email}
                                                    onChange={handleChangeOXXO}
                                                    type="email"
                                                    aria-describedby="inputGroupPrepend"
                                                    required
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Por favor, ingrese su correo electrónico.
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>

                                        {showErrorOxxo ? <InputsUserMessage /> : null}
                                    </Row>

                                    <div style={{ margin: "auto", textAlign: "center" }}>
                                        <Button style={{ float: "right", backgroundColor: "#E94E1B", borderColor: "#E94E1B", width: "auto", fontWeight: "bold" }} onClick={handleSubmitPayOXXO}>
                                            Procesar pedido
                                        </Button>
                                    </div>
                                </Form>

                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )

}


export default RealizarPago