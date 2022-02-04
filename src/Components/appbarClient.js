import React from 'react';
import imgLogo from '../images/logoB-N.png';
import fondo from '../images/fondoAppbarClient.png';

const Appbar = () =>{
    

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
                                <li><a  className="dropdown-item"  type="button" href="http://localhost:3000/user/cerrarsesion">Cerrar sesion</a></li>
                            </ul>
                        </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>

        

        </>
    )

}
export default Appbar;