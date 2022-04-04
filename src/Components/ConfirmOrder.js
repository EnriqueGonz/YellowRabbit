import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Container, Modal } from 'react-bootstrap';
import Appbar from './appbarClient';
import Footer from './footer';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import imgErrorOrder from '../images/icons/iconErrorOrder.svg';
import PayWithCreditCard from "./PayWithCreditCard.js";


var token = localStorage.getItem('tokenClient');
var idusuario = localStorage.getItem('userId');
var username = localStorage.getItem('usernameClient');


const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};

const headersCosto = {
    'Authorization': 'Bearer e41beebfc9fa4a0e05231638cb9abf2f0009872ec9de73ed58e41f81ae293b9c'
};


var arrOrderSpecification = JSON.parse(localStorage.getItem('orderSpecifications'));
var opcion = undefined;
var shippingCost = 0;
var discountApplied = 0;
var pricePlusShipping = undefined;


const ConfirmOrder = () => {

    const [showCalEnvio, setshowCalEnvio] = useState(false);
    const handleCloseCalEnvio = () => setshowCalEnvio(false);
    const handleShowCalEnvio = () => setshowCalEnvio(true);

    const [listProducto, setListProducto] = useState([]);
    const [listDataUser, setlistDataUser] = useState([]);
    const [orderSpecifications, setOrderSpecifications] = useState([]);
    const [listDirecciones, setlistDirecciones] = useState([]);
    const [inputCoupon, setInputCoupon] = useState([]);
    const [totalToPay, setTotalToPay] = useState([]);
    // shipping price
    const [quotedShippingPrice, setQuotedShippingPrice] = useState([]);
    //
    const [idCoupon, setIdCoupon] = useState(0);
    const [newIdOrder, setNewIdOrder] = useState(0);
    // Show invalid coupon message
    const [show, setShow] = useState(false);
    // Show message to select a payment method
    const [showSelectPayment, setShowSelectPayment] = useState(false);
    // Show message to select an address
    const [showSelectAddress, setshowSelectAddress] = useState(false);
    // Try ordering again
    const [showErrorOrder, setShowErrorOrder] = useState(false);
    // Try to pay again
    const [showErrorPayAgain, setShowErrorPayAgain] = useState(false);

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

    useEffect(() => {
        try {
            axios.get('https://yellowrabbit.herokuapp.com/users/api/my-account/' + username + "/", { headers })
                .then((response) => {
                    setlistDataUser(response.data);
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error)
            
        }

    },[setlistDataUser])



    function redeemCoupon() {
        setTotalToPay(pricePlusShipping);
        try {
            axios.post('https://yellowrabbit.herokuapp.com/redeemedcoupons/api/get-discount/' + username + "/", {
                coupon_key: inputCoupon,
                total_price: parseFloat(pricePlusShipping)
            }, { headers }) // LIOSEJ174678 // BYOOZO160661
                .then((response) => {
                    var datasRC = response.data;                    
                    if (datasRC.discounted_price){
                        let totalPriceTD = (Math.round(parseFloat(datasRC.discounted_price) * 100) / 100);
                        discountApplied = (Math.round(parseFloat(datasRC.discounted_amount) * 100) / 100); //datasRC.discount_applied;
                        setTotalToPay(totalPriceTD);
                        setIdCoupon(datasRC.id);
                        setShow(false);
                    }else{
                        setShow(true);
                        setIdCoupon(0);
                    }
                })
                .catch((error) => {
                    // The coupon you are trying to access does not exist or is expired
                    if (error.response.status === 404 | error.response.status === 208) {
                        setShow(true);
                        setIdCoupon(0);
                    }
                });
        } catch (error) {
            setIdCoupon(0);
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
            <span style={{ color: "#FF5733" }}>Cupón no válido o expirado.</span>
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
                axios.post('https://yellowrabbit.herokuapp.com/orders/api/register/', {
                    order: rowOrder
                }, { headers }
                ).then((response) => {
                    let listDataOrder = response.data;
                    setNewIdOrder(listDataOrder.id); // save id order
                    rowOrder.push(listProducto);
                    rowOrder.push(listDataOrder.id);
                    notifyCouponRedemption(listDataOrder.id);
                    // save the data to make the payment
                    localStorage.setItem('dataToPayOrder', JSON.stringify(rowOrder));
                    // Data of the product to pay
                    let dataProductPay = {
                        user_id: idusuario,
                        order_id: parseInt(listDataOrder.id),
                        product_name: listProducto.product_name,
                        price: totalToPay, //Total price // listProducto.price,
                        currency: 'mxn',
                        quantity: 1 //parseInt(orderSpecifications.amount),  // Cantidad de productos. 
                    }
 
                    makeThePayment(paymentMethod, dataProductPay);

                }).catch((error) => {
                    setShowErrorOrder(true);
                    setNewIdOrder(0);
                });
            } catch (error) {
                setShowErrorOrder(true);
                setNewIdOrder(0);
            }
        } else {
            //
        }
    }


    function makeThePayment(key, dataProductPay) {
        switch (key) {
            case 'creditCardPayment':
                let pagarConCard = PayWithCreditCard.payWithCreditCard(dataProductPay);
                try {
                    if (pagarConCard === false) {
                        setShowErrorPayAgain(true);
                    }
                    else {
                        setShowErrorPayAgain(false);
                    }
                } catch (error) {
                    //
                }

                break;

            case 'oxxoPayment':
                window.location = '/pagar/con/oxxo';
                break;

            case 'payPalPayment':
                console.log(' paypal ', key);
                break;

            case 'transferPayment':
                console.log(' transfer ', key);
                break;

            default:
                break;
        }
    }


    function notifyCouponRedemption(idOrder) {
        if (parseInt(idCoupon) === 0) {
            //
        } else {
            try {
                axios.post('https://yellowrabbit.herokuapp.com/redeemedcoupons/api/redeem/', {
                    user: idusuario,
                    shoppingcoupon: parseInt(idCoupon),
                    orders: parseInt(idOrder)
                }, { headers }
                ).then((response) => {
                    //
                }).catch((error) => {
                    //
                });
            } catch (error) {
                //
            }
        }
    }


    

    function methodCalEnvio() {
        /*
        console.log(document.getElementById('selectPaqueteria').value)
        console.log(document.getElementById('municipio').value)
        console.log(document.getElementById('state').value)
        console.log(parseInt(document.getElementById('codigo-potal').value))
        console.log(listDataUser.first_name)
        console.log(listDataUser.email)
        console.log(listDataUser.phone)
        */
        try {
            axios.post('https://yellowrabbit.herokuapp.com/parcelservice/api/quote-shipment/', {
                carrier:document.getElementById('selectPaqueteria').value,
                customer_name:listDataUser.first_name,
                email:listDataUser.email,
                phone:parseInt(listDataUser.phone),
                city:document.getElementById('municipio').value,
                state:document.getElementById('state').value,
                country:"MX",
                postal_code: document.getElementById('codigo-potal').value,
                content: listProducto.product_name,
                amount:1,
                type:"box",
                weight:1,
                dimensions_length:12,
                dimensions_width:15,
                dimensions_height:20,

            }, { headersCosto }
            ).then((response) => {
                console.log('----------------------------', response.data);
                validateQuote(response.data);
                //
            }).catch((error) => {
                console.log(error);
                //
            });
        } catch (error) {
            //
        }
    }


    function validateQuote(isRate){
        let isMetaError = isRate.meta
        console.log('meta: ', isMetaError);

        if (isMetaError === 'error'){
            console.log('Es error xd')
        }else{
            if (isMetaError === 'rate'){
                console.log('Se puede cotizar');
                console.log('datos: ', isRate.data);
                setQuotedShippingPrice(isRate.data[0]['totalPrice']);
                // recorrer el array.
            }
        }
    }



    function returnToPreviousView() {
        window.location = '/article/details/' + listProducto.id;
    }

    // Try ordering again
    const handleTryAgain = () => {
        setShowErrorOrder(false);
        setTimeout(() => { makeAnOrder(); }, 2000); // sleep 2 seconds
    };

    // Try to pay again
    const handleTryPayAgain = () => {
        setShowErrorPayAgain(false);
        // Data of the product to pay
        let dataProductPay = {
            user_id: idusuario,
            order_id: parseInt(newIdOrder),
            product_name: listProducto.product_name,
            price: totalToPay, // Total price
            currency: 'mxn',
            quantity: 1 //parseInt(orderSpecifications.amount),  // Cantidad de productos. 
        };

        setTimeout(() => { makeThePayment(paymentMethod, dataProductPay); }, 2000); // sleep 2 seconds
    };

    // Close
    // Try ordering again
    const handleCloseTryAgain = () => setShowErrorOrder(false);
    // Try to pay again
    const handleCloseTryPayAgain = () => setShowErrorPayAgain(false);


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
                                    <button style={{backgroundColor:"#E94E1B",color:"white"}} className="btn" onClick = {() => { handleShowCalEnvio()} } >Cotizar costo envio</button>
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
                                        <div>
                                            <p>Precio por producto: <span style={{ fontWeight: "bold" }}>${listProducto.price}</span> </p>
                                            <p>Total de productos: <span style={{ fontWeight: "bold" }}> {orderSpecifications.amount}</span></p>
                                            <p>Costo de envío: <span style={{ fontWeight: "bold" }}>${quotedShippingPrice}</span></p>
                                            <p>Descuento aplicado: <span style={{ fontWeight: "bold" }}>${discountApplied}</span></p>
                                            <p>Total sin descuento: <span style={{ fontWeight: "bold" }}>${orderSpecifications.total_price}</span></p>
                                            <p>Total a pagar: <span style={{ fontWeight: "bold" }}>${totalToPay}</span></p>
                                        </div>
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

            {/* MODALS */}
            {/* Make an order again */}
            <Modal show={showErrorOrder} onHide={handleCloseTryAgain}>
                <Modal.Header closeButton style={{ borderBottom: "0" }}></Modal.Header>
                <Modal.Body>
                    <div style={{ textAlign: "center" }}>
                        <img alt='error' src={imgErrorOrder} style={{ width: "13%", height: "13%", marginBottom: "3%" }} />
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


            {/* Try pay again */}
            <Modal show={showErrorPayAgain} onHide={handleCloseTryPayAgain}>
                <Modal.Body>
                    <div style={{ textAlign: "center" }}>
                        <img alt='error' src={imgErrorOrder} style={{ width: "13%", height: "13%", marginBottom: "3%" }} />
                        <h3>Ha habido un error</h3>
                    </div>
                    <p style={{ color: "#E94E1B", textAlign: "center", fontSize: "17px" }}>Verifica tus datos, tu conexión e inténtalo de nuevo, si el
                        error persiste, contáctanos y te ayudaremos con tu compra.</p>

                    <div style={{ backgroundColor: "#0000", textAlign: "center" }}>
                        <Button style={{ backgroundColor: "#E94E1B", borderStyle: "none", margin: "2%", fontSize: "17px", fontWeight:"600" }} onClick={handleTryPayAgain}>
                            Intentar de nuevo
                        </Button>
                        <Button style={{ backgroundColor: "#F7C169", borderStyle: "none", margin: "2%", fontSize: "17px", fontWeight:"600" }}>
                            Ayuda
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal  show={showCalEnvio} size="md" onHide={handleCloseCalEnvio} >
            <Modal.Body style={{margin:20}}>
            <div style={{borderWidth:5,padding:25}}>
                <Form.Label>Paqueteria / Mensajeria:</Form.Label>
                <Form.Select style={{backgroundColor:"#BFBFBF",borderRadius:20}} aria-label="Default select example" id='selectPaqueteria'>
                    <option value='dhl'>DHL</option>
                    <option value='estafeta'>Estafeta</option>
                    <option value='fedex'>Fedex</option>
                </Form.Select>
                <Form.Label>Pais:</Form.Label>
                <Form.Select style={{backgroundColor:"#BFBFBF",borderRadius:20}} aria-label="Default select example">
                    <option value='MX'>México</option>
                </Form.Select>

                <Form.Label>Estado:</Form.Label>
                <Form.Select style={{backgroundColor:"#BFBFBF",borderRadius:20}} aria-label="Default select example" id="state">
                <option value="no">Seleccione uno...</option>
                <option value="AG">Aguascalientes</option>
                <option value="BC">Baja California</option>
                <option value="BS">Baja California Sur</option>
                <option value="CM">Campeche</option>
                <option value="CS">Chiapas</option>
                <option value="CH">Chihuahua</option>
                <option value="CX">Ciudad de México</option>
                <option value="CO">Coahuila</option>
                <option value="CL">Colima</option>
                <option value="DG">Durango</option>
                <option value="EM">Estado de México</option>
                <option value="GT">Guanajuato</option>
                <option value="GR">Guerrero</option>
                <option value="HG">Hidalgo</option>
                <option value="JC">Jalisco</option>
                <option value="MI">Michoacán</option>
                <option value="MO">Morelos</option>
                <option value="NA">Nayarit</option>
                <option value="NL">Nuevo León</option>
                <option value="OA">Oaxaca</option>
                <option value="PU">Puebla</option>
                <option value="QT">Querétaro</option>
                <option value="QR">Quintana Roo</option>
                <option value="SL">San Luis Potosí</option>
                <option value="SI">Sinaloa</option>
                <option value="SO">Sonora</option>
                <option value="TB">Tabasco</option>
                <option value="TM">Tamaulipas</option>
                <option value="TL">Tlaxcala</option>
                <option value="VE">Veracruz</option>
                <option value="YU">Yucatán</option>
                <option value="ZA">Zacatecas</option>
                </Form.Select>

                <Form.Group as={Col}>
                <Form.Control placeholder='Municipio' required type="text" name="Municipio" id="municipio" />
                </Form.Group>

                <Form.Group as={Col}>
                <Form.Control placeholder='Codigo postal: ' required type="text" name="Codigo postal:" id="codigo-potal"/>
                </Form.Group>

                <Button style={{marginLeft:10,float:"right",backgroundColor:"#E94E1B",borderColor:"#E94E1B"}} onClick = {handleCloseCalEnvio}>
                    Volver
                </Button>
                <Button style={{marginLeft:10,float:"right",backgroundColor:"#E94E1B",borderColor:"#E94E1B" }} onClick = {() => { methodCalEnvio()} } >
                    Confirmar
                </Button>
                
                
            </div>
            </Modal.Body>
        </Modal>

            <Footer></Footer>
        </>
    )

}

export default ConfirmOrder;