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


const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


var arrOrderSpecification = JSON.parse(localStorage.getItem('orderSpecifications'));
var productSpecifications = undefined;
var orderSpecifications = undefined;
var opcion = undefined;


const ConfirmOrder = () => {
    const [listProducto, setListProducto] = useState([]);
    const [makeAnOrder, setMakeAnOrder] = useState([]);


    useEffect(() => {
        try {
            Object.entries(arrOrderSpecification).forEach(([key, value]) => {
                switch (parseInt(key)) {
                    case 0:
                        opcion = value;
                        break;
                    case 1:
                        console.log('product: ', value);
                        setListProducto(value);
                        break;
                    case 2:
                        productSpecifications = value;
                        break;
                    case 3:
                        orderSpecifications = value;
                    default:
                        break;
                }
            });
        } catch (error) {
            console.log(' . ', error);
        }
    }, [setListProducto])


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
                        <div style={{ margin:"3%", fontWeight:"bold" }}><h2>Confirma tu compra</h2></div>
                            <div>                                
                                <img alt='' style={{ width: "90%", height: 350 }} src={'https://yellowrabbitbucket.s3.amazonaws.com/' + listProducto.image_one} />
                            </div>
                        </Col>
                        <Col>
                            <div className='col-md'>
                                <div className='container' style={{ marginTop:"10%" }}>
                                    <h3>{listProducto.product_name}</h3>
                                </div>
                            </div>

                            <div className='container' style={{ textAlign: "left" }}>
                                <br></br>
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