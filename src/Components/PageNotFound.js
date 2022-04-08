import React from "react";
import Appbar from './appbarClient';
import Footer from './footer';
import { Button, Row, Col, Container } from 'react-bootstrap';
import imgRabbit from '../images/icons/iconErrorOrder.svg';


const PageNotFound = () => {
    function goToDashboard() {
        window.location = '/inicio';
    }

    return (
        <>
            <Appbar></Appbar>
            <div>
                <br></br>
                <Container style={{ marginBottom:"10%" }}>
                    <Row className="justify-content-md-center">
                        <Col style={{ textAlign: "center" }}>
                            <div>
                                <img alt='error' src={imgRabbit} style={{ width: "35%", height: "35%", marginLeft:"20%" }} />
                            </div>
                        </Col>
                        <Col style={{ textAlign: "lelft", backgroundColor: "E94E1B" }}>
                            <div>
                                <h1 style={{ color: "#E94E1B" }}>Oops</h1>
                                <p style={{ color: "#E94E1B", fontWeight: "600", fontSize: "17px" }}>No podemos encontrar la página que buscas.</p>
                                <p style={{ color: "#000000", fontWeight: "400", fontSize: "17px" }}>Es posible que haya caducado o que haya un error tipográfico.
                                    <br></br>
                                    Puede ser que pueda encontrar lo que necesita en nuestra página de inicio</p>
                            </div>
                            <Button style={{ backgroundColor: "#E94E1B", borderStyle: "none", margin: "2%", fontSize: "17px", fontWeight: "600" }} onClick={() => { goToDashboard() }}>Ir a inicio</Button>

                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer></Footer>
        </>
    )
}


export default PageNotFound;