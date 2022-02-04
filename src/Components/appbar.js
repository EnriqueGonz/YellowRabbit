import React,{useState,useEffect} from 'react';
import imgLogo from '../images/logo.png';

import { ReactComponent as IconTelefono } from '../images/icons/IconTelefono.svg';
import { ReactComponent as IconCorreo } from '../images/icons/IconCorreo.svg';
import { ReactComponent as IconPerfil } from '../images/icons/IconPerfil.svg';


import { Button,Modal,Tab,Tabs,Col,Form,Row } from 'react-bootstrap';
import axios from 'axios';

const urlregistro = "https://yellowrabbit.herokuapp.com/users/api/register-customer/";
const urlLogin = "https://yellowrabbit.herokuapp.com/access/api/login/";

const Appbar = () =>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        username:"",
        emailNew:"",
        passwordNew:"",
        passwordNew2:"",
    })

    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        console.log(name + value)
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmitLogin = (event) => {
            axios.post(urlLogin, {
                email: inputs.email,
                password: inputs.password
            })
            .then((response) => {
                console.log(response);
                localStorage.setItem('tokenClient', response.data.token);
                localStorage.setItem('username', response.data.first_name);
                localStorage.setItem('userId', response.data.pk);
                localStorage.setItem('usernameClient', response.data.username);
            })
            .catch(err => console.log(err));
    }

    const handleSubmitRegister = (event) => {
        console.log('ACA');
        if(inputs.passwordNew === inputs.passwordNew2){
            console.log('iguales');
            axios.post(urlregistro, {
                first_name: inputs.username,
                last_name:"null",
                email: inputs.emailNew,
                password: inputs.passwordNew2
            })
            .then((response) => {
                console.log(response);
            })
            .catch(err => console.log(err));
        }

    }

    useEffect(() =>{  
        console.log(localStorage.getItem('tokenClient'));
        if(localStorage.getItem('tokenClient') !== null){
            console.log('Tiene token');
            document.getElementById('botonIniciarSesion').style.display="none";

        }
    })


    return(    
        <>
        <div>
            <div>
                <div className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"#FFF",justifyContent: "space-around"}}>
                  <div>
                      <div className="col">
                          <div className='row' style={{alignItems:"center"}}>
                          <IconTelefono style={{width:50,height:"100%"}}/>
                              <div className='col'> 
                                <div className='row'>
                                    <p style={{marginBottom:0,paddingTop:15}}>Llama al</p>
                                </div>
                                <div className='row'>
                                    <p style={{color:"#606060", fontWeight:"bold"}}>55 1234 5678</p>
                                </div>
                              </div>
                          </div>
                          <div className='row' style={{alignItems:"center"}}>
                          <IconCorreo style={{width:50,height:"100%"}}/>
                              <div className='col'> 
                                <div className='row'>
                                    <p style={{marginBottom:0}}>Contactanos</p>
                                </div>
                                <div className='row'>
                                    <p style={{color:"#606060",fontWeight:"bold"}}>Correo@yellowrabbit.com.mx</p>
                                </div>
                              </div>
                          </div>

                      </div>
                  </div>
                  <div style={{textAlign:"center"}}>
                      <img alt='' style={{width:"35%"}} src={imgLogo}></img>
                  </div>
                  <div>
                    <Button id="botonIniciarSesion" style={{padding:0, display:"block"}} variant="text" onClick = {() => { handleShow()} }><p style={{marginBottom:0}}>Iniciar Sesión</p></Button>
                        <div className="dropdown">
                            <a className="nav-link active dropdown-toggle" aria-current="page" href="http://localhost:3000/#" data-bs-toggle="dropdown" aria-expanded="false"><IconPerfil style={{width:30,height:"100%",marginRight:10}}/>{localStorage.getItem('username')} </a>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <li><a  className="dropdown-item"  type="button" href="http://localhost:3000/user/mi-perfil">Mi Perfil</a></li>
                                <li><a  className="dropdown-item"  type="button" href="http://localhost:3000/user/mis/pedidos">Mis pedidos</a></li>
                                <li><a  className="dropdown-item"  type="button" href="http://localhost:3000/user/mi-whitlist">WhiteList</a></li>
                                <li><a  className="dropdown-item"  type="button" href="http://localhost:3000/user/mi-carrito">Carrito de compras</a></li>
                                <li><a  className="dropdown-item"  type="button" href="http://localhost:3000/user/mis-compras">Mis compras</a></li>
                                <hr style={{height:"2px",backgroundColor:"#EB5929",opacity:1}}></hr>
                                <li><a  className="dropdown-item"  type="button" href="http://localhost:3000/user/cerrarsesion">Cerrar sesion</a></li>
                            </ul>
                        </div>
                  </div>
                </div>
            </div>
        </div>

        
        <Modal  show={show} size="md" onHide={handleClose} >
            <Modal.Body style={{margin:20}}>
            <div>
            <Tabs defaultActiveKey="inicio" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="inicio" title="Iniciar sesion">
                    <div>
                        <Form onSubmit={handleSubmitLogin} >
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="email">
                                <Form.Control style={{backgroundColor:"#F7C169"}} placeholder='e-mail' required type="text" name="email" value={inputs.nombrePersonal} onChange={handleChange} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="password">
                                <Form.Control style={{backgroundColor:"#F7C169"}} placeholder='Contraseña' required type="password" name="password" value={inputs.emailPersonal} onChange={handleChange}/>
                                </Form.Group>
                            </Row>
                            <Button style={{marginLeft:10,float:"right",backgroundColor:"#E94E1B",borderColor:"#E94E1B"}} onClick={handleSubmitLogin}>
                                Iniciar sesion
                            </Button>
                        </Form>  
                    </div>
                </Tab>
                <Tab eventKey="registro" title="Registrarse">
                <div>
                        <Form onSubmit={handleSubmitRegister}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="username">
                                <Form.Control style={{backgroundColor:"#F7C169"}} placeholder='Nombre de Usuario' required type="text" name="username" value={inputs.username} onChange={handleChange} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="emailNew">
                                <Form.Control style={{backgroundColor:"#F7C169"}} placeholder='e-mail' required type="text" name="emailNew" value={inputs.emailNew} onChange={handleChange}/>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="passwordNew">
                                <Form.Control style={{backgroundColor:"#F7C169"}} placeholder='Contraseña' required type="password" name="passwordNew" value={inputs.passwordNew} onChange={handleChange}/>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="passwordNew2">
                                <Form.Control style={{backgroundColor:"#F7C169"}} placeholder='Repetir contraseña' required type="password" name="passwordNew2" value={inputs.passwordNew2} onChange={handleChange}/>
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
export default Appbar;