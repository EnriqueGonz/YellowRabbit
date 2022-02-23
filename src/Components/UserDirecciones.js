import React, { useEffect,useState } from 'react';

import imgindex1 from '../images/fondouser.png';
import { Form,Button,Row,Col,Modal } from 'react-bootstrap';

import axios from 'axios';

import Appbar from './appbarClient';
import Footer from './footer';

import { MdDelete,MdEdit } from "react-icons/md";

var token = localStorage.getItem('tokenClient');
var username = localStorage.getItem('usernameClient');
var idusuario = localStorage.getItem('userId');
let idDireccion = 0;

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const UserDirecciones = () =>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);  

    const [listDirecciones, setlistDirecciones] = useState([]);
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

    useEffect(() =>{
        try {
          axios.get('https://yellowrabbit.herokuapp.com/addresses/api/my-addresses/'+username+"/",{ headers })
          .then((response) => {
            setlistDirecciones(response.data);
            console.log(response)

          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setlistDirecciones])
      

    
      

      function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        console.log(name + value)
        setinputsDireccion(values => ({ ...values, [name]: value }))
    }

    const handleSubmitDireccion = (event) => {
        axios.post('https://yellowrabbit.herokuapp.com/addresses/api/register/', {
            user: idusuario,
            street: inputsDireccion.street,
            avenue: inputsDireccion.avenue,
            neighborhood: inputsDireccion.neighborhood,
            street_number: inputsDireccion.street_number,
            apartment_number: inputsDireccion.apartment_number,
            postal_code: inputsDireccion.postal_code,
            city: inputsDireccion.city,
            state: inputsDireccion.state,
            additional_data: inputsDireccion.additional_data,
        },{
            headers:{
                "Authorization" : "Token "+token
            }
        }
        )
        .then((response) => {
            console.log(response);
            window.location = '/user/mis-direcciones'
        })
        .catch(err => console.log(err));

        return false;
    }

    function methodAddDireccion() {
        console.log('Hola');
        document.getElementById('formContent').style.display = "block"
        
    }
    function methodDelDireccion() {
        try {
            axios.delete('https://yellowrabbit.herokuapp.com/addresses/api/delete/'+idDireccion+'/',{headers})
            .then((response) => {
                console.log(response.status);
                window.location.href = "/user/mis-direcciones"
            })
            .catch((error) => {
                console.log(error);
            });
    
        } catch (error) {
            console.log(' . ', error);
        }
    }

    function methodModalDelDireccion(id) {
        //console.log('DelDireccion' + id);
        idDireccion = id;
        handleShow();
    }

    function methodModalUpdateDireccion(id) {
        //console.log('UpdateDireccion' + id);
        idDireccion = id;
        handleShow2();
        try {
            axios.get('https://yellowrabbit.herokuapp.com/addresses/api/specific-address/'+id+'/',{headers})
            .then((response) => {
                //console.log(response.data);
                setinputsDireccion(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(' . ', error);
        }

    }

    function methodUpdateDireccion() {

        axios.put('https://yellowrabbit.herokuapp.com/addresses/api/update/'+idDireccion+'/',{
                user: idusuario,
                street: inputsDireccion.street,
                avenue: inputsDireccion.avenue,
                neighborhood: inputsDireccion.neighborhood,
                street_number: inputsDireccion.street_number,
                apartment_number: inputsDireccion.apartment_number,
                postal_code: inputsDireccion.postal_code,
                city: inputsDireccion.city,
                state: inputsDireccion.state,
                additional_data: inputsDireccion.additional_data,
            },{headers})
            .then((response) => {
                console.log(response);
                window.location.href = "/user/mis-direcciones"
            })
            .catch((error) => {
                console.log(error);
            });
    }

    


      

    return(    
        <>
        <Appbar></Appbar>
        <div style={{backgroundImage:"url('"+imgindex1+"')"}}>
            <div className='container' style={{backgroundColor:"white",width:"60%"}}>

                <div className='container' style={{width:"90%"}}>
                    <br/><br/>
                    <div className='container'>
                        <div className="row">
                            <div className="col">
                                <h3>Mis direcciones</h3>
                            </div>
                            <div className="col" style={{textAlign:"right"}}>
                                <a href='#formContent' className='btn row' style={{color:"white",backgroundColor:"#E94E1B",borderColor:"#E94E1B"}} onClick = {() => { methodAddDireccion()} }  >Agregar Direccion</a>
                            </div>
                        </div>
                    </div>


                    <hr style={{height:"5px",backgroundColor:"#EB5929",opacity:1}}></hr>

                    <div className='container'>
                        {listDirecciones.map((item,index) => (
                            <div key={index} className="row">
                                <div className="col-10">
                                    <p style={{margin:"0px",paddingTop:"20px"}}>DIRECCION #{index}</p>
                                    <div style={{backgroundColor:"#DFDFDF", padding:"20px" }}>
                                        <p style={{margin:"2px"}}>{item.street +" " + item.avenue +" " + item.street_number +" " + item.neighborhood +" " + item.city +" " + item.state +" C.P: " +item.postal_code}</p>
                                        <p style={{margin:"2px"}}>{item.additional_data + " N°" + item.apartment_number}</p>
                                    </div>
                                </div>
                                <div className="col-2" style={{alignItems:"flex-end",justifyContent:"space-around",display:"flex"}}>
                                    <MdDelete style={{fontSize:32}} className='btnFav' onClick = {() => { methodModalDelDireccion(item.id)} }  ></MdDelete>
                                    <MdEdit style={{fontSize:32}} className='btnFav' onClick = {() => { methodModalUpdateDireccion(item.id)} } ></MdEdit>
                                </div>
                            </div>
                        ))}


                    </div>
                    <div name="formContent" id='formContent' className='container' style={{display:"none",width:"90%",paddingTop:50}}>
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
                        <Form.Label>Codigo Postal (CP)</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="number" name="postal_code" value={inputsDireccion.postal_code} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="">
                        <Form.Label>Ciudad/Pueblo</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="text" name="city" value={inputsDireccion.city} onChange={handleChange} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="text"  name="state" value={inputsDireccion.state} onChange={handleChange} />
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

                    </div><br></br><br></br>


                    


                </div>
            </div> 

        </div>
        <Footer></Footer>

        <Modal  show={show} size="md" onHide={handleClose} >
            <Modal.Body style={{margin:20}}>
            <div style={{border:"solid",borderColor:"#E94E1B",borderWidth:5,padding:25}}>
                <h4>¿Segur@ que quieres eliminar direccion?</h4>

                <Button style={{marginLeft:10,float:"right",backgroundColor:"#E94E1B",borderColor:"#E94E1B"}} onClick = {handleClose}>
                    Volver
                </Button>
                <Button style={{marginLeft:10,float:"right",backgroundColor:"#E94E1B",borderColor:"#E94E1B" }} onClick = {() => { methodDelDireccion()} } >
                    Eliminar
                </Button>
                
                <br></br>
                <br></br>
                
            </div>
            </Modal.Body>
        </Modal>

        <Modal  show={show2} size="md" onHide={handleClose2} >
            <Modal.Body style={{margin:20}}>
            <div style={{border:"solid",borderColor:"#E94E1B",borderWidth:5,padding:25}}>
                <Form >
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
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="number" name="street_number" value={inputsDireccion.street_number}  onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="">
                        <Form.Label>Numero de casa</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="number" name="apartment_number" value={inputsDireccion.apartment_number} onChange={handleChange} />
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
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="text"  name="state" value={inputsDireccion.state} onChange={handleChange} />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Informacion adicional</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} as="textarea" required type="text"  name="additional_data" value={inputsDireccion.additional_data} onChange={handleChange} />
                    </Form.Group>
                    <Button style={{marginLeft:10,float:"right",backgroundColor:"#E94E1B",borderColor:"#E94E1B"}} onClick = {() => { methodUpdateDireccion()} } >
                        Actualizar
                    </Button>
                    <br></br>
                </Form>
                
                
            </div>
            </Modal.Body>
        </Modal>
        </>
    )

}
export default UserDirecciones;