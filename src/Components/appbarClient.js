import React,{useState,useEffect} from 'react';
import imgLogo from '../images/logoB-N.png';
import fondo from '../images/fondoAppbarClient.png';
import { Button,Modal,Tab,Tabs,Col,Form,Row } from 'react-bootstrap';
import { ReactComponent as IconPerfil } from '../images/icons/IconPerfilBlack.svg';
import axios from 'axios';
import { MdNotifications,MdDelete } from "react-icons/md"
import '../config';
const token = localStorage.getItem('tokenClient');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};

var baseUrl = global.config.yellow.rabbit.url;
var numNotificaciones = 0;

const urlLogin = baseUrl+"/access/api/login/";

const Appbar = () =>{
    const [userData, setuserData] = useState(false);
    const [listNotificaciones, setlistNotificaciones] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);  

    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);

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
                window.location.reload();
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
                    axios.post(baseUrl+'/users/api/register-customer/', {
                        first_name: inputs.nombreRegistro,
                        last_name:inputs.username,
                        email: inputs.emailNew,
                        password: inputs.passwordNew2,
                        age:18
                    })
                    .then((response) => {
                        console.log(response);
                        window.location.reload();
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


    function methodName() {
        localStorage.clear();
        window.location.href = "/inicio";
    }

    useEffect(() =>{  
        try {
            if(localStorage.getItem('tokenClient') !== null){
                setuserData(true);
                document.getElementById('botonIniciarSesion').style.display="none";
            }else{
                document.getElementById('dropdown').style.display="none";
                console.log(userData);
            }
            
        } catch (error) {
            console.log(error)
        }
    },[setuserData])


    useEffect(() =>{  
        axios.get(baseUrl+'/inbox/api/my-notifications/', {headers})
        .then((response) => {
            setlistNotificaciones(response.data[0])
            numNotificaciones = response.data[1][0]["unread_notifications: "];
        })
        .catch(err => console.log(err));
    },[setlistNotificaciones])

    function delNotificacion(id) {
        console.log(id);

        axios.delete(baseUrl+'/inbox/api/delete-notification/'+id+'/',{ headers })
        .then((response) => {
            ActualizarNotificaciones();

        })
        .catch((error) => {
            console.log(error);
        });
      
      }

      function ActualizarNotificaciones() {
        axios.get(baseUrl+'/inbox/api/my-notifications/', {headers})
        .then((response) => {
            setlistNotificaciones(response.data[0])
            numNotificaciones = response.data[1][0]["unread_notifications: "];
        })
        .catch(err => console.log(err));
        
    }

    function readNotificacion(id,idorder){
        console.log(id)
        axios.put(baseUrl+'/inbox/api/mark-read-notification/'+id+'/')
        .then((response) => {
            console.log(response);
            ActualizarNotificaciones();
            window.location.href = '/detallesPedido/'+idorder+'/'
        })
        .catch((error) => {
            console.log(error);
        });
    }


    

    return(    
        <>
        <div>
            <div style={{backgroundImage: `url(${fondo})`}}>
                <div className="navbar navbar-expand-lg navbar-light" style={{justifyContent: "space-around"}}>
                  <div>
                      <img alt='' style={{width:"35%"}} src={imgLogo}></img>
                  </div>
                  <div>
                      <span></span>
                  </div>
                  <div>
                    <div style={{display:"inline-flex",placeItems:"center"}}>
                        <button className="btn position-relative" onClick={handleShow3} style={{margin:0,padding:1}}>
                            <MdNotifications style={{fontSize:25}}></MdNotifications>
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{padding:4}}>
                            {numNotificaciones}
                            <span className="visually-hidden">unread messages</span>
                        </span>
                        </button>
                        <Button id="botonIniciarSesion" style={{padding:0, display:"block"}} variant="text" onClick = {() => { handleShow2()} }><p style={{marginBottom:0}}><IconPerfil style={{width:30,height:"100%",marginRight:10}}/>Iniciar Sesión</p></Button>
                        <div className="dropdown" id="dropdown">
                            <a className="nav-link active dropdown-toggle" aria-current="page" href="/#" data-bs-toggle="dropdown" aria-expanded="false">{localStorage.getItem('username')} </a>
                            <ul className="dropdown-menu">
                                <li><a  className="dropdown-item"  type="button" href="/user/mi-perfil">Mi Perfil</a></li>
                                <li><a  className="dropdown-item"  type="button" href="/user/mis-pedidos">Mis pedidos</a></li>
                                <li><a  className="dropdown-item"  type="button" href="/user/mi-wishlist">Mi Wishlist</a></li>
                                <li><a  className="dropdown-item"  type="button" href="/user/mi-carrito">Carrito de compras</a></li>
                                <hr style={{height:"2px",backgroundColor:"#EB5929",opacity:1}}></hr>
                                <li><button  className="dropdown-item"  type="button" onClick = {handleShow}>Cerrar sesion</button></li>
                            </ul>
                        </div>
                    </div>
                  </div>
                </div>
                <div>
                    <div className="navbar navbar-expand-lg navbar-light" style={{justifyContent: "space-around"}}>
                        <a className='aNoSelected' href='/inicio'>INICIO</a>
                        <a className='aNoSelected' href='/datos'>DATOS</a>
                        <a className='aNoSelected' href='/productos'>PRODUCTOS</a>
                        <a className='aNoSelected' href='/blog'>BLOG</a>
                        <a className='aNoSelected' href='/contacto'>CONTACTO</a>
                    </div>
                </div>
            </div>
        </div>

        <Modal  show={show} size="md" onHide={handleClose} >
            <Modal.Body style={{margin:20}}>
            <div style={{border:"solid",borderColor:"#E94E1B",borderWidth:5,padding:25}}>
                <h4>¿Seguro que quieres cerrar sesión?</h4>

                <Button style={{marginLeft:10,float:"right",backgroundColor:"#E94E1B",borderColor:"#E94E1B"}} onClick = {handleClose}>
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

        <Modal  show={show3} size="md" onHide={handleClose3} >
            <Modal.Body style={{margin:20}}>
            {listNotificaciones.map((item,index) => (
                <div key={index}>
                    {
                    item.unread === true
                    ? <div>
                            <div className='row'>
                                <div className='col-10'>
                                    <button style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}} className="btn dropdown-item" onClick = {() => { readNotificacion(item.id,item.actor_object_id)} } >{item.description}</button>
                                </div>
                                <div className='col-2'>
                                    <button className='btn'  onClick = {() => { delNotificacion(item.id)} }  ><MdDelete className='btnDel' style={{width:"100%",fontSize:24}}></MdDelete></button>
                                    
                                </div>
                            </div>
                        </div>
                    : <div style={{backgroundColor:"beige"}} >
                            <div className='row'>
                                <div className='col-10'>
                                    <button style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}} className="btn dropdown-item">{item.description}</button>
                                </div>
                                <div className='col-2'>
                                    <button className='btn' onClick = {() => { delNotificacion(item.id)} } ><MdDelete className='btnDel' style={{width:"100%",fontSize:24}}></MdDelete></button>
                                    
                                </div>
                            </div>
                        </div>
                    }
                </div>
            ))}
            </Modal.Body>
        </Modal>
        

        </>
    )

}
export default Appbar;