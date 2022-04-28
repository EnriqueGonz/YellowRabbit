import React from "react";
import Appbar from './appbarClient';
import Footer from './footer';
import { Button, Container } from 'react-bootstrap';
import imgRabbit from '../images/icons/iconErrorOrder.svg';
import axios from "axios";
import { useParams } from 'react-router-dom';

import '../config';
var baseUrl = global.config.yellow.rabbit.url;


const ConfirmEmail = () => {
    var { idinvitacion,tokeninvitacion } = useParams(); // params

    function goToDashboard() {
        axios.get(baseUrl+'/mailing/api/confirm-mail/'+idinvitacion+"/"+tokeninvitacion+"/",)
          .then((response) => {
            //console.log(response)
            window.location.href = "/Inicio"
          })
          .catch((error) => {
            console.log(error);
          });
    }

    return (
        <>
            <Appbar></Appbar>
            <div>
                <br></br>
                <Container style={{ marginBottom:"10%" }}>
                    <div className="row justify-content-md-center">
                        <div className="col-12 col-md-4" style={{ textAlign: "center" }}>
                            <div>
                                <img alt='error' src={imgRabbit} style={{ width: "35%", height: "35%" }} />
                            </div>
                        </div>
                        <div className="col-12 col-md-8" style={{ textAlign: "lelft", backgroundColor: "E94E1B" }}>
                            <div>
                                <h1 style={{ color: "#E94E1B" }}>¡Bienvenido confirma tu cuenta!</h1>
                                <p style={{ color: "#E94E1B", fontWeight: "600", fontSize: "17px" }}>Gracias por unirte a Yellow Rabbit</p>
                                <p style={{ color: "#000000", fontWeight: "400", fontSize: "17px" }}>Estamos contentos de que estes aquí, da click en el boton para terminar de confirmar tu cuenta </p>
                            </div>
                            <Button style={{ backgroundColor: "#E94E1B", borderStyle: "none", fontSize: "17px", fontWeight: "600" }} onClick={() => { goToDashboard() }}>Confirmar cuenta</Button>

                        </div>
                    </div>
                </Container>
            </div>
            <Footer></Footer>
        </>
    )
}


export default ConfirmEmail;