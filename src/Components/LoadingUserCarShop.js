import React from 'react';

import imgindex1 from '../images/fondouser.png';

import Appbar from './appbarClient';
import Footer from './footer';


const LoadingUserCarShop = () =>{

    return(    
        <>
        <Appbar></Appbar>
        <div style={{backgroundImage:"url('"+imgindex1+"')"}}>
            <div className='container' style={{backgroundColor:"white",width:"60%"}}>

                <div className='container' style={{width:"90%"}}>
                    <br/><br/>
                    <h3>Carrito de compras</h3>
                    <div className='container' style={{width:"90%"}}>
                        <br></br>
                        <h6>Tu carrito esta vacio, No has agregado productos a tu carrito de compras</h6>
                        <br></br>
                    </div>
                    <hr style={{height:"5px",backgroundColor:"#EB5929",opacity:1}}></hr>
                    <br></br>

                </div>
            </div> 

        </div>
        <Footer></Footer>

        </>
    )

}
export default LoadingUserCarShop;