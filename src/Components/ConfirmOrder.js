import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container, Modal } from 'react-bootstrap';
import Appbar from './appbarClient';
import Footer from './footer';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import imgErrorOrder from '../images/icons/iconErrorOrder.svg';


var token = localStorage.getItem('tokenClient');
var idusuario = localStorage.getItem('userId');
var username = localStorage.getItem('usernameClient');


const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


var arrOrderSpecification = JSON.parse(localStorage.getItem('orderSpecifications'));
var opcion = undefined;
var shippingCost = 200.00;
var discountApplied = "0.0 %";
var pricePlusShipping = undefined;


const ConfirmOrder = () => {
    const [listProducto, setListProducto] = useState([]);
    const [orderSpecifications, setOrderSpecifications] = useState([]);
    const [listDirecciones, setlistDirecciones] = useState([]);
    const [inputCoupon, setInputCoupon] = useState([]);
    const [totalToPay, setTotalToPay] = useState([]);
    const [usedCoupon, setUsedCoupon] = useState(false);
    // Show invalid coupon message
    const [show, setShow] = useState(false);
    // Show message to select a payment method
    const [showSelectPayment, setShowSelectPayment] = useState(false);
    // Show message to select an address
    const [showSelectAddress, setshowSelectAddress] = useState(false);
    // Orders
    const [showErrorOrder, setShowErrorOrder] = useState(false);

    // Id of the selected address
    const [idSelectedAddress, setIdSelectedAddress] = useState(false);
    // Select Payment method
    const [paymentMethod, setPaymentMethod] = useState(null);

    // Address
    const [inputsDireccion, setinputsDireccion] = useState({
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
    })

    const [productSpecifications, setProductSpecifications] = useState([]);
    const [datasMakeOrder, setDatasMakeOrder] = useState([]);


    useEffect(() => {
        try {
            Object.entries(arrOrderSpecification).forEach(([key, value]) => {
                switch (parseInt(key)) {

                    case 0:
                        setListProducto(value);
                        break;
                    case 1:
                        opcion = value;
                        break;
                    case 2:
                        setProductSpecifications(value);
                        break;
                    case 3:
                        setOrderSpecifications(value);
                        pricePlusShipping = value.total_price + shippingCost;
                        setTotalToPay(pricePlusShipping);

                    default:
                        break;
                }
            });
        } catch (error) {
            console.log(' . ', error);
        }

        // Addresses
        try {
            axios.get('https://yellowrabbit.herokuapp.com/addresses/api/my-addresses/' + username + "/", { headers })
                .then((response) => {
                    setlistDirecciones(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(' . ', error);
        }
    }, [setListProducto])



    function redeemCoupon() {
        try {
            axios.post('https://yellowrabbit.herokuapp.com/redeemedcoupons/api/get-discount/' + username + "/", {
                coupon_key: inputCoupon,
                total_price: parseFloat(pricePlusShipping)
            }, { headers }) // LIOSEJ174678
                .then((response) => {
                    var datasRC = response.data;
                    discountApplied = datasRC.discount_applied;
                    let totalPriceTD = (Math.round(parseFloat(datasRC.discounted_price) * 100) / 100);
                    setTotalToPay(totalPriceTD);
                    setUsedCoupon(true);
                    setShow(false);
                })
                .catch((error) => {
                    setUsedCoupon(false);
                    // The coupon you are trying to access does not exist or is expired
                    if (error.response.status === 406) {
                        setShow(true);
                    }
                });
        } catch (error) {
            console.log('Error: ', error);
        }
    }


    const handleSubmitDireccion = (event) => {
        axios.post('https://yellowrabbit.herokuapp.com/addresses/api/register/', {
            user: idusuario,
            street: inputsDireccion.street,
            avenue: inputsDireccion.avenue,
            neighborhood: inputsDireccion.neighborhood,
            street_number: inputsDireccion.street_number,
            apartment_number: inputsDireccion.apartment_number,
            postal_code: inputsDireccion.postal_code,
            city: inputsDireccion.city,
            state: inputsDireccion.state,
            additional_data: inputsDireccion.additional_data,
        }, { headers }
        ).then((response) => {
            setlistDirecciones(response.data);
        })
            .catch(err => console.log(err));

        cancelAddress();
        return false;

    }

    function methodAddDireccion() {
        document.getElementById('formContent').style.display = "block";
    }

    // Cancel address registration
    function cancelAddress() {
        // Hide
        document.getElementById('formContent').style.display = "none";
    }


    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        console.log(name + value)
        setinputsDireccion(values => ({ ...values, [name]: value }))
    }

    function handleChangeCoupon(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        setInputCoupon(value);
        evt.preventDefault();
    }

    const handleChangeSelectedAddress = (item) => {
        item === idSelectedAddress ? setIdSelectedAddress(null) : setIdSelectedAddress(item);
    };

    const handleChangePaymentMethod = (item) => {
        item === paymentMethod ? setPaymentMethod(null) : setPaymentMethod(item);
    };


    /* Alerts */
    // Invalid coupon
    const InvalidCoupon = () => (
        <div style={{ marginTop: "1%" }}>
            <span style={{ color: "#FF5733" }}>Código de cupón no válido</span>
        </div>
    )

    /* Select a payment method message */
    const PaymentMethodMessage = () => (
        <div style={{ marginTop: "1%" }}>
            <span style={{ color: "#FF5733" }}>Selecciona un método de pago.</span>
        </div>
    )

    /* Select a address message */
    const SelectAddressMessage = () => (
        <div style={{ marginTop: "1%" }}>
            <span style={{ color: "#FF5733" }}>Selecciona una dirección.</span>
        </div>
    )

    // Validate address and payment method
    function validateAddresPaymentM() {
        if (paymentMethod === "" || paymentMethod === undefined || paymentMethod === NaN || paymentMethod === null || paymentMethod === false || paymentMethod === 0) {
            setShowSelectPayment(true);
            return false;
        }
        else {
            setShowSelectPayment(false);
        }

        if (idSelectedAddress === "" || idSelectedAddress === undefined || idSelectedAddress === NaN || idSelectedAddress === null || idSelectedAddress === false || idSelectedAddress === 0) {
            setshowSelectAddress(true);
            return false;
        }
        else {
            setshowSelectAddress(false);
        }

        return true;
    }


    function makeAnOrder() {
        let getcolor = productSpecifications.color;
        let getsize = productSpecifications.size;
        let getflavor = productSpecifications.flavor;

        let setSize = "";
        let setColor = "";
        let setFlavor = "";

        // size
        if (getsize) {
            setSize = "Talla: " + getsize + ", ";
        }
        // color
        if (getcolor) {
            setColor = getcolor = "Color: " + getcolor + ", ";
        }
        // Flavor
        if (getflavor) {
            setFlavor = "Sabor: " + getflavor + ", ";
        }

        let strSpecifications = setSize + "" + setColor + "" + setFlavor;
        let rowOrder = [];

        if (validateAddresPaymentM() === true) {
            let datasUserRow = {
                user: parseInt(idusuario),
                addresses: parseInt(idSelectedAddress),
                delivery_number: "",
                date_delivery: "",
                status: "Pendiente"
            }

            let datasOrderRow = {
                products: parseInt(listProducto.id),
                amount: parseInt(orderSpecifications.amount),
                unit_price: parseFloat(listProducto.price),
                total_price: parseFloat(totalToPay),
                specifications: strSpecifications
            }

            rowOrder.push([datasUserRow]);
            rowOrder.push([datasOrderRow]);

            try {
                axios.post('https://yellowrabbit.herokuapp.com/orders/api/register/', { //http://127.0.0.1:8000/orders/api/register/
                    order: rowOrder 
                }, { headers }
                ).then((response) => {
                    // Redireccionar a la vista de formas de Pago
                    rowOrder.push(listProducto);
                    rowOrder.push(paymentMethod);
                    rowOrder.push(usedCoupon);
                    // save the data to make the payment
                    localStorage.setItem('dataToPayOrder', JSON.stringify(rowOrder));
                    window.location = '/realizar/pago';
                }).catch((error) => {
                    setShowErrorOrder(true);
                });
            } catch (error) {
                setShowErrorOrder(true);
            }
        } else {
            //setShowSelectPayment(true);
            //setshowSelectAddress(true);
        }
    }


    function returnToPreviousView() {
        window.location = '/article/details/' + listProducto.id;
    }

    // close Orders error
    const handleTryAgain = () => {
        setShowErrorOrder(false);
        setTimeout(() => { makeAnOrder(); }, 2000); // sleep 2 seconds
    };

    const handleCloseTryAgain = () => {
        setShowErrorOrder(false);
    };



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
                                            <Form.Control style={{ backgroundColor: "#DFDFDF" }} type="text" name="coupon" value={inputCoupon} onChange={handleChangeCoupon} placeholder='Ingresa tu cupón' />
                                        </Form.Group>
                                        {/* Show invalid coupon message */}
                                        {show ? <InvalidCoupon /> : null}


                                    </Col>
                                    <Col><Button style={{ backgroundColor: "#E94E1B", borderColor: "#E94E1B" }} onClick={() => { redeemCoupon() }}>Canjear</Button></Col>
                                </Row>
                            </div>
                            <br></br>

                            <div className='container'>
                                <Row>
                                    <Col style={{ textAlign: "right", fontSize: "18px" }}>
                                        <p>Precio por producto: <span style={{ fontWeight: "bold" }}>${listProducto.price}</span> </p>
                                        <p>Precio total: <span style={{ fontWeight: "bold" }}>${orderSpecifications.total_price}</span></p>
                                        <p>Total de productos: <span style={{ fontWeight: "bold" }}> {orderSpecifications.amount}</span></p>
                                        <p>Descuento: <span style={{ fontWeight: "bold" }}> {discountApplied}</span></p>
                                        <p>Costo de envío: <span style={{ fontWeight: "bold" }}>${shippingCost}</span></p>
                                        <p>Total a pagar: <span style={{ fontWeight: "bold" }}>${totalToPay}</span></p>
                                    </Col>
                                    <Col></Col>
                                    {/*
                                    <Col style={{ textAlign: "left", borderLeft: "5px solid #C4C4C4", fontSize: "18px" }}>
                                        <p>$ {listProducto.price}</p>
                                        <p>$ {orderSpecifications.total_price}</p>
                                        <p> {orderSpecifications.amount}</p>
                                        <p> {discountApplied} </p>
                                        <p>$ {shippingCost} </p>
                                        <p>$ {totalToPay}</p>
                                    </Col>
                                    */}

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
                                    <Form.Check
                                        type='checkbox'
                                        id="transferPayment"
                                        checked={paymentMethod === "transferPayment"} onChange={() => handleChangePaymentMethod("transferPayment")}
                                        label="Transferencia electrónica"
                                    />

                                    {/* Show message to select a payment method */}
                                    {showSelectPayment ? <PaymentMethodMessage /> : null}

                                </Form>
                                <hr style={{ height: "5px", backgroundColor: "#EB5929", opacity: 1 }}></hr>
                            </div>



                            <div className='col-md' style={{ marginTop: "8%" }}>
                                <span style={{ fontWeight: "bold", fontSize: "18px" }}>DIRECCIÓN</span>

                                <div className=''>
                                    {listDirecciones.map((item, index) => (
                                        <div key={index} className="row">
                                            <div className="col">
                                                <p style={{ margin: "0px", paddingTop: "0px" }}>DIRECCION #{index}</p>
                                                <div style={{ backgroundColor: "#DFDFDF", padding: "10px" }}>
                                                    <Form.Check
                                                        type='checkbox'
                                                        id={index}
                                                        checked={idSelectedAddress === item.id} onChange={() => handleChangeSelectedAddress(item.id)}
                                                        label={item.street + " " + item.avenue + " " + item.street_number + ", N°" + item.apartment_number + ", " + item.neighborhood + " " + item.city + " " + item.state + " C.P: " + item.postal_code}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Show message to select an address */}
                                    {showSelectAddress ? <SelectAddressMessage /> : null}

                                </div>
                                <div className="" style={{ padding: "20px", textAlign: "right" }}>
                                    <a href='#formContent' className='btn row' style={{ color: "white", backgroundColor: "#E94E1B", borderColor: "#E94E1B" }} onClick={() => { methodAddDireccion() }}>Agregar Direccion</a>
                                </div>


                                <div name="formContent" id='formContent' className='container' style={{ display: "none", width: "90%", paddingTop: 50 }}>
                                    <Form onSubmit={handleSubmitDireccion}>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="">
                                                <Form.Label>Calle</Form.Label>
                                                <Form.Control style={{ backgroundColor: "#DFDFDF" }} required type="text" name="street" value={inputsDireccion.street} onChange={handleChange} />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="">
                                                <Form.Label>Barrio/Colonia</Form.Label>
                                                <Form.Control style={{ backgroundColor: "#DFDFDF" }} required type="text" name="neighborhood" value={inputsDireccion.neighborhood} onChange={handleChange} />
                                            </Form.Group>

                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="">
                                                <Form.Label>Avenida</Form.Label>
                                                <Form.Control style={{ backgroundColor: "#DFDFDF" }} required type="text" name="avenue" value={inputsDireccion.avenue} onChange={handleChange} />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="">
                                                <Form.Label>Numero de calle</Form.Label>
                                                <Form.Control style={{ backgroundColor: "#DFDFDF" }} required type="number" name="street_number" value={inputsDireccion.street_number} onChange={handleChange} />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="">
                                                <Form.Label>Numero de casa</Form.Label>
                                                <Form.Control style={{ backgroundColor: "#DFDFDF" }} required type="number" name="apartment_number" value={inputsDireccion.apartment_number} onChange={handleChange} />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="">
                                                <Form.Label>Codigo Postal (CP)</Form.Label>
                                                <Form.Control style={{ backgroundColor: "#DFDFDF" }} required type="number" name="postal_code" value={inputsDireccion.postal_code} onChange={handleChange} />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="">
                                                <Form.Label>Ciudad/Pueblo</Form.Label>
                                                <Form.Control style={{ backgroundColor: "#DFDFDF" }} required type="text" name="city" value={inputsDireccion.city} onChange={handleChange} />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="">
                                                <Form.Label>Estado</Form.Label>
                                                <Form.Control style={{ backgroundColor: "#DFDFDF" }} required type="text" name="state" value={inputsDireccion.state} onChange={handleChange} />
                                            </Form.Group>
                                        </Row>
                                        <Form.Group className="mb-3" controlId="">
                                            <Form.Label>Informacion adicional</Form.Label>
                                            <Form.Control style={{ backgroundColor: "#DFDFDF" }} as="textarea" required type="text" name="additional_data" value={inputsDireccion.additional_data} onChange={handleChange} />
                                        </Form.Group>
                                        <Button style={{ marginLeft: 10, float: "right", backgroundColor: "#E94E1B", borderColor: "#E94E1B" }} onClick={handleSubmitDireccion}>
                                            Agregar
                                        </Button>
                                        <Button style={{ marginLeft: 10, float: "right", backgroundColor: "#E94E1B", borderColor: "#E94E1B" }} onClick={() => { cancelAddress() }}>
                                            Cancelar
                                        </Button>
                                    </Form>
                                </div><br></br><br></br>

                            </div>

                            <div style={{ textAlign: "center", marginTop: "5%", marginBottom: "2%" }}>
                                <Button style={{ backgroundColor: "#E94E1B", borderColor: "#E94E1B", margin: "2%", fontSize: "19px", width: "100px" }} onClick={() => { makeAnOrder() }}> Comprar </Button>
                                <Button style={{ backgroundColor: "#E94E1B", borderColor: "#E94E1B", margin: "2%", fontSize: "19px", width: "100px" }} onClick={() => { returnToPreviousView() }} > Volver </Button>
                            </div>
                            <hr style={{ height: "5px", backgroundColor: "#EB5929", opacity: 1 }}></hr>

                        </Col>
                    </Row>
                </Container>
            </div>
            <div><br></br></div>

            <Modal show={showErrorOrder} onHide={handleCloseTryAgain}>
            <Modal.Header closeButton style={{ borderBottom:"0" }}></Modal.Header>
                <Modal.Body>
                    <div style={{ textAlign: "center", marginBottom: "3%" }}>
                        <img alt='error' src={imgErrorOrder} style={{ width: "12%", height: "12%", marginBottom:"1%" }} />
                        <h3>Ha habido un error</h3>
                    </div>
                    <p style={{ color: "#EB5929", textAlign: "center", fontSize: "17px" }}>Verifica tus datos, tu conexión e inténtalo de nuevo, si el
                        error persiste, contáctanos y te ayudaremos con tu compra.</p>

                    <div style={{ backgroundColor: "#0000", textAlign: "center" }}>
                        <Button style={{ backgroundColor: "#EB5929", borderStyle: "none", margin: "2%", fontSize: "17px" }} onClick={handleTryAgain}>
                            Intentar de nuevo
                        </Button>
                        <Button style={{ backgroundColor: "#EB5929", borderStyle: "none", margin: "2%", fontSize: "17px" }}>
                            Ayuda
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            <Footer></Footer>
        </>
    )

}

export default ConfirmOrder;