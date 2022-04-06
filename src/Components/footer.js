import React from 'react';
import { ReactComponent as IconTelefono } from '../images/icons/IconTelefono.svg';
import { ReactComponent as IconCorreo } from '../images/icons/IconCorreo.svg';
import { ReactComponent as IconFacebook } from '../images/icons/iconFacebook.svg';
import { ReactComponent as IconTwitter } from '../images/icons/iconTwitter.svg';
import { ReactComponent as IconInstagram } from '../images/icons/iconInstagram.svg';
import { ReactComponent as IconTikTok } from '../images/icons/iconTikTok.svg';

const Footer = () =>{

    return(    
        <>
        <footer style={{backgroundColor:"#404345"}}>
        <div className="navbar navbar-expand-lg navbar-light" style={{justifyContent: "space-around"}}>
                  <div>
                      <div className="col">
                          <div className='row' style={{alignItems:"center"}}>
                          <IconTelefono style={{width:50,height:"100%",filter:"brightness(0) invert(1)"}}/>
                              <div className='col'> 
                                <div className='row'>
                                    <p style={{marginBottom:0,paddingTop:15,color:"white"}}>Llama al</p>
                                </div>
                                <div className='row'>
                                    <p style={{fontWeight:"bold",color:"white"}}>55 1234 5678</p>
                                </div>
                              </div>
                          </div>
                          <div className='row' style={{alignItems:"center"}}>
                          <IconCorreo style={{width:50,height:"100%",filter:"brightness(0) invert(1)"}}/>
                              <div className='col'> 
                                <div className='row'>
                                    <p style={{marginBottom:0,color:"white"}}>Contactanos</p>
                                </div>
                                <div className='row'>
                                    <p style={{fontWeight:"bold",color:"white"}}>Correo@yellowrabbit.com.mx</p>
                                </div>
                              </div>
                          </div>

                      </div>
                  </div>
                  <div style={{textAlign:"center"}}>
                    <p style={{color:"white"}}>@2021 Yellow Rabbit - Todos los derechos reservados</p>
                  </div>
                  <div>
                      <div className='col'>
                          <div className='row'>
                              <div className='col'><a href='https://www.facebook.com/'><IconFacebook style={{width:30,height:"100%"}}/></a></div>
                              <div className='col'><a href='https://www.facebook.com/'><IconTwitter style={{width:30,height:"100%"}}/></a></div>
                              <div className='col'><a href='https://www.facebook.com/'><IconInstagram style={{width:30,height:"100%"}}/></a></div>
                              <div className='col'><a href='https://www.facebook.com/'><IconTikTok style={{width:30,height:"100%"}}/></a></div>
                          </div>
                          <div className='row' style={{textAlign:"center"}}>
                              <p style={{color:"white"}}>@YellowRabbitSToys</p>
                          </div>
                           
                      </div>
                      
                  </div>
                </div>
                
                

        </footer>

        </>
    )

}
export default Footer;