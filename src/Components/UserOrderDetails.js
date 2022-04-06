import React,{ useEffect, useState } from 'react';

import imgindex1 from '../images/fondouser.png';

import Appbar from './appbarClient';
import Footer from './footer';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../config';


var baseUrl = global.config.yellow.rabbit.url;

var token = localStorage.getItem('tokenClient');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};

const UserOrderDetails = () =>{
    var { idorder } = useParams(); // params
    const [ListOrderDetalles, setListOrderDetalles] = useState([]);
    const [ListOrderPago, setListOrderPago] = useState([]);
    const [ListOrderProductos, setListOrderProductos] = useState([]);

    useEffect(() =>{  
        try {
          axios.get(baseUrl+'/orders/api/specific-order/'+idorder+'/',{ headers })
          .then((response) => {
            console.log(response.data);
            setListOrderDetalles(response.data[0][0])
            setListOrderPago(response.data[1])
            setListOrderProductos(response.data[2])
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setListOrderDetalles],[setListOrderProductos],[setListOrderPago])


let i = 0;


ListOrderPago.map((item) =>(
    i += parseInt(item.total_price)

))


    return(    
        <>
        <Appbar></Appbar>
        <div style={{backgroundImage:"url('"+imgindex1+"')"}}>

            <div className='container' style={{backgroundColor:"white",width:"60%"}}>

                <div className='container' style={{width:"90%"}}>
                    <br/><br/>
                    <h3>Detalles del pedido</h3>
                    <div className='container' style={{width:"90%"}}>
                        <h6>Productos:</h6>
                        {ListOrderProductos.map((item,index) => (
                            <div key={index} className='row'>
                                <div className='col-sm-2'>
                                    <img alt="" style={{width:"100%"}} src={ 'https://yellowrabbitbucket.s3.amazonaws.com/' + item[0].image_one}></img>
                                </div>
                                <div className='col-sm-10'>
                                    <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:"bold",color:"#EB5929"}}>{ListOrderPago[index].amount +' * '+  item[0].product_name}</p>
                                    <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:500}}>Precio: ({ListOrderPago[index].amount +' * ' +item[0].price} c/u) = {new Intl.NumberFormat().format(ListOrderPago[index].total_price)}</p>

                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='container' style={{width:"90%"}}>
                        <h6>Detalles generales:</h6>
                        <div className='row'>
                            <div className='col-sm-2'>
                                
                            </div>
                            <div className='col-sm-10'>
                                <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:"bold",color:"#EB5929"}}>Numero de entrega: {ListOrderDetalles.delivery_number}</p>
                                <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:500}}>Pedido realizado: {ListOrderDetalles.order_date}</p>
                                <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:500}}>Status del pedido: {ListOrderDetalles.status}</p>
                                <br></br>
                                <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:500}}>Costo total: {new Intl.NumberFormat().format(i)}</p>
                                

                            </div>
                        </div>
                    </div>

                    <hr style={{height:"5px",backgroundColor:"#EB5929",opacity:1}}></hr>

                </div>
            </div> 
        </div>

        <Footer></Footer>
    


        </>
    )

}
export default UserOrderDetails;