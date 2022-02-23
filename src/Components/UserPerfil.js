import React, { useEffect,useState } from 'react';

import imgindex1 from '../images/fondouser.png';
import { ReactComponent as IconPerfil } from '../images/icons/IconPerfil.svg';
import { Form,Button,Row,Col,Modal } from 'react-bootstrap';

import axios from 'axios';

import Appbar from './appbarClient';
import Footer from './footer';

var token = localStorage.getItem('tokenClient');
var username = localStorage.getItem('usernameClient');
var img = '';



const headers = {
    'Authorization': `Token ${token}`,
    "Content-Type": "multipart/form-data"
};


const UserPerfil = () =>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selectedFile, setSelectedFile] = useState("");

    const [inputs, setInputs] = useState({
        email: "",
        first_name: "",
        age: "",
        phone: "",
        identity: "",
    })
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
            setinputsDireccion(response.data[0]);
            console.log(response)

          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setinputsDireccion])

    

    useEffect(() =>{ 
        try {
          axios.get('https://yellowrabbit.herokuapp.com/users/api/my-account/'+username+'/',{ headers })
          .then((response) => {
            //setInputs(response.data[0]);
            console.log(response.data);
            if(response.data.profile_picture != null){
                img = response.data.profile_picture;
                console.log("No es null");
                document.getElementById("ImgProfile").style.display = "none"

            }else{
                console.log("Es null");
                document.getElementById("ImgProfileLoad").style.display = "none"
            }
            setInputs(response.data);

          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setInputs])
      
  const handleSubmitImage = (event) => {
    event.preventDefault()
    let formData = new FormData();
    formData.append('image', selectedFile)
    console.log(selectedFile);
    console.log(formData.getAll('image'));
    
    try {
        axios.post('https://yellowrabbit.herokuapp.com/users/api/update/profile-picture/'+username+'/', 
        formData    
        ,{headers})
        .then((response) => {
            console.log(response);
            window.location.href = "/user/mi-perfil";

        })
    } catch(error) {
      console.log(error)
    }
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }


      const handleSubmit = (event) => {
        axios.put('https://yellowrabbit.herokuapp.com/users/api/update/email/'+username+'/', {
            first_name: inputs.first_name,
            email: inputs.email,
        },{
            headers:{
                "Authorization" : "Token "+token
            }
        }
        )
        .then((response) => {
            console.log(response);
            window.location.href = "/user/mi-perfil";
        })
        .catch(err => console.log(err));

        return false;
    }

    const handleSubmitPerson = (event) => {
        axios.put('https://yellowrabbit.herokuapp.com/users/api/update/personal-data/'+username+'/', {
            age: inputs.age,
            identity: inputs.identity,
            phone: inputs.phone,
        },{
            headers:{
                "Authorization" : "Token "+token
            }
        }
        )
        .then((response) => {
            console.log(response);
            window.location.href = "/user/mi-perfil";
        })
        .catch(err => console.log(err));

        return false;
    }


      function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        //console.log(name + value)
        try{
            setInputs(values => ({ ...values, [name]: value }))
            setinputsDireccion(values => ({ ...values, [name]: value }))
        }catch{

        }
    }

    const handleSubmitDireccion = (event) => {
        axios.put('https://yellowrabbit.herokuapp.com/addresses/api/update/'+5+"/", {
            user: 2,
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
            window.location = '/user/mi-perfil'
        })
        .catch(err => console.log(err));

        return false;


    }
      

    return(    
        <>
        <Appbar></Appbar>
        <div style={{backgroundImage:"url('"+imgindex1+"')"}}>
            <div className='container' style={{backgroundColor:"white",width:"60%"}}>

                <div className='container' style={{width:"90%"}}>
                    <br/><br/>
                    <h3>Datos de la cuenta</h3>
                    <div className='container' style={{width:"90%"}}>
                        <div className='row'>
                            <div className='col-sm-4'>
                                <div style={{width:"100%",backgroundColor:"#DFDFDF"}}>
                                    <IconPerfil id="ImgProfile" style={{width:"100%",height:"100%"}}></IconPerfil>
                                    <img id="ImgProfileLoad" alt="Imagen Perfil Usuario" src={img} style={{width:"100%",height:"100%"}}></img>
                                </div>
                            </div>
                            <div className='col-sm-8' >
                                <div style={{height:"100%",position:"relative"}}>
                                    <Button style={{position:"absolute",bottom:0,backgroundColor:"#E94E1B",borderColor:"#E94E1B"}} onClick = {() => { handleShow()} }>Cambiar imagen</Button>
                                </div>
                            </div>

                        </div>
                        <br></br>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control style={{backgroundColor:"#DFDFDF"}} placeholder='Username' required type="text" name="first_name" value={inputs.first_name} onChange={handleChange}  />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="">
                                <Form.Label>E-mail:</Form.Label>
                                <Form.Control style={{backgroundColor:"#DFDFDF"}} placeholder='e-mail' required type="text" name="email" value={inputs.email} onChange={handleChange}  />
                                </Form.Group>
                            </Row>

                            <Button style={{marginLeft:10,float:"right",backgroundColor:"#E94E1B",borderColor:"#E94E1B"}} onClick={handleSubmit}>
                                Actualizar
                            </Button>
                        </Form>  

                    </div><br></br><br></br>
                    <hr style={{height:"5px",backgroundColor:"#EB5929",opacity:1}}></hr>
                    <h3>Datos personales</h3>
                    <br></br>
                    <div className='container' style={{width:"90%"}}>
                        <Form onSubmit={handleSubmitPerson}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="">
                                <Form.Label>Edad:</Form.Label>
                                <Form.Control style={{backgroundColor:"#DFDFDF"}} placeholder='Edad' required type="number" name="age" value={inputs.age == null ? '' : inputs.age} onChange={handleChange}  />
                                </Form.Group>

                                <Form.Group as={Col} controlId="">
                                <Form.Label>Identidad:</Form.Label>
                                <Form.Control style={{backgroundColor:"#DFDFDF"}} placeholder='Identidad' required type="text" name="identity" value={inputs.identity == null ? '' : inputs.identity} onChange={handleChange}  />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="">
                                <Form.Label>Telefono:</Form.Label>
                                <Form.Control style={{backgroundColor:"#DFDFDF"}} placeholder='Telefono' required type="number" name="phone" value={inputs.phone == null ? '' : inputs.phone} onChange={handleChange}  />
                                </Form.Group>
                            </Row>

                            <Button style={{marginLeft:10,float:"right",backgroundColor:"#E94E1B",borderColor:"#E94E1B"}} onClick={handleSubmitPerson}>
                                Actualizar
                            </Button>
                        </Form>  

                    </div><br></br><br></br>

                    <hr style={{height:"5px",backgroundColor:"#EB5929",opacity:1}}></hr>
                    <div className='container'>
                        <div className="row">
                            <div className="col">
                                <h3>Direccion</h3>
                            </div>
                            <div className="col" style={{textAlign:"right"}}>
                                <a href='/user/mis-direcciones'>Ver todas</a>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className='container' style={{width:"90%"}}>
                    <Form onSubmit={handleSubmitDireccion}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Calle</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="text" name="street" value={inputsDireccion.street || ''} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="">
                        <Form.Label>Barrio/Colonia</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="text" name="neighborhood" value={inputsDireccion.neighborhood == null ? '' : inputsDireccion.neighborhood} onChange={handleChange}  />
                        </Form.Group>

                        
                    </Row>
                    <Row className="mb-3">

                        <Form.Group as={Col} controlId="">
                        <Form.Label>Avenida</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="text" name="avenue" value={inputsDireccion.avenue == null ? '' : inputsDireccion.avenue} onChange={handleChange}  />
                        </Form.Group>

                        
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Numero de calle</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="number" name="street_number" value={inputsDireccion.street_number == null ? '' : inputsDireccion.street_number}  onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="">
                        <Form.Label>Numero de casa</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="number" name="apartment_number" value={inputsDireccion.apartment_number == null ? '' : inputsDireccion.apartment_number} onChange={handleChange} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Codigo Postal (CP)</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="number" name="postal_code" value={inputsDireccion.postal_code == null ? '' : inputsDireccion.postal_code} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="">
                        <Form.Label>Ciudad/Pueblo</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="text" name="city" value={inputsDireccion.city == null ? '' : inputsDireccion.city} onChange={handleChange} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} required type="text"  name="state" value={inputsDireccion.state == null ? '' : inputsDireccion.state} onChange={handleChange} />
                        </Form.Group>

                    </Row>
                    
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Informacion adicional</Form.Label>
                        <Form.Control style={{backgroundColor:"#DFDFDF"}} as="textarea" required type="text"  name="additional_data" value={inputsDireccion.additional_data == null ? '' : inputsDireccion.additional_data} onChange={handleChange} />
                    </Form.Group>
                    <Button style={{marginLeft:10,float:"right",backgroundColor:"#E94E1B",borderColor:"#E94E1B"}} onClick={handleSubmitDireccion}>
                        Actualizar
                    </Button>
                    </Form>

                    </div><br></br><br></br>
                    

                </div>
            </div> 

        </div>
        <Footer></Footer>

        <Modal  show={show} size="md" onHide={handleClose} >
            <Modal.Body style={{margin:20}}>
            <div>
                <h4>Cambiar foto de perfil</h4>
                <form onSubmit={handleSubmitImage}>
                <input type="file" onChange={handleFileSelect}/><br></br><br></br>
                <input type="submit" value="Upload File" style={{backgroundColor:"#E94E1B",borderRadius:5,borderWidth:0,color:"white"}}/>
                </form>
            </div>
            </Modal.Body>
        </Modal>

        </>
    )

}
export default UserPerfil;