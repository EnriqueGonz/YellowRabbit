import React from 'react';
import imgblog from '../images/Blog.png';

import { Carousel } from 'react-bootstrap';
//import axios from 'axios';
import Appbar from './appbar';

const Blog = () =>{

    return(    
        <>
        <Appbar></Appbar>
        <div className='container'>
            <div style={{widows:"75%"}}>
            <div className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"#FFF",justifyContent: "space-around"}}>
              <a className='aNoSelected' href='/inicio'>INICIO</a>
              <a className='aNoSelected' href='/datos'>DATOS</a>
              <a className='aNoSelected' href='/productos'>PRODUCTOS</a>
              <a className='aSelected' href='/blog'>BLOG</a>
              <a className='aNoSelected' href='/contacto'>CONTACTO</a>
            </div>

            </div>

        </div>
        <Carousel>
            <Carousel.Item className='contenedor'>
                <img alt='' src={imgblog} style={{width:"100%"}}/>
                <div className="possText2Img1">
                    <p style={{fontFamily:"'Quicksand', sans-serif",fontWeight:"bold",color:"white",fontSize:65}}>Contactanos</p>
                </div>
            </Carousel.Item>
        </Carousel>



        <footer style={{backgroundColor:"#EB5929"}}>
            <div className="navbar navbar-expand-lg navbar-light" style={{justifyContent: "space-around"}}>
                <div style={{textAlign:"center"}}>
                    <p style={{color:"white",margin:5}}>@2021 Yellow Rabbit - Todos los derechos reservados</p>
                </div>
            </div>
        </footer>
        </>
    )

}
export default Blog;