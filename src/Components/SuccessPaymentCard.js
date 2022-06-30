import React from 'react';
import Appbar from './appbarClient';
import Footer from './footer';
import logo from '../images/logo.png';

const SuccessPaymentCard = () => {


    function redireccionar(){
        window.location.href = '/inicio'
    }
    return (
        <>
            <Appbar></Appbar>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <img src={logo} alt='' style={{width:"100%",padding:50}}></img>
                    </div>
                    <div className='col'>
                        <div style={{padding:50}}>
                            <h3>¡Tu compra ha sido un exito!</h3><br/><br/>
                            <h4>¡Gracias por comprar con nosotros!</h4>
                            <h5>Puedes ver tus pedidos en <a href='/user/mis-pedidos' style={{textDecoration:"none"}}>"Mis pedidos"</a></h5><br/><br/>

                            <button className='btn' style={{backgroundColor:"#EA5523",color:"white"}} onClick={ () => (redireccionar())}><b>Ir al inicio</b></button>
                        </div>
                    </div>

                </div>
                
            </div>
            <Footer></Footer>
        </>
    )
}

export default SuccessPaymentCard