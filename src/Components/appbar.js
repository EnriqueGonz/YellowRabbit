import React,{useState,useEffect} from 'react';
import imgLogo from '../images/logo.png';

import { ReactComponent as IconTelefono } from '../images/icons/IconTelefono.svg';
import { ReactComponent as IconCorreo } from '../images/icons/IconCorreo.svg';
import { ReactComponent as IconPerfil } from '../images/icons/IconPerfil.svg';


import { Button,Modal,Tab,Tabs,Col,Form,Row } from 'react-bootstrap';
import axios from 'axios';

const urlLogin = "https://yellowrabbit.herokuapp.com/access/api/login/";

const Appbar = () =>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);  

    function methodName() {
    
        localStorage.clear();
        window.location.href = "/inicio";

        
    }

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
                window.location.href = "/inicio";
            })
            .catch(err => console.log(err));
    }

    const handleSubmitRegister = (event) => {
         if(inputs.passwordNew === "" || inputs.passwordNew2 ==="" || inputs.username ==="" || inputs.emailNew ===""){
            document.getElementById('errorRegistro').style.display="block"
        }else{
            document.getElementById('errorRegistro').style.display="none"

            if(inputs.passwordNew === inputs.passwordNew2){
                if(document.getElementById('check').checked === true){
                    console.log(inputs.nombreRegistro+inputs.username+inputs.emailNew+inputs.passwordNew2);
                    axios.post('https://yellowrabbit.herokuapp.com/users/api/register-customer/', {
                        first_name: inputs.nombreRegistro,
                        last_name:inputs.username,
                        email: inputs.emailNew,
                        password: inputs.passwordNew2,
                        age:18
                    })
                    .then((response) => {
                        console.log(response);
                        window.location.href = "/inicio";
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

    useEffect(() =>{  
        if(localStorage.getItem('tokenClient') !== null){
            console.log('Tiene token');
            document.getElementById('botonIniciarSesion').style.display="none";
        }else{
            document.getElementById('dropdown').style.display="none";
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
                    <Button id="botonIniciarSesion" style={{padding:0, display:"block"}} variant="text" onClick = {() => { handleShow()} }><p style={{marginBottom:0}}><IconPerfil style={{width:30,height:"100%",marginRight:10}}/>Iniciar Sesión</p></Button>
                        <div className="dropdown" id="dropdown">
                            <a className="nav-link active dropdown-toggle" aria-current="page" href="http://localhost:3000/#" data-bs-toggle="dropdown" aria-expanded="false"><IconPerfil style={{width:30,height:"100%",marginRight:10}}/>{localStorage.getItem('username')} </a>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <li><a  className="dropdown-item"  type="button" href="http://localhost:3000/user/mi-perfil">Mi Perfil</a></li>
                                <li><a  className="dropdown-item"  type="button" href="http://localhost:3000/user/mis-pedidos">Mis pedidos</a></li>
                                <li><a  className="dropdown-item"  type="button" href="http://localhost:3000/user/mi-wishlist">Mi Wishlist</a></li>
                                <li><a  className="dropdown-item"  type="button" href="http://localhost:3000/user/mi-carrito">Carrito de compras</a></li>
                                <li><a  className="dropdown-item"  type="button" href="http://localhost:3000/user/mis-compras">Mis compras</a></li>
                                <hr style={{height:"2px",backgroundColor:"#EB5929",opacity:1}}></hr>
                                <li><button  className="dropdown-item"  type="button" onClick = {handleShow2}>Cerrar sesion</button></li>
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

        <Modal  show={show2} size="md" onHide={handleClose2} >
            <Modal.Body style={{margin:20}}>
            <div style={{border:"solid",borderColor:"#E94E1B",borderWidth:5,padding:25}}>
                <h4>¿Seguro que quieres cerrar sesión?</h4>

                <Button style={{marginLeft:10,float:"right",backgroundColor:"#E94E1B",borderColor:"#E94E1B"}} onClick = {handleClose2}>
                    Volver
                </Button>
                <Button style={{marginLeft:10,float:"right",backgroundColor:"#E94E1B",borderColor:"#E94E1B" }} onClick = {() => { methodName()} } >
                    cerrar sesion
                </Button>
                
                <br></br>
                <br></br>
                
            </div>
            </Modal.Body>
        </Modal>

        </>
    )

}
export default Appbar;