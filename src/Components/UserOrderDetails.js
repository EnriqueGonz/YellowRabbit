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
            console.log(response);
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




let precioTotal = 0;

ListOrderPago.map((item) =>(
    precioTotal += parseInt(item.total_price)

))


    return(    
        <>
        <Appbar></Appbar>
        <div style={{backgroundImage:"url('"+imgindex1+"')"}}>

            <div className='col-12 col-md-10 container' style={{backgroundColor:"white"}}>

                <div className='col-12 col-md-11 container'>
                    <br/><br/>
                    <h3>Detalles del pedido</h3>
                    <div className='container'>
                        <div className='card' style={{marginBottom:15}}>
                            <table className="">
                                <thead style={{borderBottom:"solid",borderBottomWidth:1,borderBottomColor:"#DFDFDF"}}>
                                    <tr>
                                        <th className="col" style={{width:"25%"}}></th>
                                        <th className="col" style={{width:"25%"}}><b>Producto:</b></th>
                                        <th className="col" style={{width:"25%"}}><b>Cantidad</b></th>
                                        <th className="col" style={{width:"25%"}}><b>Precio</b></th>
                                        <th className="col" style={{width:"25%"}}><b>Subtotal</b></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {ListOrderProductos.map((item,index) => (
                                    <tr key={index}>
                                        <td colSpan="1">
                                            <img src={'https://yellowrabbitbucket.s3.amazonaws.com/'+item[0].image_one} alt="" style={{width:72,height:72,border:"solid",margin:5,borderWidth:1,borderColor:"#E7E7E7",borderRadius:5}}></img>
                                        </td>
                                        <td colSpan="1" style={{textAlign:"start"}}>
                                            <a className='nodecorationa' href={'/article/details/'+item[0].id}><span>{item[0].product_name}</span><br></br></a>
                                        </td>
                                        <td colSpan="1">
                                            <span>{ListOrderPago[index].amount}</span>
                                        </td>
                                        <td colSpan="1">
                                            <span>{ListOrderPago[index].unit_price}</span>
                                        </td>
                                        <td colSpan="1">
                                            <span>{ListOrderPago[index].total_price}</span>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="3">
                                    </td>
                                    <td colSpan="1">
                                        <b>Total</b>
                                    </td>
                                    <td colSpan="1">
                                        {precioTotal}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        

                        </div>
                        
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 col-md-6'>
                            </div>
                            <div className='col-12 col-md-6'>
                                <div className='card' style={{marginBottom:15}}>
                                    <table className="">
                                        <thead style={{borderBottom:"solid",borderBottomWidth:1,borderBottomColor:"#DFDFDF"}}>
                                            <tr>
                                                <th className="col" style={{fontWeight:300}}>Num de referencia:</th>
                                                <th className="col" style={{fontWeight:300}}>{ListOrderDetalles.delivery_number}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td colSpan="2" className='paddinth' style={{textAlign:"start"}}>
                                                    <span>Status:</span>
                                                </td>
                                                <td colSpan="2" className='paddinth' style={{textAlign:"end"}}>
                                                    <span>{ListOrderDetalles.status}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" className='paddinth' style={{textAlign:"start"}}>
                                                    <span>Pedio realizado:</span>
                                                </td>
                                                <td colSpan="2" className='paddinth' style={{textAlign:"end"}}>
                                                    <span>{ListOrderDetalles.order_date}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" className='paddinth' style={{textAlign:"start"}}>
                                                    <span>Fecha de entrega::</span>
                                                </td>
                                                <td colSpan="2" className='paddinth' style={{textAlign:"end"}}>
                                                    <span>{ListOrderDetalles.date_delivery}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" className='paddinth' style={{textAlign:"start"}}>
                                                    <span>Total en productos:</span>
                                                </td>
                                                <td colSpan="2" className='paddinth' style={{textAlign:"end"}}>
                                                    <span>{precioTotal}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" className='paddinth' style={{textAlign:"start"}}>
                                                    <span>Envio:</span>
                                                </td>
                                                <td colSpan="2" className='paddinth' style={{textAlign:"end"}}>
                                                    <span>{(ListOrderDetalles.full_payment - precioTotal)}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" className='paddinth' style={{textAlign:"start"}}>
                                                    <span>Total</span>
                                                </td>
                                                <td colSpan="2" className='paddinth' style={{textAlign:"end"}}>
                                                    <span>{ListOrderDetalles.full_payment}</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                

                                </div>

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