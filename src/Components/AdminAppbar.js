import React,{useState} from 'react';
import imgLogo from '../images/logo.png';

import { ReactComponent as IconTelefono } from '../images/icons/IconTelefono.svg';
import { ReactComponent as IconCorreo } from '../images/icons/IconCorreo.svg';
import { ReactComponent as IconPerfil } from '../images/icons/IconPerfil.svg';


import { Button,Modal} from 'react-bootstrap';

import '../config';


//var baseUrl = global.config.yellow.rabbit.url;


const AdminAppBar = () =>{

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);  

    function methodName() {
        localStorage.clear();
        window.location.href = "/inicio";        
    }


    



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
                                    <p style={{color:"#606060", fontWeight:"bold"}}>55 1234 5678</p>
                                </div>
                              </div>
                          </div>

                          <div className='row' style={{alignItems:"center"}}>
                          <IconCorreo style={{width:50,height:"100%"}}/>
                              <div className='col'> 
                                <div className='row'>
                                    <p style={{color:"#606060",fontWeight:"bold"}}>Correo@yellowrabbit.com.mx</p>
                                </div>
                              </div>
                          </div>
                      </div>

                  </div>
                  <div style={{textAlign:"center"}}>
                      <img alt='' style={{width:"30%"}} src={imgLogo}></img>
                  </div>
                  
                  <div style={{ width:"15%", marginTop:"0.5%" }}>
                        <div className="dropdown" id="dropdown">
                            <a className="nav-link active dropdown-toggle" aria-current="page" href="/#" data-bs-toggle="dropdown" aria-expanded="false"><IconPerfil style={{width:30,height:"100%",marginRight:10}}/><span>Administrador</span></a>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <hr style={{height:"2px",backgroundColor:"#EB5929",opacity:1}}></hr>
                                <li><button  className="dropdown-item"  type="button" onClick={handleShow2}>Cerrar sesion</button></li>
                            </ul>
                        </div>
                  </div>
                </div>

                <div style={{ marginTop:"1%" }}>
                    <div className="navbar navbar-expand-lg navbar-light" style={{justifyContent: "space-around", width:"80%", textAlign:"center", margin:"auto"}}>
                        <a className='aNoSelected' href='/admin/inicio' >INICIO</a>
                        <a className='aNoSelected' href='/admin/productos' >PRODUCTOS</a>
                        <a className='aNoSelected' href='/admin/añadir' >AÑADIR</a>
                        <a className='aNoSelected' href='/admin/pedidos' >PEDIDOS</a>
                        <a className='aNoSelected' href='/admin/buzon' >BUZÓN</a>
                    </div>
                </div>

            </div>
        </div>



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
export default AdminAppBar;