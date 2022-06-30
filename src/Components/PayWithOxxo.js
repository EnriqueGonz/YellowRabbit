import React, { useState } from 'react';
import { Form, Button, Row, Col, Modal, Container } from 'react-bootstrap';
import Appbar from './appbarClient';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import imgOXXOPay from '../images/icons/iconOxxoPay.svg';
import imgErrorOrSuccessOrder from '../images/icons/iconErrorOrder.svg';
import imgFinishingPurchase from '../images/icons/iconFinishingPurchase.gif';

// Payment
import { loadStripe } from '@stripe/stripe-js';
import { useStripe } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import validator from 'validator';
import CrearEtiqueta from './CrearEtiqueta';


var token = localStorage.getItem('tokenClient');



const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const PagarConOxxo = (parametros) => {

    const stripe = useStripe();
    const [inputsUser, setInputsUser] = useState({
        fullName: "",
        email: "",
    })

    /* Messages */
    const [warnings] = useState({
        warningFullName: "Ingrese su nombre completo.",
        warningEmail: "Ingrese su correo electrónico.",
    })

    // Errors
    const [showErrors, setShowErrors] = useState({
        errFullName: false,
        errEmail: false,
        errorMessage: false,
        successPurchase: false,
        finalizingPurchase: false,
    });


    //Data of the product to pay
    try {
        var dataProductPay = {
            coupon_id: parametros.cupon,
            user: parametros.idusuario,
            order: parametros.idorder,
            product_name: parametros.product_name,
        }
    } catch (error) {
        //window.location = '/not/found';
        return;
    }


    function handleChangeOXXO(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        setInputsUser(values => ({ ...values, [name]: value }))
    }


    function handleSubmitPayOXXO() {
        if (validateInputsUser() === true) {
            /*
            * NOTA: Lo mínimo a pagar en OXXO son $10.00 mxn.
            */
            setShowErrors(values => ({ ...values, "finalizingPurchase": true }));
            setTimeout(() => { makeThePayment(); }, 3000); // sleep 2 seconds
        } else {
            return;
        }
    }



    const makeThePayment = async () => {
        var baseUrl = global.config.yellow.rabbit.url;

        //let 
        let datosEtiqueta = {
            user_id: parametros.idusuario,
            order_id: parametros.idorder,
            carrier: 'paquetexpress', // fedex, dhl, estafeta
            service: 'ground', //express
        }

        // Create a payment intent on the server
        try {
            const { error: backendError, clientSecret } = await axios.post(baseUrl + '/payment/api/create-payment-intent-oxxo/', dataProductPay, { headers })
                .then(function (r) {
                    //crear etiqueta
                    CrearEtiqueta.generarEtiqueta(datosEtiqueta);
                    return r.data;
                })
                .catch((er) => {
                    // Si ya se ha gereado un intento de pago, retornará un error 307: HTTP_307_TEMPORARY_REDIRECT
                    console.log(er.response.status);
                    setShowErrors(values => ({ ...values, "errorMessage": true }));
                    return;
                });


            if (backendError) {
                console.log('Error del backend');
                setShowErrors(values => ({ ...values, "errorMessage": true }));
                return;
            }

            const { error } = await stripe.confirmOxxoPayment(
                clientSecret,
                {
                    payment_method: {
                        billing_details: {
                            name: inputsUser.fullName,
                            email: inputsUser.email,
                        },
                    },
                }
            )


            if (error) {
                setShowErrors(values => ({ ...values, "errorMessage": true }));
                return;
            }

        } catch (err) {
            setShowErrors(values => ({ ...values, "errorMessage": true }));
            return;
        }


        //localStorage.removeItem('dataToPayOrder');
        setInputsUser("");
        setShowErrors(values => ({ ...values, "successPurchase": true }));
    }


    const handleTryAgain = () => {
        setShowErrors(values => ({ ...values, "errorMessage": false }));
        setTimeout(() => { makeThePayment(); }, 2000); // sleep 2 seconds
    }


    function validateInputsUser() {
        setFalseErrors();
        let fullName = inputsUser.fullName;
        let email = inputsUser.email;
        let isValid = true;

        if (validator.isEmpty(fullName)) {
            setShowErrors(values => ({ ...values, "errFullName": true }));
            isValid = false;
        } else {
            let fnArray = fullName.split(/(\s+)/);
            // Remove space
            let rmArray = fnArray.filter(function (str) {
                return /\S/.test(str);
            });

            // Name, Last name, Mother´s last name
            if (rmArray.length < 3) {
                setShowErrors(values => ({ ...values, "errFullName": true }));
                isValid = false;
            }
        }

        if (!validator.isEmail(email)) {
            setShowErrors(values => ({ ...values, "errEmail": true }));
            isValid = false;
        }

        return isValid;
    }

    function setFalseErrors() {
        setShowErrors(values => ({ ...values, "errFullName": false }));
        setShowErrors(values => ({ ...values, "errEmail": false }));
        setShowErrors(values => ({ ...values, "errorMessage": false }));
        setShowErrors(values => ({ ...values, "successPurchase": false }));
        setShowErrors(values => ({ ...values, "finalizingPurchase": false }));
    }

    // Close message
    const hideErrorMessage = () => setFalseErrors();

    function goToDashboard() {
        window.location = '/inicio';
    }

    function keetBuying() {
        window.location = '/productos';
    }


    return (
        <>
            <div>
               
                <Container>
                    <Row className="justify-content-md-center">

                        <Col xs lg="4" style={{ padding: 0 }}>
                            <div>
                                <div style={{ textAlign: "center", marginBottom: "5%" }}>
                                    <img alt='OXXO' src={imgOXXOPay} style={{ width: "80%", height: "100%", marginTop: "20%" }} />
                                </div>
                                <div style={{ fontSize: "19px", paddingLeft: 10, paddingBottom: 6, textAlign: "center" }}>Valor: <span style={{ fontWeight: "bold" }}>MXN</span></div>
                                <div style={{ fontSize: "19px", paddingLeft: 10, textAlign: "center" }}> <span style={{ color: "#358AE5", fontWeight: "bold" }}>TOTAL A PAGAR: </span> <span style={{ fontWeight: "bold" }}>${parametros.precio} MXN</span></div>

                            </div>
                        </Col>
                        <Col xs lg="4" style={{ padding: 0 }}>
                            <div name="formContent" id='formContent' className='container' style={{ marginTop: "20%" }}>
                                <Form style={{ backgroundColor: "#FFFFFF" }}>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="validationCustomUsername">
                                            <Form.Label>Nombre completo</Form.Label>
                                            <Form.Control
                                                style={{ backgroundColor: "#DFDFDF" }}
                                                name="fullName"
                                                value={inputsUser.fullName || ""}
                                                onChange={handleChangeOXXO}
                                                type="text"
                                                aria-describedby="inputGroupPrepend"
                                                placeholder="Nombre y apellidos"
                                                required
                                            />
                                            <div>
                                                <span style={{ color: "#FF5733" }}>{showErrors.errFullName ? warnings.warningFullName : null}</span>
                                            </div>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">

                                        <Form.Group as={Col} controlId="validationCustomUsername">
                                            <Form.Label>Correo electrónico</Form.Label>
                                            <Form.Control
                                                style={{ backgroundColor: "#DFDFDF" }}
                                                name="email"
                                                value={inputsUser.email || ""}
                                                onChange={handleChangeOXXO}
                                                type="email"
                                                aria-describedby="inputGroupPrepend"
                                                placeholder="Correo electrónico"
                                                required
                                            />
                                        </Form.Group>
                                        <div>
                                            <span style={{ color: "#FF5733" }}>{showErrors.errEmail ? warnings.warningEmail : null}</span>
                                        </div>

                                    </Row>

                                    <div style={{ margin: "auto", textAlign: "center" }}>
                                        <Button style={{ float: "right", backgroundColor: "#E94E1B", borderColor: "#E94E1B", width: "auto", fontWeight: "bold", marginBottom: "2%" }} onClick={() => { handleSubmitPayOXXO() }}>
                                            Procesar pedido
                                        </Button>
                                    </div>
                                </Form>

                            </div>
                        </Col>
                    </Row>

                    {/** MODALS */}
                    {/* Message-error */}
                    <Modal show={showErrors.errorMessage} onHide={hideErrorMessage}>
                        <Modal.Header closeButton style={{ borderBottom: "0" }}></Modal.Header>
                        <Modal.Body>
                            <div style={{ textAlign: "center" }}>
                                <img alt='error' src={imgErrorOrSuccessOrder} style={{ width: "13%", height: "13%", marginBottom: "3%" }} />
                                <h3>Ha habido un error</h3>
                            </div>
                            <p style={{ color: "#E94E1B", textAlign: "center", fontSize: "17px" }}>Verifica tus datos, tu conexión e inténtalo de nuevo, si el
                                error persiste, contáctanos y te ayudaremos con tu compra.</p>

                            <div style={{ backgroundColor: "#0000", textAlign: "center" }}>
                                <Button style={{ backgroundColor: "#E94E1B", borderStyle: "none", margin: "2%", fontSize: "17px", fontWeight: "600" }} onClick={handleTryAgain}>
                                    Intentar de nuevo
                                </Button>
                                <Button style={{ backgroundColor: "#F7C169", borderStyle: "none", margin: "2%", fontSize: "17px", fontWeight: "600" }}>
                                    Ayuda
                                </Button>
                            </div>
                        </Modal.Body>
                    </Modal>


                    {/* Finishing Purchase  */}
                    <Modal show={showErrors.finalizingPurchase}>
                        <Modal.Body>
                            <div style={{ textAlign: "center", marginBottom: "3%" }}>
                                <img alt='error' src={imgFinishingPurchase} style={{ width: "13%", height: "13%", marginBottom: "3%" }} />
                                <h3>Finalizando compra</h3>
                            </div>
                            <p style={{ color: "#E94E1B", textAlign: "center", fontSize: "17px" }}>Este proceso puede tardar unos instantes. no salgas de esta página</p>
                        </Modal.Body>
                    </Modal>


                    {/* Successful purchase message */}
                    <Modal show={showErrors.successPurchase} onHide={hideErrorMessage}>
                        <Modal.Body>
                            <div style={{ textAlign: "center", marginBottom: "3%" }}>
                                <img alt='error' src={imgErrorOrSuccessOrder} style={{ width: "12%", height: "12%", marginBottom: "1%" }} />
                                <h3>Tu compra ha sido un éxito</h3>
                            </div>
                            <p style={{ color: "#EB5929", textAlign: "center", fontSize: "17px" }}>Gracias por comprar con nosotros, en breve recibirás un correo con los datos de tu compra y envío</p>
                            <div style={{ backgroundColor: "#0000", textAlign: "center" }}>
                                <Button style={{ backgroundColor: "#EB5929", borderStyle: "none", margin: "2%", fontSize: "17px" }} onClick={() => { keetBuying() }}>
                                    Seguir comprando
                                </Button>
                                <Button style={{ backgroundColor: "#EB5929", borderStyle: "none", margin: "2%", fontSize: "17px" }} onClick={() => { goToDashboard() }}>
                                    Ir a inicio
                                </Button>
                            </div>
                        </Modal.Body>
                    </Modal>


                </Container>
            </div>
        </>
    )
}

const RealizarPago = (parametros) => {
    const stripePromise = loadStripe('pk_test_51K0BPZH8UO4qsCfWtyXUkkwB0qV9Mb0aUYbAC2SGvVdmRIuvTxM58A1tYtriviDsUq0eHEoBTNnI58E8SJP7I5Rv00wCXdhNDJ');
    return (
        <>
            <Appbar></Appbar>
            <div>
                <Elements stripe={stripePromise}>
                    <PagarConOxxo idusuario={parametros.idusuario} idorder={parametros.idorder} product_name={parametros.product_name} precio={parametros.precio} cupon={parametros.cupon}></PagarConOxxo>
                </Elements>
            </div>
            {/**
            <div style={{ position: "absolute", left: "0", bottom: "0", right: "0" }}>
                <Footer></Footer>
            </div>
            */}
        </>
    )
}


export default RealizarPago