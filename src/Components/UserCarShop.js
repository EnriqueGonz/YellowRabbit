import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import imgindex1 from '../images/fondouser.png';
import LoadingUserCarShop from './LoadingUserCarShop';

import Appbar from './appbarClient';
import Footer from './footer';
import axios from 'axios';

import { MdOutlineFavorite, MdRemoveShoppingCart, MdAdd, MdRemove } from "react-icons/md";
import { OverlayTrigger, Tooltip,Modal,Row,Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../config';
import ConfirmOrderModal from './ConfirmOrderModal';


var baseUrl = global.config.yellow.rabbit.url;

var token = localStorage.getItem('tokenClient');
var username = localStorage.getItem('usernameClient');
var idusuario = localStorage.getItem('userId');
var state = "";
var postalCode = "";
var rowProductos = [];
var rowUser = [];

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const UserCarShop = () => {
    const [list, setList] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);  

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

    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        //console.log(name + value)
        setinputsDireccion(values => ({ ...values, [name]: value }))
    }

    const notify = () => {
        toast('Producto agregado a tu whitelist🔥', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }

    // End notifyShoppingCart

    const notifyerror = () => {
        toast.error('Opsss, intentalo mas tarde', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }


    const notifylisto = () => {
        toast('Ese producto ya esta en tu whitelist', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }


    useEffect(() => {
        try {
            axios.get(baseUrl+'/shoppingcart/api/my-shopping-cart/' + username + '/', { headers })
                .then((response) => {
                    setList(response.data);
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps

    }, [setList])

    if (!list.length) return <LoadingUserCarShop />;

    function methodName(id) {
        try {
            axios.post(baseUrl+'/wishlist/api/add-wishlist/', {
                user: idusuario,
                products: id
            }, { headers })
                .then((response) => {
                    if (response.status === 200) {
                        notify();
                    }
                    if (response.status === 208) {
                        notifylisto();
                    }
                })
                .catch((error) => {
                    notifyerror();
                });

        } catch (error) {
            console.log(' . ', error);
        }
    }

    /* Shopping Cart */
    function methodRemoveShopCart(id) {
        try {
            axios.delete(baseUrl+'/shoppingcart/api/delete/' + parseInt(id) + '/', { headers })
                .then((response) => {
                    if (response.status === 200) {
                        reloadList();
                        
                    }
                })
                .catch((error) => {
                    notifyerror();
                });

        } catch (error) {
            console.log(' . ', error);
        }

    }


    function updateCarShop(idCarShop,cantidad){
        try {
            axios.put(baseUrl+'/shoppingcart/api/update/'+idCarShop+'/',{
                amount:cantidad
            },{ headers })
                .then((response) => {
                    console.log(response)
                    document.getElementById('btnSumar'+idCarShop).style.display="block"
                    document.getElementById('loadingSuma'+idCarShop).style.display="none"
                    document.getElementById('btnRestar'+idCarShop).style.display="block"
                    document.getElementById('loading'+idCarShop).style.display="none"
                    reloadList();
                })
                .catch((error) => {
                    notifyerror();
                });

        } catch (error) {
            console.log(' . ', error);
        }
    }

    let costo_total = 0;
    let CantidadTotal = 0;


    list.map((item) =>(
        costo_total += parseFloat(item[0][0]["total_price"])
    ))
    costo_total = costo_total.toFixed(2);

    list.map((item) =>(
        CantidadTotal += item[0][0]["amount"]
    ))

    function reloadList(){
        try {
            axios.get(baseUrl+'/shoppingcart/api/my-shopping-cart/' + username + '/', { headers })
                .then((response) => {
                    setList(response.data);
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log(' . ', error);
        }
    }


    function sumarCantidad(id) {
        console.log(id)
        var cantidadNow = 0;
        document.getElementById('btnSumar'+id).style.display="none"
        document.getElementById('loadingSuma'+id).style.display="block"
        for (let num = 0; num < list.length; num++) {
            if(id === list[num][0][0].id){
                cantidadNow = list[num][0][0].amount + 1;
            }
        }

        updateCarShop(id,cantidadNow);

    }


    const restarCantidad = (id) => {
        console.log(id)
        var cantidadNow = 0;
        document.getElementById('btnRestar'+id).style.display="none"
        document.getElementById('loading'+id).style.display="block"

        for (let num = 0; num < list.length; num++) {
            if(id === list[num][0][0].id){
                cantidadNow = list[num][0][0].amount - 1;
            }
        }

        if(cantidadNow > 0){
            updateCarShop(id,cantidadNow);
        }else{
            document.getElementById('btnRestar'+id).style.display="block"
            document.getElementById('loading'+id).style.display="none"
        }
        
        
    }

    function processPay(){
        let datasOrderRow = []
        list.map((item) =>(
            datasOrderRow.push({
                products: item[0][0]["products_id"],
                amount: item[0][0]["amount"],
            })
        ))
        rowProductos = datasOrderRow;
        console.log(datasOrderRow)

         axios.get(baseUrl+'/addresses/api/my-addresses/'+username+"/", { headers })
        .then((response) => {
            let datasUserRow = {
                user: idusuario,
                addresses: response.data[0].id,
            }
            rowUser = datasUserRow;
            postalCode = response.data[0].postal_code;
            state = response.data[0].state;
            //console.log(response.data[0].postal_code)
            if(response.data.length === 0){
                handleShow();
            }else{
                handleShow2();
            }
        })
        .catch((error) => {
            console.log(error);
            window.location.href = "/user/mi-carrito"
        });
    }

    const handleSubmitDireccion = (event) => {
        axios.post(baseUrl+'/addresses/api/register/', {
            user: idusuario,
            street: inputsDireccion.street,
            avenue: inputsDireccion.avenue,
            neighborhood: inputsDireccion.neighborhood,
            street_number: inputsDireccion.street_number,
            apartment_number: inputsDireccion.apartment_number,
            postal_code: inputsDireccion.postal_code,
            city: inputsDireccion.city,
            state: document.getElementById('state').value,
            additional_data: inputsDireccion.additional_data,
        },{
            headers:{
                "Authorization" : "Token "+token
            }
        }
        )
        .then((response) => {
            //console.log(response);
            window.location = '/user/mi-carrito'
        })
        .catch(err => console.log(err));

        return false;
    }


    return (
        <>
            <Appbar></Appbar>
            
            <div style={{ backgroundImage: "url('" + imgindex1 + "')" }}>
                <div className='row' style={{width:"100%"}}>
                <div className='col-12 col-md-8'>
                    <div className='container' style={{ backgroundColor: "white", width: "90%" }}>
                    <div className='container' style={{ width: "100%" }}>
                        <br /><br />
                        <h3>Carrito de compras</h3>
                        <div className='container' style={{ width: "100%" }}>


                        </div>

                        <hr style={{ height: "5px", backgroundColor: "#EB5929", opacity: 1 }}></hr>

                        <div className='container'>
                        <div style={{ marginBottom: 10,borderBottom:"solid",borderWidth:1,borderColor:"#E6E6E6",textAlign:"right" }} className="col-sm-12">
                            <p>Precio</p>
                        </div>

                            {list.map((item, index) => (
                                <div key={index} style={{ marginBottom: 10,borderBottom:"solid",borderWidth:1,borderColor:"#E6E6E6" }} className="col-sm-12">

                                    <div style={{ backgroundColor: "#FFF", height: "100%", textAlign: "start" }} className="">

                                        <div className="card-body" style={{padding:1}}>
                                            <div className='row'>
                                                <div className='col-sm-2' style={{textAlign:"center"}}>
                                                    <img alt="" style={{ width:60, height: 60, borderRadius:30 }} src={'https://yellowrabbitbucket.s3.amazonaws.com/' + item[1][0].image_one}></img>
                                                </div>
                                                <div className='col-sm-8'>
                                                    <a href={'/article/details/' + item[1][0].id} title='Ver producto' style={{ textDecorationLine: "none" }}><p className='module line-clamp' style={{ fontFamily: "'Cairo', sans-serif", fontWeight: "bold", color: "black" }}>{item[1][0].product_name}</p></a>
                                                    <div className="contianer" style={{display:"flex",alignItems:"center"}}>

                                                        <Form.Label style={{ width: "auto", textAlign: 'center', color:"#EB5929", fontWeight:"bold" }} type="text" name="quantity"> <p style={{ fontFamily: "'Cairo', sans-serif", fontWeight: "bold", color: "black"}}>Cantidad</p> </Form.Label>
                                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Menos</Tooltip>}>
                                                                {({ ref, ...triggerHandler }) => (
                                                                    <div variant="light" {...triggerHandler} className="d-inline-flex align-items-center">
                                                                        <div id={"loading"+item[0][0].id} className="spinner-border" style={{display:"none",width:20,height:20,marginLeft:7,marginRight:5}} role="status">
                                                                        </div>
                                                                        <span id={"btnRestar"+item[0][0].id} ref={ref} className="ms-1"><MdRemove style={{ marginRight: "10px", fontSize: 25 }} className='btnFav' onClick={() => { restarCantidad(item[0][0].id) }}></MdRemove></span>
                                                                    </div>
                                                                )}
                                                            </OverlayTrigger>

                                                            

                                                            <Form.Label style={{ backgroundColor: "#DFDFDF", width: "35px", textAlign: 'center' }} required type="text" name="quantity"> {item[0][0].amount} </Form.Label>

                                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Más</Tooltip>}>
                                                                {({ ref, ...triggerHandler }) => (
                                                                    <div variant="light" {...triggerHandler} className="d-inline-flex align-items-center">
                                                                        <div id={"loadingSuma"+item[0][0].id} className="spinner-border" style={{display:"none",width:20,height:20,marginLeft:5}} role="status">
                                                                        </div>
                                                                        <span id={"btnSumar"+item[0][0].id} ref={ref} className="ms-1"><MdAdd style={{ marginRight: "10px", fontSize: 25 }} className='btnFav' onClick={() => { sumarCantidad(item[0][0].id) }}></MdAdd></span>
                                                                    </div>
                                                                )}
                                                            </OverlayTrigger>
                                                        
                                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Quitar del carrito de compras</Tooltip>}>
                                                            {({ ref, ...triggerHandler }) => (
                                                                <div variant="light" {...triggerHandler} className="d-inline-flex align-items-center">
                                                                    <span ref={ref} className="ms-1"><MdRemoveShoppingCart style={{ marginRight: "10px", fontSize: 25 }} className='btnFav' onClick={() => { methodRemoveShopCart(item[0][0].id); }} ></MdRemoveShoppingCart></span>
                                                                </div>
                                                            )}
                                                        </OverlayTrigger>

                                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Agregar a la wishlist</Tooltip>}>
                                                            {({ ref, ...triggerHandler }) => (
                                                                <div variant="light" {...triggerHandler} className="d-inline-flex align-items-center">
                                                                    <span ref={ref} className="ms-1"><MdOutlineFavorite style={{ fontSize: 25 }} className='btnFav' alt="Agregar a la wishlist" onClick={() => { methodName(item[0][0].products_id); }}></MdOutlineFavorite></span>
                                                                </div>
                                                            )}
                                                        </OverlayTrigger>

                                                        <ToastContainer></ToastContainer>
                                                    </div>
                                                </div>
                                                <div className='col-sm-2' style={{textAlign:"end",padding:0}}>
                                                    <p style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 500 }}>{'$' + item[1][0].price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <br></br>

                    </div>
                    </div>
                </div>
                <div className='col-12 col-md-4'>
                    <div className='container' style={{ backgroundColor: "white", width: "90%" }}>
                        <div className='container' style={{ width: "90%" }}>
                        <br /><br />
                        <h3>Comprar Carrito</h3>
                        <hr style={{ height: "5px", backgroundColor: "#EB5929", opacity: 1 }}></hr>
                        <br/><br/>
                        <p>{"Subtotal: ("+CantidadTotal+" productos):"}</p>
                        <p>{"$"+costo_total+" MXN"}</p>

                        <Button style={{ backgroundColor: "#E94E1B", borderColor: "#E94E1B", fontSize: "14px"}}  onClick = {() => { processPay();} } > Proceder al pago </Button>
                        <br/><br/>
                        
                        </div>
                    </div>
                    
                </div>

                </div>

            </div>
            <Footer></Footer>


        <Modal  show={show} size="md" onHide={handleClose} >
            <Modal.Body style={{margin:20}}>
                <h4>Para calcular costos de envimos agrega una direccion</h4>
                <Form onSubmit={handleSubmitDireccion}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Calle</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="text" name="street" value={inputsDireccion.street} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="">
                        <Form.Label>Barrio/Colonia</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="text" name="neighborhood" value={inputsDireccion.neighborhood} onChange={handleChange}  />
                        </Form.Group>

                        
                    </Row>
                    <Row className="mb-3">

                        <Form.Group as={Col} controlId="">
                        <Form.Label>Avenida</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="text" name="avenue" value={inputsDireccion.avenue} onChange={handleChange}  />
                        </Form.Group>

                        
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Numero de calle</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="number" name="street_number" value={inputsDireccion.street_number} onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="">
                        <Form.Label>Numero de casa</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="number" name="apartment_number" value={inputsDireccion.apartment_number} onChange={handleChange} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Estado:</Form.Label>
                        <Form.Select style={{backgroundColor:"#DFDFDF"}} aria-label="Default select example" id="state">
                        <option value="CX">Seleccione uno...</option>
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
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Codigo Postal (CP)</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="number" name="postal_code" value={inputsDireccion.postal_code} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="">
                        <Form.Label>Ciudad/Pueblo</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="text" name="city" value={inputsDireccion.city} onChange={handleChange} />
                        </Form.Group>
                    </Row>
                    
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Informacion adicional</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} as="textarea" required type="text"  name="additional_data" value={inputsDireccion.additional_data} onChange={handleChange} />
                    </Form.Group>
                    <Button style={{marginLeft:10,float:"right",backgroundColor:"#E94E1B",borderColor:"#E94E1B"}} onClick={handleSubmitDireccion}>
                        Agregar
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>

        <Modal  show={show2} size="lg" onHide={handleClose2} >
            <Modal.Body style={{margin:20}}>
            <div>
                <p>{postalCode}</p>
                <ConfirmOrderModal estado={state} codigopostal={postalCode} rowProductos={rowProductos} rowUser={rowUser} costoTotalAllProductos={costo_total} cantidadProductos={CantidadTotal}></ConfirmOrderModal>
            </div>
            </Modal.Body>
        </Modal>
        </>
    )

}
export default UserCarShop;