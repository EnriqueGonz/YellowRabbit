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
                        <div className='row'>
                            <div className='col'>1</div> 
                            <div className='col'>2</div> 
                            <div className='col'>3</div> 

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