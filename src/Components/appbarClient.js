import React,{useState} from 'react';
import imgLogo from '../images/logoB-N.png';
import fondo from '../images/fondoAppbarClient.png';
import { Modal,Button } from 'react-bootstrap';



const Appbar = () =>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  

    function methodName() {
    
        localStorage.clear();
        window.location.href = "/inicio";

        
    }
    

    return(    
        <>
        <div>
            <div>
                <div className="navbar navbar-expand-lg navbar-light" style={{backgroundImage: `url(${fondo})`,justifyContent: "space-around"}}>
                  <div>
                      <img alt='' style={{width:"35%"}} src={imgLogo}></img>
                  </div>
                  <div>
                      <span></span>
                  </div>
                  <div>
                    <div>
                        <div className="dropdown">
                            <a className="nav-link active dropdown-toggle" aria-current="page" href="http://localhost:3000/#" data-bs-toggle="dropdown" aria-expanded="false">{localStorage.getItem('username')} </a>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <li><a  className="dropdown-item"  type="button" href="http://localhost:3000/inicio">Volver al inicio</a></li>
                                <hr style={{height:"2px",backgroundColor:"#EB5929",opacity:1}}></hr>
                                <li><a  className="dropdown-item"  type="button" href="http://localhost:3000/user/mi-perfil">Mi Perfil</a></li>
                                <li><a  className="dropdown-item"  type="button" href="http://localhost:3000/user/mis-pedidos">Mis pedidos</a></li>
                                <li><a  className="dropdown-item"  type="button" href="http://localhost:3000/user/mi-whitelist">WhiteList</a></li>
                                <li><a  className="dropdown-item"  type="button" href="http://localhost:3000/user/mi-carrito">Carrito de compras</a></li>
                                <hr style={{height:"2px",backgroundColor:"#EB5929",opacity:1}}></hr>
                                <li><button  className="dropdown-item"  type="button" onClick = {handleShow}>Cerrar sesion</button></li>
                            </ul>
                        </div>
                    </div>
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

        

        </>
    )

}
export default Appbar;