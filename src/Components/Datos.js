import React from 'react';

import imgdatos from '../images/datos.png';
import imgmetodospago from '../images/metodosPago.png';
import { ReactComponent as IconCarShop} from '../images/icons/BtnWhatsapp.svg';

import { Carousel} from 'react-bootstrap';

import Appbar from './appbar';
import Footer from './footer';

const Datos = () =>{
    function methodShowWhatsapp(){
        window.location.href ='https://api.whatsapp.com/send/?phone=529671551588&text=¡Hola!%20Necesito%20ayuda'
    }


    return(    
        <div id='wrapper'>
            <div id="sticky">
                <button className='btn-flotante' onClick = {() => { methodShowWhatsapp()} }><IconCarShop style={{width:35,height:50}}/></button>
            </div>
        <Appbar></Appbar>
        <div className='container'>
            <div style={{widows:"75%"}}>
            <div className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"#FFF",justifyContent: "space-around"}}>
              <a className='aNoSelected' href='/inicio'>INICIO</a>
              <a className='aSelected' href='/datos'>DATOS</a>
              <a className='aNoSelected' href='/productos'>PRODUCTOS</a>
              <a className='aNoSelected' href='/blog'>BLOG</a>
              <a className='aNoSelected' href='/contacto'>CONTACTO</a>
            </div>

            </div>

        </div>
        <Carousel>
            <Carousel.Item className='contenedor'>
                <img alt='' src={imgdatos} style={{width:"100%"}}/>
                <div className="possText1Img1">
                    <p style={{fontFamily:"'Quicksand', sans-serif",fontWeight:"bold",fontSize:65}}>Disfruta tu</p>
                    <p style={{fontFamily:"'Quicksand', sans-serif",fontWeight:"bold",fontSize:85}}>intimidad</p>
                </div>
            </Carousel.Item>
        </Carousel>

        <div className="container" style={{paddingTop:50, paddingBottom:50}}>
            <div className="row">
                <div className="col">
                    <div className="row">
                        <p style={{fontFamily:"'Quicksand', sans-serif",fontSize:40,fontWeight:"bold",color:"#E94E1B"}}>VENTA Y ENVÍO</p>
                    </div>
                    <div className="row">
                        <div style={{backgroundColor:"#EB5929",color:"white",fontWeight:500,padding:40,borderRadius:20}}>
                            <p style={{fontFamily:"'Quicksand', sans-serif",fontWeight:500}}>En nuestro sitio puedes elejir de nuestro catalogo de productos.</p>
                            <p style={{fontFamily:"'Quicksand', sans-serif",fontWeight:500}}>Puedes pagar tu pedido con diversas opcones de pago:</p>
                            <li>Tarjeta de credito, debíto VISA, Master Card</li>
                            <li>PayPal</li>
                            <li>Pago en OXXO</li>
                            <p style={{fontFamily:"'Quicksand', sans-serif",fontWeight:500}}>Tenemos varias opciones de entrega:</p>
                            <li>Mismo dia en Ciudad de méxico</li>
                            <li>Siguiente dia en Ciudad de mexico y Area Metropolitana</li>
                            <li>1 - 5 dias al interior de la republica mexicana</li>
                        </div>
                    </div>
                </div>
                <div className="col" style={{alignSelf:"center"}}>
                    <img style={{width:"-webkit-fill-available"}} alt='' src={imgmetodospago}></img>
                </div>
            </div>
        </div>
        <div className='container' style={{textAlign:"justify"}}>
            <p style={{fontFamily:"'Cairo', sans-serif",fontSize:16}}>Una vez que se confirme tu pedido y embarquemos tu compra, nosotros te proporcionamos un número de rastreo del envío, para que puedas darle seguimiento a tu pedido.Si tienes problemas con la entrega de tu compra, puedes ponerte en contacto con nosotros para darle seguimiento oportuno a <span style={{color:"#EB5929",fontWeight:"bold"}}>contacto@yellowrabbit.com.mx</span></p>
            <br/>
        </div>
        <div className='container'>
            <center>
            <div style={{width:"90%",textAlign:"justify"}}>
                <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:"bold",color:"#EB5929"}}>¡De la discreción no te preocupes!</p>
                <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:500}}>Todos nuestros pedidos van en cajas sin ningún tipo de publicidad, para que sólo tú sepas cual es el contenido del paquete.<br/>Si aún tienes dudas, ponte en contacto con nosotros. Con gusto te atenderemos.</p>

                <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:"bold",color:"#EB5929"}}>Política de devoluciones:</p>
                <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:500}}>Si detectas que tu producto tiene algun defecto de fabricación, puedes aplicar tu garantía, deberas conserva las etiquetas, facturas, el empaque original y devuelve el producto en perfecto estado. No maltrates el producto, pruébalo en superficies limpias y asegúrate de no causarle daños. Es muy importante que tomes en cuenta estas recomendaciones, ya que si el producto presenta señales de uso o maltrato la devolución no procederá y el producto te será re-enviado.</p>

                <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:"bold",color:"#EB5929"}}>Terminos y condiciones:</p>
                <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:"bold",color:"#000"}}>Aviso de privacidad</p>
                <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:500}}>De acuerdo a lo previsto en la “LEY FEDERAL de Protección de Datos Personales” Yellow Rabbit declara ser una empresa legalmente constituida de conformidad con las leyes mexicanas, así como manifestar ser la responsable del tratamiento de sus datos personales.</p>
            </div>
            </center>
        </div>
        <br></br>


        <Footer></Footer>

        </div>
    )

}
export default Datos;