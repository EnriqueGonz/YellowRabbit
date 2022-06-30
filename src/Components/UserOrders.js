import React, { useEffect, useState } from 'react';

import imgindex1 from '../images/fondouser.png';
import { Tab, Tabs, Modal, Button, FormLabel, Form, Row, Col } from 'react-bootstrap';
import { ReactComponent as IconWhatsapp } from '../images/icons/BtnWhatsapp.svg';
import Appbar from './appbarClient';
import Footer from './footer';
import axios from 'axios';
import '../config';


var baseUrl = global.config.yellow.rabbit.url;

var token = localStorage.getItem('tokenClient');
var username = localStorage.getItem('usernameClient');
var referencia = "";

var CantidadEntregados = 0;
var CantidadPendientes = 0;
var CantidadCancelados = 0;



const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const UserOrders = () => {
    const [listOrders, setListOrders] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [inputs, setInputs] = useState({
        asunto: "",
        mensaje: "",
    })

    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        //console.log(name + value)
        setInputs(values => ({ ...values, [name]: value }))
    }

    useEffect(() => {
        try {
            axios.get(baseUrl + '/orders/api/my-orders/' + username + '/', { headers })
                .then((response) => {
                    //console.log(response);
                    setListOrders(response.data);
                })
                .catch((error) => {
                    console.log(error.response);
                });

        } catch (error) {
            console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setListOrders])

    function methodName(id) {
        console.log(id);
        window.location.href = "/detallesPedido/" + id;
    }

    function methodSendMsj(ref) {
        referencia = ref;
        console.log(referencia)
        handleShow();
    }

    function SendMsj() {
        var cadena;
        //console.log(inputs.asunto)
        //console.log(inputs.mensaje)
        cadena = "https://api.whatsapp.com/send/?phone=529671551588&text=¡Hola!%20" + inputs.asunto + "%20" + inputs.mensaje + ".%20Referencia%20de%20pedido:%20" + referencia;
        window.location.href = cadena;
    }


    listOrders.map((item) => (
        (item[0][0].status === "ENTREGADO")
            ? CantidadEntregados = CantidadEntregados + 1
            : null
    ))
    listOrders.map((item) => (
        (item[0][0].status === "Pendiente")
            ? CantidadPendientes = CantidadPendientes + 1
            : null
    ))
    listOrders.map((item) => (
        (item[0][0].status === "CANCELADO")
            ? CantidadCancelados = CantidadCancelados + 1
            : null
    ))



    return (
        <>
            <Appbar></Appbar>
            <div style={{ backgroundImage: "url('" + imgindex1 + "')" }}>
                <div className='col-12 col-md-10 container' style={{ backgroundColor: "white" }}>

                    <div className='col-12 col-md-11 container'>
                        <br /><br />
                        <h3>Mis pedidos</h3>
                        <br></br>
                        <Tabs defaultActiveKey="entregados" id="uncontrolled-tab-example">
                            <Tab eventKey="entregados" title="Pedidos entregados">
                                {
                                    (CantidadEntregados === 0)
                                        ? <div className='container' style={{ height: 200 }}>
                                            <h4 style={{textAlign:"center",paddingTop:30}}>Sin pedidos entregados</h4>
                                        </div>
                                        : listOrders.map((item, index) => (
                                            (item[0][0].status === "ENTREGADO")
                                                ? <div key={index} className='card' style={{ marginBottom: 15 }}>
                                                    <table className="">
                                                        <thead style={{ borderBottom: "solid", borderBottomWidth: 1, borderBottomColor: "#DFDFDF", textAlign: "start" }}>
                                                            <tr>
                                                                <th className="col" style={{ width: "25%" }}><b>Fecha de pedido: </b><br></br><span style={{ fontWeight: 300 }}>{item[0][0].order_date}</span></th>
                                                                <th className="col" style={{ width: "25%" }}><b>Fecha de entrega: </b><br></br><span style={{ fontWeight: 300 }}>{item[0][0].date_delivery}</span></th>
                                                                <th className="col" style={{ width: "25%" }}><b>Referencia de pedido: </b><br></br><span style={{ fontWeight: 300 }}>{item[0][0].delivery_number}</span></th>
                                                                <th className="col" style={{ width: "25%" }}><b>Status: </b><br></br><span style={{ color: "green", fontWeight: 700 }}>Entregado</span></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {listOrders[index][2].map((item, index2) => (
                                                                <tr key={index2}>
                                                                    <td colSpan="1">
                                                                        <img src={'https://yellowrabbitbucket.s3.amazonaws.com/' + item[0].image_one} alt="" style={{ width: 72, height: 72, border: "solid", margin: 5, borderWidth: 1, borderColor: "#E7E7E7", borderRadius: 5 }}></img>
                                                                    </td>
                                                                    <td colSpan="2" style={{ textAlign: "start" }}>
                                                                        <a className='nodecorationa' href={'/article/details/' + item[0].id}><span>{item[0].product_name}</span><br></br></a>
                                                                        <span><span style={{ fontWeight: 700 }}>Cantidad: </span>{listOrders[index][1][index2].amount}</span>
                                                                    </td>
                                                                    <td colSpan="1">

                                                                    </td>
                                                                </tr>
                                                            ))}
                                                            <tr>
                                                                <td colSpan="4" style={{ textAlign: "end" }}>
                                                                    <button className='btn' style={{ fontWeight: 500, backgroundColor: "#404345", color: "white", marginRight: 5 }} onClick={() => { methodSendMsj(item[0][0].delivery_number); }}><span>Dudas: <IconWhatsapp style={{ width: 20, height: 20 }} /> </span></button>
                                                                    <button className='btn' style={{ fontWeight: 500, backgroundColor: "#E94E1B", color: "white" }} onClick={() => { methodName(item[0][0].id); }}>Ver detalles</button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                : <div key={index}></div>
                                        ))
                                }


                            </Tab>
                            <Tab eventKey="En proceso" title="Pedidos en proceso">
                                {
                                    (CantidadPendientes === 0)
                                        ? <div className='container' style={{ height: 200 }}>
                                            <h4 style={{textAlign:"center",paddingTop:30}}>Sin pedidos en proceso</h4>
                                        </div>
                                        : listOrders.map((item, index) => (
                                            (item[0][0].status === "En proceso")
                                                ? <div key={index} className='card' style={{ marginBottom: 15 }}>
                                                    <table className="">
                                                        <thead style={{ borderBottom: "solid", borderBottomWidth: 1, borderBottomColor: "#DFDFDF", textAlign: "start" }}>
                                                            <tr>
                                                                <th className="col" style={{ width: "25%" }}><b>Fecha de pedido: </b><br></br><span style={{ fontWeight: 300 }}>{item[0][0].order_date}</span></th>
                                                                <th className="col" style={{ width: "25%" }}><b>Fecha de entrega: </b><br></br><span style={{ fontWeight: 300 }}>{item[0][0].date_delivery}</span></th>
                                                                <th className="col" style={{ width: "25%" }}><b>Referencia de pedido: </b><br></br><span style={{ fontWeight: 300 }}>{item[0][0].delivery_number}</span></th>
                                                                <th className="col" style={{ width: "25%" }}><b>Status: </b><br></br><span style={{ color: "#E94E1B", fontWeight: 700 }}>En proceso</span></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {listOrders[index][2].map((item, index2) => (
                                                                <tr key={index2}>
                                                                    <td colSpan="1">
                                                                        <img src={'https://yellowrabbitbucket.s3.amazonaws.com/' + item[0].image_one} alt="" style={{ width: 72, height: 72, border: "solid", margin: 5, borderWidth: 1, borderColor: "#E7E7E7", borderRadius: 5 }}></img>
                                                                    </td>
                                                                    <td colSpan="2" style={{ textAlign: "start" }}>
                                                                        <a className='nodecorationa' href={'/article/details/' + item[0].id}><span>{item[0].product_name}</span><br></br></a>
                                                                        <span><span style={{ fontWeight: 700 }}>Cantidad: </span>{listOrders[index][1][index2].amount}</span>
                                                                    </td>
                                                                    <td colSpan="1">

                                                                    </td>
                                                                </tr>
                                                            ))}
                                                            <tr>
                                                                <td colSpan="4" style={{ textAlign: "end" }}>
                                                                    <button className='btn' style={{ fontWeight: 500, backgroundColor: "#404345", color: "white", marginRight: 5 }} onClick={() => { methodSendMsj(item[0][0].delivery_number); }}><span>Dudas: <IconWhatsapp style={{ width: 20, height: 20 }} /> </span></button>
                                                                    <button className='btn' style={{ fontWeight: 500, backgroundColor: "#E94E1B", color: "white" }} onClick={() => { methodName(item[0][0].id); }}>Ver detalles</button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                : <div key={index}></div>
                                        ))
                                }

                            </Tab>
                            <Tab eventKey="pendientes" title="Pedidos pendientes">
                                {
                                    (CantidadPendientes === 0)
                                        ? <div className='container' style={{ height: 200 }}>
                                            <h4 style={{textAlign:"center",paddingTop:30}}>Sin pedidos pendientes</h4>
                                        </div>
                                        : listOrders.map((item, index) => (
                                            (item[0][0].status === "Pendiente")
                                                ? <div key={index} className='card' style={{ marginBottom: 15 }}>
                                                    <table className="">
                                                        <thead style={{ borderBottom: "solid", borderBottomWidth: 1, borderBottomColor: "#DFDFDF", textAlign: "start" }}>
                                                            <tr>
                                                                <th className="col" style={{ width: "25%" }}><b>Fecha de pedido: </b><br></br><span style={{ fontWeight: 300 }}>{item[0][0].order_date}</span></th>
                                                                <th className="col" style={{ width: "25%" }}><b>Fecha de entrega: </b><br></br><span style={{ fontWeight: 300 }}>{item[0][0].date_delivery}</span></th>
                                                                <th className="col" style={{ width: "25%" }}><b>Referencia de pedido: </b><br></br><span style={{ fontWeight: 300 }}>{item[0][0].delivery_number}</span></th>
                                                                <th className="col" style={{ width: "25%" }}><b>Status: </b><br></br><span style={{ color: "#E94E1B", fontWeight: 700 }}>Pendientes</span></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {listOrders[index][2].map((item, index2) => (
                                                                <tr key={index2}>
                                                                    <td colSpan="1">
                                                                        <img src={'https://yellowrabbitbucket.s3.amazonaws.com/' + item[0].image_one} alt="" style={{ width: 72, height: 72, border: "solid", margin: 5, borderWidth: 1, borderColor: "#E7E7E7", borderRadius: 5 }}></img>
                                                                    </td>
                                                                    <td colSpan="2" style={{ textAlign: "start" }}>
                                                                        <a className='nodecorationa' href={'/article/details/' + item[0].id}><span>{item[0].product_name}</span><br></br></a>
                                                                        <span><span style={{ fontWeight: 700 }}>Cantidad: </span>{listOrders[index][1][index2].amount}</span>
                                                                    </td>
                                                                    <td colSpan="1">

                                                                    </td>
                                                                </tr>
                                                            ))}
                                                            <tr>
                                                                <td colSpan="4" style={{ textAlign: "end" }}>
                                                                    <button className='btn' style={{ fontWeight: 500, backgroundColor: "#404345", color: "white", marginRight: 5 }} onClick={() => { methodSendMsj(item[0][0].delivery_number); }}><span>Dudas: <IconWhatsapp style={{ width: 20, height: 20 }} /> </span></button>
                                                                    <button className='btn' style={{ fontWeight: 500, backgroundColor: "#E94E1B", color: "white" }} onClick={() => { methodName(item[0][0].id); }}>Ver detalles</button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                : <div key={index}></div>
                                        ))
                                }

                            </Tab>
                            <Tab eventKey="cancelados" title="Pedidos cancelados">
                                {
                                    (CantidadCancelados === 0)
                                        ? <div className='container' style={{ height: 200 }}>
                                            <h4 style={{textAlign:"center",paddingTop:30}}>Sin pedidos cancelados</h4>
                                        </div>
                                        : listOrders.map((item, index) => (
                                            (item[0][0].status === "CANCELADO")
                                                ? <div key={index} className='card' style={{ marginBottom: 15 }}>
                                                    <table className="">
                                                        <thead style={{ borderBottom: "solid", borderBottomWidth: 1, borderBottomColor: "#DFDFDF", textAlign: "start" }}>
                                                            <tr>
                                                                <th className="col" style={{ width: "25%" }}><b>Fecha de pedido: </b><br></br><span style={{ fontWeight: 300 }}>{item[0][0].order_date}</span></th>
                                                                <th className="col" style={{ width: "25%" }}><b>Fecha de entrega: </b><br></br><span style={{ fontWeight: 300 }}>{item[0][0].date_delivery}</span></th>
                                                                <th className="col" style={{ width: "25%" }}><b>Referencia de pedido: </b><br></br><span style={{ fontWeight: 300 }}>{item[0][0].delivery_number}</span></th>
                                                                <th className="col" style={{ width: "25%" }}><b>Status: </b><br></br><span style={{ color: "red", fontWeight: 700 }}>Cancelados</span></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {listOrders[index][2].map((item, index2) => (
                                                                <tr key={index2}>
                                                                    <td colSpan="1">
                                                                        <img src={'https://yellowrabbitbucket.s3.amazonaws.com/' + item[0].image_one} alt="" style={{ width: 72, height: 72, border: "solid", margin: 5, borderWidth: 1, borderColor: "#E7E7E7", borderRadius: 5 }}></img>
                                                                    </td>
                                                                    <td colSpan="2" style={{ textAlign: "start" }}>
                                                                        <a className='nodecorationa' href={'/article/details/' + item[0].id}><span>{item[0].product_name}</span><br></br></a>
                                                                        <span><span style={{ fontWeight: 700 }}>Cantidad: </span>{listOrders[index][1][index2].amount}</span>
                                                                    </td>
                                                                    <td colSpan="1">

                                                                    </td>
                                                                </tr>
                                                            ))}
                                                            <tr>
                                                                <td colSpan="4" style={{ textAlign: "end" }}>
                                                                    <button className='btn' style={{ fontWeight: 500, backgroundColor: "#404345", color: "white", marginRight: 5 }} onClick={() => { methodSendMsj(item[0][0].delivery_number); }}><span>Dudas: <IconWhatsapp style={{ width: 20, height: 20 }} /> </span></button>
                                                                    <button className='btn' style={{ fontWeight: 500, backgroundColor: "#E94E1B", color: "white" }} onClick={() => { methodName(item[0][0].id); }}>Ver detalles</button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                : <div key={index}></div>
                                        ))
                                }


                            </Tab>
                        </Tabs>
                        <hr style={{ height: "5px", backgroundColor: "#EB5929", opacity: 1 }}></hr>
                        <br></br>

                    </div>
                </div>

            </div>
            <Footer></Footer>


            <Modal show={show} size="md" onHide={handleClose} >
                <Modal.Body style={{ margin: 20 }}>
                    <div style={{ border: "solid", borderColor: "#E94E1B", borderWidth: 5, padding: 25 }}>

                        <Row className="mb-3">
                            <FormLabel>Referenciade pedido</FormLabel>
                            <Form.Group as={Col}>
                                <Form.Control placeholder='Referencia' defaultValue={referencia} disabled required type="text" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <FormLabel>Asunto</FormLabel>
                            <Form.Group as={Col}>
                                <Form.Control placeholder='Asunto' required type="text" name="asunto" value={inputs.asunto} onChange={handleChange} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <FormLabel>Mensaje</FormLabel>
                            <Form.Group as={Col}>
                                <Form.Control placeholder='Mensaje' required as="textarea" type="text" name="mensaje" value={inputs.mensaje} onChange={handleChange} />
                            </Form.Group>
                        </Row>
                        <Button style={{ marginLeft: 10, float: "right", backgroundColor: "#E94E1B", borderColor: "#E94E1B" }} onClick={() => { SendMsj() }} >
                            Enviar
                        </Button>
                        <Button style={{ marginLeft: 10, float: "right", backgroundColor: "#404345", borderColor: "#404345" }} onClick={handleClose}>
                            Volver
                        </Button>

                        <br></br>
                        <br></br>

                    </div>
                </Modal.Body>
            </Modal>

        </>
    )

}
export default UserOrders;