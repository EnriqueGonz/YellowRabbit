import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Appbar from './appbarClient';
import Footer from './footer';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MdOutlineFavorite, MdAddShoppingCart, MdAdd, MdRemove } from "react-icons/md";
import { OverlayTrigger, Tooltip,Row,Col,Modal,Tab,Tabs } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom'

import '../config';
import ConfirmOrder from './ConfirmOrder';


var baseUrl = global.config.yellow.rabbit.url;
const urlLogin = baseUrl+"/access/api/login/";

var token = localStorage.getItem('tokenClient');
var idusuario = localStorage.getItem('userId');
var username = localStorage.getItem('usernameClient');
var precio = 0;

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const ProductoEspecifico = () => {
    const [listProducto, setListProducto] = useState([]);
    const [amount, setAmount] = useState(1);
    const [initialCost, setInitialCost] = useState(null);
    var { idproduct } = useParams(); // params

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
    const [inputs, setInputs] = useState({
        email: "",
        password: "",

        nombreRegistro:"",
        username:"",
        emailNew:"",
        passwordNew:"",
        passwordNew2:"",
    })

    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        //console.log(name + value)
        setinputsDireccion(values => ({ ...values, [name]: value }))
        setInputs(values => ({ ...values, [name]: value }))
    }
    


    const notify = () => {
        toast('Producto agregado🔥', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }

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
        toast('Ese producto ya esta agregado', {
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
          axios.get(baseUrl+'/products/api/specific-product/'+idproduct+'/')
          .then((response) => {
            console.log(response);
            setListProducto(response.data[0][0]);
            setInitialCost(response.data[0][0].price)
            precio = response.data[0][0].price;
          })
          .catch((error) => {
            console.log(error);
          });
        } catch (error) {
            console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setListProducto])


    function methodAddWishlist(id) {
        try {
            axios.post(baseUrl+'/wishlist/api/add-wishlist/', {
                user: idusuario,
                products: id
            }, { headers })
                .then((response) => {
                    console.log(response.status);
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

    function methodAddCarshop(id) {
        try {
            axios.post(baseUrl+'/shoppingcart/api/add/', {
                user: idusuario,
                products: id,
                amount: amount
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
                    console.log(error);
                    notifyerror();
                });
        } catch (error) {
            console.log(' . ', error);
        }
    }


    const sumarCantidad = () => {
        if(amount < listProducto.unit_of_existence){
            setAmount(amount + 1);
            updateCosto(1);

        }
        
    }

    const updateCosto = (num) => {
        setInitialCost((amount+num) * precio);
    }


    const restarCantidad = () => {
        if (amount === 1) {
            console.log('No se puede restar mas')
          } else {
            setAmount(amount - 1);
            updateCosto(-1);
          }
    }


    function methodConfirmOrder(id,precio){
        axios.get(baseUrl+'/addresses/api/my-addresses/'+username+"/", { headers })
        .then((response) => {
            console.log('click aca')
            console.log(response.data.length)
            if(response.data.length === 0){
                console.log('No tiene direcciones')
                handleShow();

            }else{
                ReactDOM.render(
                    <ConfirmOrder idproducto={idproduct} cantidad={amount} precio={initialCost}/>,
                    document.querySelector("#root")
                );
                //window.location.href = "/confirmar/pedido/"+id+"/"+amount+"/"+precio
            }
        })
        .catch((error) => {
            console.log(error);
            console.log('aca estamos');
            handleShow2();
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
            window.location = '/article/details/'+idproduct
        })
        .catch(err => console.log(err));

        return false;
    }

    const handleSubmitLogin = (event) => {
        document.getElementById('loadLogin').style.display = "block"
        axios.post(urlLogin, {
            email: inputs.email,
            password: inputs.password
        })
        .then((response) => {
            document.getElementById('loadLogin').style.display = "none"
            //console.log(response.data);
            localStorage.clear();
            if(response.data.is_admin === true){
                localStorage.setItem('tokenAdmin', response.data.token);
                localStorage.setItem('nameAdmin', response.data.first_name);
                localStorage.setItem('AdminId', response.data.pk);
                localStorage.setItem('usernameAdmin', response.data.username);
                window.location.href = "/admin/productos";

            }else{
                localStorage.setItem('tokenClient', response.data.token);
                localStorage.setItem('username', response.data.first_name);
                localStorage.setItem('userId', response.data.pk);
                localStorage.setItem('usernameClient', response.data.username);
                window.location = '/article/details/'+idproduct
            }
        })
        .catch(err => console.log(err));
        document.getElementById('msgErrorLogin').style.display = "block"
        document.getElementById('loadLogin').style.display = "none"
}

    const handleSubmitRegister = (event) => {
        if(inputs.passwordNew === "" || inputs.passwordNew2 ==="" || inputs.username ==="" || inputs.emailNew ===""){
            document.getElementById('errorRegistro').style.display="block"
        }else{
            document.getElementById('errorRegistro').style.display="none"

            if(inputs.passwordNew === inputs.passwordNew2){
                if(document.getElementById('check').checked === true){
                    axios.post(baseUrl+'/users/api/register-customer/', {
                        first_name: inputs.nombreRegistro,
                        last_name:inputs.username,
                        email: inputs.emailNew,
                        password: inputs.passwordNew2,
                        age:18
                    })
                    .then((response) => {
                        //console.log(response);
                        window.location = '/article/details/'+idproduct
                    })
                    .catch(err => console.log(err));

                }else{
                    document.getElementById('errorRegistro').style.display="block"
                    document.getElementById('errorRegistro').textContent  = "Solo personas mayores de edad pueden hacer uso de esta web"
                }
                
                
            }else{
                document.getElementById('errorRegistro').style.display="block"
                document.getElementById('errorRegistro').textContent  = "Las contraseñas no coinciden"
            }
            
        } 

    }





    return (
        <>
            <Appbar></Appbar>
            <div>
                <div className='container' style={{ backgroundColor: "white", width: "90%", paddingTop: 30 }}>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-5'>
                                <div className='col'>
                                    <div className='row'>
                                        <div className="gallery test1 cf">
                                            <div>
                                                <img alt='' style={{ width: "100%", height: 350 }} src={'https://yellowrabbitbucket.s3.amazonaws.com/' + listProducto.image_one} />
                                            </div>
                                        </div>

                                    </div>
                                    <div className='row'>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="gallery test2 cf">
                                                        <div>
                                                            <img alt='' style={{ height: 131, width: "100%" }} src={'https://yellowrabbitbucket.s3.amazonaws.com/' + listProducto.image_two}></img>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="gallery test2 cf">
                                                        <div>
                                                            <img alt='' style={{ height: 131, width: "100%" }} src={'https://yellowrabbitbucket.s3.amazonaws.com/' + listProducto.image_three}></img>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="gallery test2 cf">
                                                        <div>
                                                            <img alt='' style={{ height: 131, width: "100%" }} src={'https://yellowrabbitbucket.s3.amazonaws.com/' + listProducto.image_four}></img>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className='col-md-7'>
                                <div className='container'>
                                    <h3>{listProducto.product_name}</h3>
                                    <p className="card__info"><span className='simbol_price'>$</span>{listProducto.price} <span className='simbol_price'>+ envio</span></p>
                                    <span className='simbol_price'>Stock: {listProducto.unit_of_existence}  </span>
                                </div>

                                <div className='container'>
                                    <Form.Label style={{ width: "auto", textAlign: 'center', color: "#EB5929", fontWeight: "bold", fontSize: "18px" }} type="text" name="quantity"> Seleccionar Cantidad </Form.Label>
                                    <br></br>
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Menos</Tooltip>}>
                                        {({ ref, ...triggerHandler }) => (
                                            <div variant="light" {...triggerHandler} className="d-inline-flex align-items-center">
                                                <span ref={ref} className="ms-1"><MdRemove style={{ marginRight: "10px", fontSize: 25 }} className='btnFav' onClick={() => { restarCantidad() }}></MdRemove></span>
                                            </div>
                                        )}
                                    </OverlayTrigger>

                                    <Form.Label style={{ backgroundColor: "#DFDFDF", width: "35px", textAlign: 'center' }} required type="text" name="quantity" >{amount}</Form.Label>

                                    

                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Más</Tooltip>}>
                                        {({ ref, ...triggerHandler }) => (
                                            <div variant="light" {...triggerHandler} className="d-inline-flex align-items-center">
                                                <span ref={ref} className="ms-1"><MdAdd style={{ marginRight: "10px", fontSize: 25 }} className='btnFav' onClick={() => { sumarCantidad() }}></MdAdd></span>
                                            </div>
                                        )}
                                    </OverlayTrigger>

                                    <div style={{ marginTop: "3%", fontSize: "19px", marginRight: "10px", fontWeight: "bold", backgroundColor:"#0000" }}>
                                </div>
                                <div className='container' style={{ textAlign: "left",paddingLeft:0 }}>
                                    <MdOutlineFavorite style={{ marginRight: 10, fontSize: 32 }} className='btnFav' onClick={() => { methodAddWishlist(listProducto.id); }} ></MdOutlineFavorite>
                                    <MdAddShoppingCart style={{ marginRight: 10, fontSize: 32 }} className='btnFav' onClick={() => { methodAddCarshop(listProducto.id); }} ></MdAddShoppingCart>
                                    <ToastContainer></ToastContainer>
                                    <br></br>
                                </div>
                                <div className='container' style={{paddingLeft:0}}>
                                    <p>Costo Total: ${new Intl.NumberFormat().format(initialCost)}MXN <span className='simbol_price'>+ envio</span></p>
                                    <Button style={{ backgroundColor: "#E94E1B", borderColor: "#E94E1B", fontSize: "14px" }} onClick={() => methodConfirmOrder(listProducto.id,listProducto.price)} > Proceder al pago </Button>
                                </div>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <p style={{ fontWeight: "bold", fontSize: "18px" }}>Descripcion del producto</p>
                        <p>{listProducto.description}</p>
                    </div>
                    <hr style={{ height: "5px", backgroundColor: "#EB5929", opacity: 1 }}></hr>

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

        <Modal  show={show2} size="md" onHide={handleClose2} >
            <Modal.Body style={{margin:20}}>
            <div>
            <Tabs defaultActiveKey="inicio" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="inicio" title="Iniciar sesion">
                    <div>
                        <Form onSubmit={handleSubmitLogin} >
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="email">
                                <Form.Control placeholder='e-mail' required type="mail" name="email" value={inputs.email} onChange={handleChange} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="password">
                                <Form.Control placeholder='Contraseña' required type="password" name="password" value={inputs.password} onChange={handleChange}/>
                                </Form.Group>
                            </Row>
                            <Button style={{marginLeft:10,float:"right",backgroundColor:"#E94E1B",borderColor:"#E94E1B"}} onClick={handleSubmitLogin}>
                                Iniciar sesion
                            </Button>
                            <div className="spinner-border text-secondary" id="loadLogin" style={{float:"right",display:"none"}} role="status"></div>
                            <span id="msgErrorLogin" style={{color:"red",display:"none"}}>Error al iniciar sesion, verifica tus datos</span>
                        </Form>  
                    </div>
                </Tab>
                <Tab eventKey="registro" title="Registrarse">
                <div>
                        <Form onSubmit={handleSubmitRegister}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="nombre">
                                <Form.Control placeholder='Nombre' required type="text" name="nombreRegistro" value={inputs.nombreRegistro} onChange={handleChange} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="username">
                                <Form.Control placeholder='username' required type="text" name="username" value={inputs.username} onChange={handleChange} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="emailNew">
                                <Form.Control placeholder='e-mail' required type="email" name="emailNew" value={inputs.emailNew} onChange={handleChange}/>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="passwordNew">
                                <Form.Control placeholder='Contraseña' required type="password" name="passwordNew" value={inputs.passwordNew} onChange={handleChange}/>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="passwordNew2">
                                <Form.Control placeholder='Repetir contraseña' required type="password" name="passwordNew2" value={inputs.passwordNew2} onChange={handleChange}/>
                                </Form.Group>
                            </Row>
                            <Row>
                            <Form.Group className="mb-3">
                            <Form.Check
                            id='check'
                            name="terms"
                            label="Soy mayor de edad"
                            onChange={handleChange}
                            />
                            <span id="errorRegistro" style={{color:"red",display:"none"}}>Debes de llenar todos los campos</span>
                        </Form.Group>
                            </Row>
                            <Button style={{marginLeft:10,float:"right",backgroundColor:"#E94E1B",borderColor:"#E94E1B"}} onClick={handleSubmitRegister}>
                                Registrarse
                            </Button>
                        </Form>  
                    </div>
                </Tab>
            </Tabs>
            </div>
            </Modal.Body>
        </Modal>


        </>
    )
}



export default ProductoEspecifico;