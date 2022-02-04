import React from 'react';

import Appbar from './appbar';
import Footer from './footer';

const LoadingProductos = () =>{

    


    return(    
        <>
        <Appbar></Appbar>
        <div className='container'>
            <div style={{widows:"75%"}}>
            <div className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"#FFF",justifyContent: "space-around"}}>
              <a className='aNoSelected' href='/inicio'>INICIO</a>
              <a className='aNoSelected' href='/datos'>DATOS</a>
              <a className='aSelected' href='/productos'>PRODUCTOS</a>
              <a className='aNoSelected' href='/blog'>BLOG</a>
              <a className='aNoSelected' href='/contacto'>CONTACTO</a>
            </div>
            </div>
        </div>


        <div className='container'>
            <center>
            <div style={{width:"90%",textAlign:"justify"}}>
                <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:"bold",color:"#EB5929"}}>No hay nada por aqui</p>
                <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:500}}>Vuelve a intentarlo mas tarde</p>

                <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:"bold",color:"#EB5929"}}>Si persiste el error</p>
                <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:500}}>Contacta con <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:"bold",color:"#000"}}>Correo@yellowrabbit.com.mx</p></p>

            </div>
            </center>
        </div>

        <Footer></Footer>

        </>
    )

}
export default LoadingProductos;