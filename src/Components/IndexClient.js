import React from 'react';
import imgindex1 from '../images/index1.png';
import imgindex2 from '../images/index2.png';
import imgindex3 from '../images/index3.png';
import imgindex4 from '../images/index4.png';
import imgQuien from '../images/imgQuien.jpg';

import { ReactComponent as IconMision } from '../images/icons/IconMision.svg';
import { ReactComponent as IconVision } from '../images/icons/IconVision.svg';
import { Carousel } from 'react-bootstrap';


import Appbar from './appbar';
import Footer from './footer';

const IndexClient = () =>{

    


    return(    
        <>
        <Appbar></Appbar>
        <div className='container'>
            <div style={{widows:"75%"}}>
            <div className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"#FFF",justifyContent: "space-around"}}>
              <a className='aSelected' href='/inicio'>INICIO</a>
              <a className='aNoSelected' href='/datos'>DATOS</a>
              <a className='aNoSelected' href='/productos'>PRODUCTOS</a>
              <a className='aNoSelected' href='/blog'>BLOG</a>
              <a className='aNoSelected' href='/contacto'>CONTACTO</a>
            </div>

            </div>

        </div>
        <Carousel>
            <Carousel.Item className='contenedor'>
                <img alt='' src={imgindex1} style={{width:"100%"}}/>
                <div className="possText1Img1">
                    <p style={{fontFamily:"'Quicksand', sans-serif",fontWeight:"bold",fontSize:65}}>Deja volar tu</p>
                    <p style={{fontFamily:"'Quicksand', sans-serif",fontWeight:"bold",fontSize:85}}>imaginación</p>
                </div>
                <div className="possText2Img1">
                    <p style={{fontFamily:"'Quicksand', sans-serif",fontWeight:"bold",fontSize:25}}>Vive las experiencias</p>
                    <p style={{fontFamily:"'Quicksand', sans-serif",fontWeight:"bold",fontSize:25}}>sexuales mas placenteras</p>
                    <button className='btn btn-outline-dark' style={{borderRadius:25,borderColor:"#232323",fontSize:27,borderWidth:4}}>VISITA LA TIENDA</button>
                </div>
            </Carousel.Item>
            <Carousel.Item className='contenedor'>
                <img alt='' src={imgindex2} style={{width:"100%"}}/>
            </Carousel.Item>
            <Carousel.Item className='contenedor'>
                <img alt='' src={imgindex3} style={{width:"100%"}}/>
            </Carousel.Item>
            <Carousel.Item className='contenedor'>
                <img alt='' src={imgindex4} style={{width:"100%"}}/>
            </Carousel.Item>
            
        </Carousel>

        <div className="container" style={{paddingTop:50, paddingBottom:50}}>
            <div className="row">
                <div className="col">
                    <img alt='' src={imgQuien}></img>
                </div>
                <div className="col">
                    <div className="row">
                        <p style={{fontFamily:"'Quicksand', sans-serif",fontSize:40,fontWeight:"bold",color:"#E94E1B"}}>Nosotros</p>
                    </div>
                    <div className="row">
                        <p style={{fontFamily:"'Quicksand', sans-serif",fontSize:30,fontWeight:500}}>¿Quienes somos?</p>
                    </div>
                    <div className="row">
                        <p style={{textAlign:"justify"}}>En Yellow Rabbit, somos un grupo de expertos, comprometidos con la innovación en tu vida sexual de manera inteligente, saludable y divertida.</p>
                    </div>
                    <div className="row">
                        <p style={{textAlign:"justify"}}>Queremos que juegues en la intimidad y te diviertas con nuestros productos, conociendo,experimentando redescubriendo y disfrutando.</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="container" style={{paddingTop:50, paddingBottom:50}}>
            <div className="row">
                <div className="col" style={{paddingBottom:10}}>
                    <div style={{backgroundColor:"#EB5929",padding:70,borderRadius:25}}>
                        <div style={{textAlign:"center"}}>
                            <IconMision style={{width:50,height:"100%"}}/>
                        </div>
                        <div>
                            <br/>
                            <p style={{color:"white"}}>Nuestro objetivo es que vivas experiencias donde la diversidad es el centro de la diversión, que explores tu lado erótico y vivas las experiencias sexuales más intensas y seguras, sin importar tus preferencias al momento de sentir y hacer sentir. </p>
                        </div>

                    </div> 
                </div>
                <div className="col">
                    <div style={{backgroundColor:"#F3BE3A",padding:70,height:"100%",borderRadius:25}}>
                        <div style={{textAlign:"center"}}>
                            <IconVision style={{width:50,height:"100%"}}/>
                        </div>
                        <div>
                            <br/>
                            <p>Crear una cultura positiva alrededor del sexo, poniendo especial énfasis en la educación, en el placer, celebrando la sexualidad en sus distintas formas de expresión.</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div className='container' style={{textAlign:"center"}}>
            <p style={{fontFamily:"'Quicksand', sans-serif",fontSize:30,fontWeight:500}}>Queremos que disfrutes tu sexualidad de forma intensa, divertida y segura</p>
            <br/><br/>
            
        </div>
        <Footer></Footer>

        </>
    )

}
export default IndexClient;