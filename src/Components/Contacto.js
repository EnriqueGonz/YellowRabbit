import React,{useState} from 'react';
import imgcontacto from '../images/contacto.png';

import { ReactComponent as IconTelefono } from '../images/icons/IconTelefono.svg';
import { ReactComponent as IconCorreo } from '../images/icons/IconCorreo.svg';

import { ReactComponent as IconFacebook } from '../images/icons/iconFacebook.svg';
import { ReactComponent as IconTwitter } from '../images/icons/iconTwitter.svg';
import { ReactComponent as IconInstagram } from '../images/icons/iconInstagram.svg';
import { ReactComponent as IconTikTok } from '../images/icons/iconTikTok.svg';
import { ReactComponent as IconWhats } from '../images/icons/whats.svg';

import { Form,Button,Row,Col,Carousel } from 'react-bootstrap';
import axios from 'axios';
import Appbar from './appbar';

const Contacto = () =>{

    const [inputs, setInputs] = useState({
        nombrePersonal: "",
        emailPersonal: "",
        mensajePersonal: "", 
        nombreAmigo: "",
        emailAmigo: "",
        mensajeAmigo: "", 
    })

    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        //console.log(name + value)
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        axios.post("url", {
            user: "id_usuario",
            first_name: inputs.avenida,
            email: inputs.email
        })
        .then((response) => {
            console.log(response);
        })
        .catch(err => console.log(err));

        return false;

    }

    return(    
        <>
        <Appbar></Appbar>
        <div className='container'>
            <div style={{widows:"75%"}}>
            <div className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"#FFF",justifyContent: "space-around"}}>
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
                <img alt='' src={imgcontacto} style={{width:"100%"}}/>
                <div className="possText2Img1">
                    <p style={{fontFamily:"'Quicksand', sans-serif",fontWeight:"bold",color:"white",fontSize:65}}>Contactanos</p>
                </div>
            </Carousel.Item>
        </Carousel>

        <div className="container" style={{paddingTop:50}}>
            <div className="grid-container">
                <div className="grid-item">
                    <div className="column">
                        <div>
                        <p style={{fontFamily:"'Quicksand', sans-serif",fontSize:30,fontWeight:500,color:"#EB5929"}}>Contactanos</p>
                            <div className="col">
                                <div className='row' style={{alignItems:"center"}}>
                                <IconTelefono style={{width:50,height:"100%"}}/>
                                    <div className='col'> 
                                        <div className='row'>
                                            <p style={{marginBottom:0}}>Llama al</p>
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
                                            <p style={{marginBottom:0,paddingTop:10,}}>Contactanos</p>
                                        </div>
                                        <div className='row'>
                                            <p style={{color:"#606060",fontWeight:"bold"}}>Correo@yellowrabbit.com.mx</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid-item">
                    <div className="column">
                        <p style={{fontFamily:"'Quicksand', sans-serif",fontSize:30,fontWeight:500,color:"#EB5929"}}>Visitanos</p>
                        <div className='col'>
                            <div className='row'>
                                <div className='col'><a href='https://www.facebook.com/'><IconFacebook style={{width:30,height:"100%",filter: "invert(0.5) sepia(1) saturate(12) hue-rotate(332deg)"}}/></a></div>
                                <div className='col'><a href='https://www.facebook.com/'><IconTwitter style={{width:30,height:"100%",filter: "invert(0.5) sepia(1) saturate(12) hue-rotate(332deg)"}}/></a></div>
                                <div className='col'><a href='https://www.facebook.com/'><IconInstagram style={{width:30,height:"100%",filter: "invert(0.5) sepia(1) saturate(12) hue-rotate(332deg)"}}/></a></div>
                                <div className='col'><a href='https://www.facebook.com/'><IconTikTok style={{width:30,height:"100%",filter: "invert(0.5) sepia(1) saturate(12) hue-rotate(332deg)"}}/></a></div>
                            </div>
                            <div className='row' style={{textAlign:"center"}}>
                                <p style={{color:"black"}}>@YellowRabbitSToys</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="grid-item">
                    <div className="column" style={{textAlign:"center"}}>
                        <p style={{fontFamily:"'Quicksand', sans-serif",fontSize:30,fontWeight:500,color:"#EB5929"}}>Chateemos</p>
                        <IconWhats/>
                    </div>
                </div>
            </div>
        </div>

        <div className="container" style={{paddingTop:50, paddingBottom:50}}>
            <div className='grid-containerForm'>
                <div className="grid-item">
                    <div className="column">
                        <p style={{fontFamily:"'Quicksand', sans-serif",fontSize:36,fontWeight:700,color:"#EB5929"}}>Escribenos</p>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="">
                                <Form.Control style={{backgroundColor:"#F7C169"}} placeholder='Nombre' required type="text" name="nombrePersonal" value={inputs.nombrePersonal} onChange={handleChange} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="">
                                <Form.Control style={{backgroundColor:"#F7C169"}} placeholder='e-mail' required type="text" name="emailPersonal" value={inputs.emailPersonal} onChange={handleChange}/>
                                </Form.Group>
                            </Row>
                            <Form.Group className="mb-3" controlId="">
                                <Form.Control style={{backgroundColor:"#F7C169"}} as="textarea" rows={3} placeholder='Mensaje' required name="mensajePersonal" value={inputs.mensajePersonal} onChange={handleChange} />
                            </Form.Group>
                            <Button style={{marginLeft:10,float:"right",backgroundColor:"#E94E1B",borderColor:"#E94E1B"}}>
                                Enviar
                            </Button>
                        </Form>  

                    </div>
                </div>
                <div className="grid-item">
                    <div className="column">
                        <p style={{fontFamily:"'Quicksand', sans-serif",fontSize:36,fontWeight:700,color:"#EB5929"}}>Invita a un amig@</p>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="">
                                <Form.Control style={{backgroundColor:"#F7C169"}} placeholder='Nombre de tu amigo' required type="text" name="nombreAmigo" value={inputs.nombreAmigo} onChange={handleChange} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="">
                                <Form.Control style={{backgroundColor:"#F7C169"}} placeholder='e-mail de tu amigo' required type="text" name="emailAmigo" value={inputs.emailAmigo} onChange={handleChange}/>
                                </Form.Group>
                            </Row>
                            <Form.Group className="mb-3" controlId="">
                                <Form.Control style={{backgroundColor:"#F7C169"}} as="textarea" rows={3} placeholder='Mensaje' required name="mensajeAmigo" value={inputs.mensajeAmigo} onChange={handleChange} />
                            </Form.Group>
                            <Button style={{marginLeft:10,float:"right",backgroundColor:"#E94E1B",borderColor:"#E94E1B"}}>
                                Enviar
                            </Button>
                        </Form>  
                        
                    </div>
                </div>
            </div>
        </div>



        <footer style={{backgroundColor:"#EB5929"}}>
            <div className="navbar navbar-expand-lg navbar-light" style={{justifyContent: "space-around"}}>
                <div style={{textAlign:"center"}}>
                    <p style={{color:"white",margin:5}}>@2021 Yellow Rabbit - Todos los derechos reservados</p>
                </div>
            </div>
        </footer>
        </>
    )

}
export default Contacto;