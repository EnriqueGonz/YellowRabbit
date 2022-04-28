import React, { useState } from 'react';
import imgcontacto from '../images/contacto.png';

import { ReactComponent as IconTelefono } from '../images/icons/IconTelefono.svg';
import { ReactComponent as IconCorreo } from '../images/icons/IconCorreo.svg';

import { ReactComponent as IconFacebook } from '../images/icons/iconFacebook.svg';
import { ReactComponent as IconTwitter } from '../images/icons/iconTwitter.svg';
import { ReactComponent as IconInstagram } from '../images/icons/iconInstagram.svg';
import { ReactComponent as IconTikTok } from '../images/icons/iconTikTok.svg';
import { ReactComponent as IconWhats } from '../images/icons/whats.svg';

import { Form, Button, Row, Col, Carousel } from 'react-bootstrap';
import axios from 'axios';
import Appbar from './appbar';
import validator from 'validator';
import emailjs from '@emailjs/browser'; // npm install @emailjs/browser --save


var baseUrl = global.config.yellow.rabbit.url;
var token = localStorage.getItem('tokenClient');


const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const Contacto = () => {

    const [inputs, setInputs] = useState({
        nombrePersonal: "",
        emailPersonal: "",
        mensajePersonal: "",
        nombreAmigo: "",
        emailAmigo: "",
        mensajeAmigo: "",
    })

    const [warnings] = useState({
        nombrePersonal: "Escriba su nombre.",
        emailPersonal: "Escriba su correo electrónico.",
        mensajePersonal: "Escriba su mensaje.",
        nombreAmigo: "Escriba el nombre de su amig@.",
        emailAmigo: "Escriba el correo de tu amig@.",
        mensajeAmigo: "Escriba su mensaje.",
    })


    const [mensajeEnviado] = useState({
        mensajePersonal: "Mensaje enviado.",
        mensajeAmigo: "Mensaje enviado.",
        mensajePersonalErr: "¡Upss! Su mensaje no pudo ser enviado.",
        mensajeAmigoErr: "¡Upss! Su mensaje no pudo ser enviado.",
        msgAmigoTokenNull: "¡Upss! error, necesita iniciar sesión para enviar el mensaje.", // Si el usuario no ha iniciado sesión, no podrá enviar el mensaje.
    });


    // validar Input
    const [validarInput, setValidarInput] = useState({
        nombrePersonal: false,
        emailPersonal: false,
        mensajePersonal: false,
        nombreAmigo: false,
        emailAmigo: false,
        mensajeAmigo: false,
    });


    // Message error
    const [showSuccessErr, setShowSuccessErr] = useState({
        msgInvalidToken: false,
        msgPersonalSuccess: false,
        msgAmigoSuccess: false,
        msgPersonalError: false,
        msgAmigoError: false,
    });



    function handleChange(evt) {
        evt.preventDefault();
        const name = evt.target.name;
        const value = evt.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }


    // Enviar mail de escribenos
    function enviarMailEscribenos() {
        if (validarInputsEscribenos() === true) {
            try {
                // Credenciales de EmailJs
                axios.get(baseUrl + '/mailing/api/emailjs-credentials/', headers, {
                })
                    .then((response) => {
                        let emailJsData = response.data;
                        let body = {
                            from_name: inputs.nombrePersonal,
                            from_email: inputs.emailPersonal,
                            message: inputs.mensajePersonal,
                        }
                        // Servide_ID, template_ID, public_KEY
                        emailjs.send(emailJsData.service_id, emailJsData.template_id, body, emailJsData.public_key)
                            .then((result) => {
                                setInputs("");
                                setShowSuccessErr(values => ({ ...values, "msgPersonalSuccess": true }));
                            }, (error) => {
                                console.log(error.text);
                                setShowSuccessErr(values => ({ ...values, "msgPersonalError": true }));
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (error) {
                
            }
        }
    }



    function mailInivitarAmigo() {
        
        if (validarInputsIA() === true) {
            if (token === undefined || token === null || token === '' || token === isNaN) {
                setShowSuccessErr(values => ({ ...values, "msgInvalidToken": true }));
                return;
            } else {
                axios.post(baseUrl + '/mailing/api/invite-a-frind/', {
                    friend_name: inputs.nombreAmigo,
                    friend_email: inputs.emailAmigo,
                    message: inputs.mensajeAmigo,
                }, { headers })
                    .then((response) => {
                        setInputs("");
                        setShowSuccessErr(values => ({ ...values, "msgAmigoSuccess": true }));
                    })
                    .catch((error) => {
                        console.log(error);
                        setShowSuccessErr(values => ({ ...values, "msgAmigoError": true }));
                    });

            }

        }
    }



    function validarInputsEscribenos() {
        let camposValidos = true;
        setFalseErrors();

        try {
            if (validator.isEmpty(inputs.nombrePersonal)) {
                setValidarInput(values => ({ ...values, "nombrePersonal": true }));
                camposValidos = false;
            }

            if (!validator.isEmail(inputs.emailPersonal)) {
                setValidarInput(values => ({ ...values, "emailPersonal": true }));
                camposValidos = false;
            }

            if (validator.isEmpty(inputs.mensajePersonal)) {
                setValidarInput(values => ({ ...values, "mensajePersonal": true }));
                camposValidos = false;
            }

            return camposValidos;
        } catch (error) {
            return false;
        }
    }


    function validarInputsIA() {
        let camposValidosIA = true;
        setFalseErrors();

        try {
            if (validator.isEmpty(inputs.nombreAmigo)) {
                setValidarInput(values => ({ ...values, "nombreAmigo": true }));
                camposValidosIA = false;
            }

            if (!validator.isEmail(inputs.emailAmigo)) {
                setValidarInput(values => ({ ...values, "emailAmigo": true }));
                camposValidosIA = false;
            }

            if (validator.isEmpty(inputs.mensajeAmigo)) {
                setValidarInput(values => ({ ...values, "mensajeAmigo": true }));
                camposValidosIA = false;
            }

            return camposValidosIA;
        } catch (error) {
            return false;
        }
    }


    function setFalseErrors() {
        setValidarInput(values => ({ ...values, "nombrePersonal": false }));
        setValidarInput(values => ({ ...values, "emailPersonal": false }));
        setValidarInput(values => ({ ...values, "mensajePersonal": false }));
        setValidarInput(values => ({ ...values, "nombreAmigo": false }));
        setValidarInput(values => ({ ...values, "emailAmigo": false }));
        setValidarInput(values => ({ ...values, "mensajeAmigo": false }));
    }


    return (
        <>
            <Appbar></Appbar>
            <div className='container'>
                <div style={{ widows: "75%" }}>
                    <div className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#FFF", justifyContent: "space-around" }}>
                        <a className='aNoSelected' href='/inicio'>INICIO</a>
                        <a className='aNoSelected' href='/datos'>DATOS</a>
                        <a className='aNoSelected' href='/productos'>PRODUCTOS</a>
                        <a className='aNoSelected' href='/blog'>BLOG</a>
                        <a className='aSelected' href='/contacto'>CONTACTO</a>
                    </div>

                </div>

            </div>
            <Carousel>
                <Carousel.Item className='contenedor'>
                    <img alt='' src={imgcontacto} style={{ width: "100%" }} />
                    <div className="possText2Img1">
                        <p style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: "bold", color: "white", fontSize: 65 }}>Contactanos</p>
                    </div>
                </Carousel.Item>
            </Carousel>

            <div className="container" style={{ paddingTop: 50 }}>
                <div className="grid-container">
                    <div className="grid-item">
                        <div className="column">
                            <div>
                                <p style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 30, fontWeight: 500, color: "#EB5929" }}>Contactanos</p>
                                <div className="col">
                                    <div className='row' style={{ alignItems: "center" }}>
                                        <IconTelefono style={{ width: 50, height: "100%" }} />
                                        <div className='col'>
                                            <div className='row'>
                                                <p style={{ marginBottom: 0 }}>Llama al</p>
                                            </div>
                                            <div className='row'>
                                                <p style={{ color: "#606060", fontWeight: "bold" }}>55 1234 5678</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row' style={{ alignItems: "center" }}>
                                        <IconCorreo style={{ width: 50, height: "100%" }} />
                                        <div className='col'>
                                            <div className='row'>
                                                <p style={{ marginBottom: 0, paddingTop: 10, }}>Contactanos</p>
                                            </div>
                                            <div className='row'>
                                                <p style={{ color: "#606060", fontWeight: "bold" }}>Correo@yellowrabbit.com.mx</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid-item">
                        <div className="column">
                            <p style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 30, fontWeight: 500, color: "#EB5929" }}>Visitanos</p>
                            <div className='col'>
                                <div className='row'>
                                    <div className='col'><a href='https://www.facebook.com/'><IconFacebook style={{ width: 30, height: "100%", filter: "invert(0.5) sepia(1) saturate(12) hue-rotate(332deg)" }} /></a></div>
                                    <div className='col'><a href='https://www.facebook.com/'><IconTwitter style={{ width: 30, height: "100%", filter: "invert(0.5) sepia(1) saturate(12) hue-rotate(332deg)" }} /></a></div>
                                    <div className='col'><a href='https://www.facebook.com/'><IconInstagram style={{ width: 30, height: "100%", filter: "invert(0.5) sepia(1) saturate(12) hue-rotate(332deg)" }} /></a></div>
                                    <div className='col'><a href='https://www.facebook.com/'><IconTikTok style={{ width: 30, height: "100%", filter: "invert(0.5) sepia(1) saturate(12) hue-rotate(332deg)" }} /></a></div>
                                </div>
                                <div className='row' style={{ textAlign: "center" }}>
                                    <p style={{ color: "black" }}>@YellowRabbitSToys</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="grid-item">
                        <div className="column" style={{ textAlign: "center" }}>
                            <p style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 30, fontWeight: 500, color: "#EB5929" }}>Chateemos</p>
                            <IconWhats />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ paddingTop: 50, paddingBottom: 50 }}>
                <div className='grid-containerForm'>
                    <div className="grid-item">
                        <div className="column">
                            <p style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 36, fontWeight: 700, color: "#EB5929" }}>Escribenos</p>
                            <Form>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Control style={{ backgroundColor: "#F7C169" }} placeholder='Nombre' required type="text" name="nombrePersonal" value={inputs.nombrePersonal || ""} onChange={handleChange} />
                                        <div>
                                            <span style={{ color: "#FF5733" }}>{validarInput.nombrePersonal ? warnings.nombrePersonal : null}</span>
                                        </div>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Control style={{ backgroundColor: "#F7C169" }} placeholder='e-mail' required type="email" name="emailPersonal" value={inputs.emailPersonal || ""} onChange={handleChange} />
                                        <div>
                                            <span style={{ color: "#FF5733" }}>{validarInput.emailPersonal ? warnings.emailPersonal : null}</span>
                                        </div>
                                    </Form.Group>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Control style={{ backgroundColor: "#F7C169" }} as="textarea" rows={3} placeholder='Mensaje' required name="mensajePersonal" value={inputs.mensajePersonal || ""} onChange={handleChange} />
                                    <div>
                                        <span style={{ color: "#FF5733" }}>{validarInput.mensajePersonal ? warnings.mensajePersonal : null}</span>
                                    </div>

                                    {/* Success */}
                                    <div>
                                        <span style={{ color: "#FF5733" }}>{showSuccessErr.msgPersonalSuccess ? mensajeEnviado.mensajePersonal : null}</span>
                                    </div>
                                    {/* Error */}
                                    <div>
                                        <span style={{ color: "#FF5733" }}>{showSuccessErr.msgPersonalError ? mensajeEnviado.mensajePersonalErr : null}</span>
                                    </div>
                                </Form.Group>

                                <Button style={{ marginLeft: 10, float: "right", backgroundColor: "#E94E1B", borderColor: "#E94E1B" }} onClick={() => { enviarMailEscribenos() }}>
                                    Enviar
                                </Button>
                            </Form>

                        </div>
                    </div>
                    <div className="grid-item">
                        <div className="column">
                            <p style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 36, fontWeight: 700, color: "#EB5929" }}>Invita a un amig@</p>
                            <Form>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Control style={{ backgroundColor: "#F7C169" }} placeholder='Nombre de tu amigo' required type="text" name="nombreAmigo" value={inputs.nombreAmigo || ""} onChange={handleChange} />
                                        <div>
                                            <span style={{ color: "#FF5733" }}>{validarInput.nombreAmigo ? warnings.nombreAmigo : null}</span>
                                        </div>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Control style={{ backgroundColor: "#F7C169" }} placeholder='e-mail de tu amigo' required type="email" name="emailAmigo" value={inputs.emailAmigo || ""} onChange={handleChange} />
                                        <div>
                                            <span style={{ color: "#FF5733" }}>{validarInput.emailAmigo ? warnings.emailAmigo : null}</span>
                                        </div>
                                    </Form.Group>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Control style={{ backgroundColor: "#F7C169" }} as="textarea" rows={3} placeholder='Mensaje' required name="mensajeAmigo" value={inputs.mensajeAmigo || ""} onChange={handleChange} />
                                    <div>
                                        <span style={{ color: "#FF5733" }}>{validarInput.mensajeAmigo ? warnings.mensajeAmigo : null}</span>
                                    </div>

                                    {/* Success */}
                                    <div>
                                        <span style={{ color: "#FF5733" }}>{showSuccessErr.msgAmigoSuccess ? mensajeEnviado.mensajeAmigo : null}</span>
                                    </div>
                                    {/* Error */}
                                    <div>
                                        <span style={{ color: "#FF5733" }}>{showSuccessErr.msgAmigoError ? mensajeEnviado.mensajeAmigoErr : null}</span>
                                    </div>
                                    {/* Invalid Token */}
                                    <div>
                                        <span style={{ color: "#FF5733" }}>{showSuccessErr.msgInvalidToken ? mensajeEnviado.msgAmigoTokenNull : null}</span>
                                    </div>
                                </Form.Group>
                                <Button style={{ marginLeft: 10, float: "right", backgroundColor: "#E94E1B", borderColor: "#E94E1B" }} onClick={() => { mailInivitarAmigo() }}>
                                    Enviar
                                </Button>
                            </Form>

                        </div>
                    </div>
                </div>
            </div>



            <footer style={{ backgroundColor: "#EB5929" }}>
                <div className="navbar navbar-expand-lg navbar-light" style={{ justifyContent: "space-around" }}>
                    <div style={{ textAlign: "center" }}>
                        <p style={{ color: "white", margin: 5 }}>@2021 Yellow Rabbit - Todos los derechos reservados</p>
                    </div>
                </div>
            </footer>
        </>
    )

}
export default Contacto;
