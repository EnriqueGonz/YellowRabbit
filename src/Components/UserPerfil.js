import React, { useEffect,useState } from 'react';

import imgindex1 from '../images/fondouser.png';
import { ReactComponent as IconPerfil } from '../images/icons/IconPerfil.svg';
import { Form,Button,Row,Col,Modal } from 'react-bootstrap';

import axios from 'axios';

import Appbar from './appbarClient';
import Footer from './footer';

var token = localStorage.getItem('tokenClient');
var username = localStorage.getItem('usernameClient');




const headers = {
    "Content-Type": "multipart/form-data",
    'Authorization': `Token ${token}`
};


const UserPerfil = () =>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selectedFile, setSelectedFile] = React.useState(null);

    const [inputs, setInputs] = useState({
        email: "",
        first_name: "",
        age: "",
        phone: "",
        identity: "",
    })

    

    useEffect(() =>{ 
        try {
          axios.get('https://yellowrabbit.herokuapp.com/users/api/my-account/'+username+'/',{ headers })
          .then((response) => {
            //setInputs(response.data[0]);
            console.log(response.data);
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
    const formData = new FormData();
    formData.append("image", selectedFile);
    console.log(selectedFile);
    try {
        axios.post('https://yellowrabbit.herokuapp.com/users/api/update/profile-picture/'+username+'/', {
            data: formData,
        },{headers})
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
        console.log(name + value)
        setInputs(values => ({ ...values, [name]: value }))
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
                                    <IconPerfil style={{width:"100%",height:"100%"}}></IconPerfil>
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
                                <Form.Control style={{backgroundColor:"#DFDFDF"}} placeholder='Edad' required type="number" name="age" value={inputs.age} onChange={handleChange}  />
                                </Form.Group>

                                <Form.Group as={Col} controlId="">
                                <Form.Label>Identidad:</Form.Label>
                                <Form.Control style={{backgroundColor:"#DFDFDF"}} placeholder='Identidad' required type="text" name="identity" value={inputs.identity} onChange={handleChange}  />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="">
                                <Form.Label>Telefono:</Form.Label>
                                <Form.Control style={{backgroundColor:"#DFDFDF"}} placeholder='Telefono' required type="number" name="phone" value={inputs.phone} onChange={handleChange}  />
                                </Form.Group>
                            </Row>

                            <Button style={{marginLeft:10,float:"right",backgroundColor:"#E94E1B",borderColor:"#E94E1B"}} onClick={handleSubmitPerson}>
                                Actualizar
                            </Button>
                        </Form>  

                    </div><br></br><br></br>
                    <hr style={{height:"5px",backgroundColor:"#EB5929",opacity:1}}></hr>
                    <br></br>
                    

                </div>
            </div> 

        </div>
        <Footer></Footer>

        <Modal  show={show} size="md" onHide={handleClose} >
            <Modal.Body style={{margin:20}}>
            <div>
                <h4>Cambiar foto de perfil</h4>
                <form onSubmit={handleSubmitImage}>
                <input type="file" onChange={handleFileSelect}/>
                <input type="submit" value="Upload File" />
                </form>
            </div>
            </Modal.Body>
        </Modal>

        </>
    )

}
export default UserPerfil;