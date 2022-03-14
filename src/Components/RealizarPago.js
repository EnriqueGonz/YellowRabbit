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

var dataToPayOrder = JSON.parse(localStorage.getItem('dataToPayOrder'));
// Remocer estos datos al finalizar la compra
localStorage.removeItem('dataToPayOrder');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};



const realizarPago = () => {
    console.log(' - - ', dataToPayOrder);

    return(
        <>
        <div> <p> Hola este va a ser el redireccionamiento de pago</p> </div>
        </>
    ) 

}


export default realizarPago