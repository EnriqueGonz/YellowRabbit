import React, { useState } from 'react';
import { Form, Button, Row, Col, Modal, Container, InputGroup } from 'react-bootstrap';
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


var token = localStorage.getItem('tokenClient');
var idusuario = localStorage.getItem('userId');

try {
    // datas(4): user datas, datas order, product datas, payment method, 
    var dataToPayOrder = JSON.parse(localStorage.getItem('dataToPayOrder'));
    var orderData = dataToPayOrder[1];
    var productData = dataToPayOrder[2];
    var getOrderId = dataToPayOrder[3];

} catch (error) {
    //
}

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const PagarConOxxo = () => {
    const [inputsUser, setInputsUser] = useState({
        fullName: "",
        email: "",
    })

    // Show Error
    const [showErrorOxxo, setShowErrorOxxo] = useState(false);
    const [validated, setValidated] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false); // Backend Error Message
    const [finalizingPurchaseMsg, setFinalizingPurchaseMsg] = useState(false); // Finalizing purchase message 
    const [successPurchase, setSuccessPurchase] = useState(false); //successful purchase message
    const stripe = useStripe();


    //Data of the product to pay
    try {
        var dataProductPay = {
            user_id: idusuario,
            order_id: parseInt(getOrderId),
            product_name: productData.product_name,
            price: parseFloat(orderData[0].total_price), // Total price
            currency: 'mxn',
            quantity: parseInt(orderData[0].amount),  // amount of productos
        }
    } catch (error) {
        window.location = '/not/found';
        return;
    }

    function handleChangeOXXO(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
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

        if (validateInputsUser() === true) {
            /*
            * NOTA: OXXO sólo acepta pesos mexicanos en el pago "MXN" por lo tanto en el currency debe de ir 'mxn'
            * quantity y product_name: no son campos necesarios para el método de pago con OXXO
            * Lo mínimo a pagar deben ser $10.00 mxn.
            */
            setFinalizingPurchaseMsg(true);
            setTimeout(() => { makeThePayment(); }, 2000); // sleep 2 seconds
        } else {
            //
        }
    }



    const makeThePayment = async () => {
        setErrorMessage(false);
        setSuccessPurchase(false);

        // Create a payment intent on the server
        const { error: backendError, clientSecret } = await axios.post('https://yellowrabbit.herokuapp.com/payment/api/create-payment-intent-oxxo/', dataProductPay, { headers })
            .then(function (r) {
                return r.data;
            })

        if (backendError) {
            setFinalizingPurchaseMsg(false);
            setSuccessPurchase(false);
            setErrorMessage(true);
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
            setFinalizingPurchaseMsg(false);
            setSuccessPurchase(false);
            setErrorMessage(true);
            return;
        }

        //localStorage.removeItem('dataToPayOrder');
        setErrorMessage(false);
        setFinalizingPurchaseMsg(false);
        setSuccessPurchase(true);
    }


    const handleTryAgain = () => {
        setErrorMessage(false);
        setTimeout(() => { makeThePayment(); }, 2000); // sleep 2 seconds
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


    /*input user message */
    const InputsUserMessage = () => (
        <div style={{ marginBottom: "1%" }}>
            <span style={{ color: "#FF5733" }}>El nombre ingresado no es aceptable</span>
        </div>
    )


    // Close error message
    const hideErrorMessage = () => setErrorMessage(false);
    const hideSuccessPurchase = () => setSuccessPurchase(false);

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
                                <div style={{ fontSize: "19px", paddingLeft: 10, textAlign: "center" }}> <span style={{ color: "#358AE5", fontWeight: "bold" }}>TOTAL A PAGAR: </span> <span style={{ fontWeight: "bold" }}>${orderData[0].total_price} MXN</span></div>

                            </div>
                        </Col>
                        <Col xs lg="4" style={{ padding: 0 }}>
                            <div name="formContent" id='formContent' className='container' style={{ marginTop: "20%" }}>
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
                                        {/* Error message */}
                                        {showErrorOxxo ? <InputsUserMessage /> : null}
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

                                    </Row>

                                    <div style={{ margin: "auto", textAlign: "center" }}>
                                        <Button style={{ float: "right", backgroundColor: "#E94E1B", borderColor: "#E94E1B", width: "auto", fontWeight: "bold", marginBottom: "2%" }} onClick={handleSubmitPayOXXO}>
                                            Procesar pedido
                                        </Button>
                                    </div>
                                </Form>

                            </div>
                        </Col>
                    </Row>

                    {/** MODALS */}
                    {/* Message-error */}
                    <Modal show={errorMessage} onHide={hideErrorMessage}>
                        <Modal.Header closeButton style={{ borderBottom: "0" }}></Modal.Header>
                        <Modal.Body>
                            <div style={{ textAlign: "center" }}>
                                <img alt='error' src={imgErrorOrSuccessOrder} style={{ width: "13%", height: "13%", marginBottom: "3%" }} />
                                <h3>Ha habido un error</h3>
                            </div>
                            <p style={{ color: "#E94E1B", textAlign: "center", fontSize: "17px" }}>Verifica tus datos, tu conexión e inténtalo de nuevo, si el
                                error persiste, contáctanos y te ayudaremos con tu compra.</p>

                            <div style={{ backgroundColor: "#0000", textAlign: "center" }}>
                                <Button style={{ backgroundColor: "#E94E1B", borderStyle: "none", margin: "2%", fontSize: "17px", fontWeight:"600" }} onClick={handleTryAgain}>
                                    Intentar de nuevo
                                </Button>
                                <Button style={{ backgroundColor: "#F7C169", borderStyle: "none", margin: "2%", fontSize: "17px", fontWeight:"600" }}>
                                    Ayuda
                                </Button>
                            </div>
                        </Modal.Body>
                    </Modal>


                    {/* Finishing Purchase  */}
                    <Modal show={finalizingPurchaseMsg}>
                        <Modal.Body>
                            <div style={{ textAlign: "center", marginBottom: "3%" }}>
                                <img alt='error' src={imgFinishingPurchase} style={{ width: "13%", height: "13%", marginBottom: "3%" }} />
                                <h3>Finalizando compra</h3>
                            </div>
                            <p style={{ color: "#E94E1B", textAlign: "center", fontSize: "17px" }}>Este proceso puede tardar unos instantes. no salgas de esta página</p>
                        </Modal.Body>
                    </Modal>


                    {/* Successful purchase message */}
                    <Modal show={successPurchase} onHide={hideSuccessPurchase}>
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

const RealizarPago = () => {
    const stripePromise = loadStripe('pk_test_51K0BPZH8UO4qsCfWtyXUkkwB0qV9Mb0aUYbAC2SGvVdmRIuvTxM58A1tYtriviDsUq0eHEoBTNnI58E8SJP7I5Rv00wCXdhNDJ');
    return (
        <>
            <Appbar></Appbar>
            <div>
                <Elements stripe={stripePromise}>
                    <PagarConOxxo></PagarConOxxo>
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