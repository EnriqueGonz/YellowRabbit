import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Modal, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Appbar from './appbarClient';
import Footer from './footer';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MdOutlineFavorite, MdAddShoppingCart, MdAdd, MdRemove } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    /*Show invalid coupon message*/
    const [show, setShow] = useState(false);

    const [productSpecifications, setProductSpecifications] = useState([]);
    const [makeAnOrder, setMakeAnOrder] = useState([]);


    useEffect(() => {
        try {
            Object.entries(arrOrderSpecification).forEach(([key, value]) => {
                switch (parseInt(key)) {

                    case 0:
                        //console.log('product: ', value);
                        setListProducto(value);
                        break;
                    case 1:
                        //console.log('opcion ', value)
                        opcion = value;
                        break;
                    case 2:
                        //console.log('product specification: ', value);
                        setProductSpecifications(value);
                        break;
                    case 3:
                        //console.log('order: ', value);
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
                    //console.log(response)
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
            }, { headers }) // 202 or 406 // LIOSEJ174678
                .then((response) => {
                    var datasRC = response.data;
                    discountApplied = datasRC.discount_applied;
                    let totalPriceTD = (Math.round(parseFloat(datasRC.discounted_price) * 100) / 100);
                    setTotalToPay(totalPriceTD); // values => ({ ...values, [name]: value }
                    setShow(false);
                })
                .catch((error) => {
                    // The coupon you are trying to access does not exist or is expired
                    if (error.response.status === 406) {
                        setShow(true);
                    }
                });
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    
    const InvalidCoupon = () => (
        <div style={{ marginTop: "1%" }}>
            <span style={{ color: "#FF5733" }}>Código de cupón no válido</span>
        </div>
    )





    function handleChangeCoupon(evt) {
        const name = evt.target.name;
        const value = evt.target.value;

        setInputCoupon(value);
        evt.preventDefault();
    }



    //console.log('especificaciones ', productSpecifications);
    //console.log('order: ', orderSpecifications);
    //console.log('opcion ', opcion);


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
                                        {/* Show message - invalid coupon */}
                                        {show ? <InvalidCoupon /> : null}


                                    </Col>
                                    <Col><Button style={{ backgroundColor: "#E94E1B", borderColor: "#E94E1B" }} onClick={() => { redeemCoupon() }}>Canjear</Button></Col>
                                </Row>
                            </div>
                            <br></br>

                            <div className='container'>
                                <Row>
                                    <Col style={{ textAlign: "right" }}>
                                        <Form.Label style={{ fontSize: "18px" }}>Precio por producto:</Form.Label>
                                        <br></br>
                                        <Form.Label style={{ fontSize: "18px" }}>Precio total:</Form.Label>
                                        <br></br>
                                        <Form.Label style={{ fontSize: "18px" }}>Total de productos:</Form.Label>
                                        <br></br>
                                        <Form.Label style={{ fontSize: "18px" }}>Descuento:</Form.Label>
                                        <br></br>
                                        <Form.Label style={{ fontSize: "18px" }}>Costo de envío:</Form.Label>
                                        <br></br>
                                        <Form.Label style={{ fontSize: "18px" }}>Total a pagar:</Form.Label>
                                        <br></br>
                                    </Col>
                                    <Col style={{ textAlign: "left", borderLeft: "5px solid #C4C4C4" }}>


                                        <Form.Label style={{ fontSize: "18px" }}>$ {listProducto.price}</Form.Label>
                                        <br></br>
                                        <Form.Label style={{ fontSize: "18px" }}>$ {orderSpecifications.total_price}</Form.Label>
                                        <br></br>
                                        <Form.Label style={{ fontSize: "18px" }}> {orderSpecifications.amount}</Form.Label>
                                        <br></br>
                                        <Form.Label style={{ fontSize: "18px" }}> {discountApplied} </Form.Label>
                                        <br></br>
                                        <Form.Label style={{ fontSize: "18px" }}>$ {shippingCost} </Form.Label>
                                        <br></br>
                                        <Form.Label style={{ fontSize: "18px" }}>$ {totalToPay}</Form.Label>
                                        <br></br>
                                    </Col>
                                </Row>
                            </div>

                            <div className='col-md' style={{ marginTop: "8%" }}>
                                <span style={{ fontWeight: "bold", fontSize: "18px" }}>FORMA DE PAGO</span>
                                <Form>
                                    <Form.Check
                                        type='checkbox'
                                        id="visaPayment"
                                        label="Tarjeta de credito, debíto VISA, Master Card"
                                    />
                                    <Form.Check
                                        type='checkbox'
                                        id="PpyPalPayment"
                                        label="PayPal"
                                    />
                                    <Form.Check
                                        type='checkbox'
                                        id="oxxoPayment"
                                        label="Pago en OXXO"
                                    />
                                    <Form.Check
                                        type='checkbox'
                                        id="transferPayment"
                                        label="Tranferencia electronica"
                                    />
                                    <div style={{ marginTop: "1%" }}>
                                        <span style={{ color: "#FF5733" }}>Selecciona un método de pago.</span>
                                    </div>
                                </Form>
                                <hr style={{ height: "5px", backgroundColor: "#EB5929", opacity: 1 }}></hr>
                            </div>



                            <div className='col-md' style={{ marginTop: "8%" }}>
                                <span style={{ fontWeight: "bold", fontSize: "18px" }}>DIRECCIÓN</span>
                                <Form>
                                    <div className=''>
                                        {listDirecciones.map((item, index) => (
                                            <div key={index} className="row">
                                                <div className="col">
                                                    <p style={{ margin: "0px", paddingTop: "0px" }}>DIRECCION #{index}</p>
                                                    <div style={{ backgroundColor: "#DFDFDF", padding: "20px" }}>
                                                        <p style={{ margin: "2px" }}>{item.street + " " + item.avenue + " " + item.street_number + " " + item.neighborhood + " " + item.city + " " + item.state + " C.P: " + item.postal_code}</p>
                                                        <p style={{ margin: "2px" }}>{item.additional_data + " N°" + item.apartment_number}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="" style={{ padding: "20px", textAlign: "right" }}>
                                        <a href='#formContent' className='btn row' style={{ color: "white", backgroundColor: "#E94E1B", borderColor: "#E94E1B" }} >Agregar Direccion</a>
                                    </div>

                                </Form>
                            </div>

                            <div style={{ textAlign: "center", marginTop: "5%", marginBottom: "2%", textAlign: "right" }}>
                                <Button style={{ backgroundColor: "#E94E1B", borderColor: "#E94E1B", margin: "2%", fontSize: "19px", width: "100px" }}> Comprar </Button>
                                <Button style={{ backgroundColor: "#E94E1B", borderColor: "#E94E1B", margin: "2%", fontSize: "19px", width: "100px" }}> Volver </Button>
                            </div>
                            <hr style={{ height: "5px", backgroundColor: "#EB5929", opacity: 1 }}></hr>

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