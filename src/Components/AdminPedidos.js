import React,{ useState,useEffect } from 'react';
import bgPedidos from '../images/bgPedidos.png';
import { Carousel } from 'react-bootstrap';
//import axios from 'axios';
import Appbar from './AdminAppbar';
import axios from 'axios';
import '../config';

var baseUrl = global.config.yellow.rabbit.url;
var token = localStorage.getItem('tokenAdmin');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const AdminPedidos = () =>{
    const [listPedidos,setlistPedidos] = useState([]);

    useEffect(() =>{  
        try {
          axios.post(baseUrl+'/orders/api/all-orders/',{
            first_name:"",
            delivery_number:""
          },{headers})
          .then((response) => {
            console.log(response);
            setlistPedidos(response.data)
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setlistPedidos])
    
    return(    
        <>
        <Appbar></Appbar>
        
        <Carousel>
            <Carousel.Item className='contenedor' >
                <img alt='' src={bgPedidos} style={{width:"100%"}}/>
            </Carousel.Item>
        </Carousel>


        <div className='container' style={{paddingTop:30}}>
            <div>
                {listPedidos.map((item,index)=> (
                    <div key={index}>
                        <div className='row' style={{border:"solid",borderWidth:2,borderColor:"#C1BCBC",padding:10,marginBottom:15}}>
                            <div className='col-12 col-md-3'>
                                <div className='col'>
                                    <span>No. de pedido: {item[2][0].delivery_number}</span><br/>
                                    {
                                        (item[2][0].status === "Pendiente")
                                        ? <span>Status: <b style={{color:"#F9B233"}}>Pendiente</b></span>
                                        : (item[2][0].status === "ENTREGADO")
                                        ? <span>Status: <b style={{color:"#2CC132"}}>Entregado</b></span>
                                        : (item[2][0].status === "CANCELADO")
                                        ? <span>Status: <b style={{color:"#C12C30"}}>Cancelado</b></span>
                                        : <></>
                                    }
                                </div>
                                <div className='col'>
                                    <div className='row'>
                                        <div className='col-3'>
                                            <img alt="" style={{width:"100%",borderRadius:20}} src={'https://yellowrabbitbucket.s3.amazonaws.com/'+item[0][0].profile_picture}></img>
                                        </div>
                                        <div className='col-9'>
                                            <h6>{item[0][0].first_name}</h6>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div> 
                            <div className='col-12 col-md-7'>
                                <div className='col' style={{backgroundColor:"#DFDFDF",marginBottom:10}}>
                                    {listPedidos[index][4].map((item2,index2)=> (
                                        <span className='module line-clamp' key={index2}>° {item2[0].product_name}</span>
                                    ))}

                                </div>
                                <div className='col' style={{backgroundColor:"#DFDFDF"}}>
                                    <div className='row'>
                                        <div className='col' style={{margin:5}}>
                                            <span>Fecha de compra</span><br/>
                                            <span>{item[2][0].order_date}</span>
                                        </div>
                                        <div className='col' style={{margin:5}}>
                                            <span>Paqueteria</span><br/>
                                            {
                                                (item[5].length === 0)
                                                ? <span>Sin asignar</span>
                                                : <span>{item[5][0].carrier}</span>
                                            }
                                            
                                        </div>
                                        <div className='col' style={{margin:5}}>
                                            <span>No. de rastreo:</span><br/>
                                            {
                                                (item[5].length === 0)
                                                ? <span>Sin asignar</span>
                                                : <span>{item[5][0].tracking_number}</span>
                                            }
                                            
                                        </div>

                                    </div>

                                </div>
                            </div> 
                            <div className='col-12 col-md-2'>
                                <button className='btn' style={{width:"100%",backgroundColor:"#E94E1B",color:"white"}}>Ver detalles</button>
                            
                            </div> 

                        </div>

                    </div>
                ))}

            </div>
        

        </div>



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
export default AdminPedidos;