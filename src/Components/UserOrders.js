import React,{ useEffect, useState } from 'react';

import imgindex1 from '../images/fondouser.png';
import { Tab,Tabs } from 'react-bootstrap';

import Appbar from './appbarClient';
import Footer from './footer';
import axios from 'axios';
import '../config';


var baseUrl = global.config.yellow.rabbit.url;

var token = localStorage.getItem('tokenClient');
var username = localStorage.getItem('usernameClient');


const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const UserOrders = () =>{
    const [listOrders, setListOrders] = useState([]);

    useEffect(() =>{  
        try {
          axios.get(baseUrl+'/orders/api/my-orders/'+username+'/',{headers})
          .then((response) => {
            console.log(response);
            setListOrders(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setListOrders])

      function methodName(id) {
        console.log(id);
        window.location.href = "/detallesPedido/"+id;
    }   
    

    return(    
        <>
        <Appbar></Appbar>
        <div style={{backgroundImage:"url('"+imgindex1+"')"}}>
            <div className='col-12 col-md-10 container' style={{backgroundColor:"white"}}>

                <div className='col-12 col-md-11 container'>
                    <br/><br/>
                    <h3>Mis pedidos</h3>
                    <br></br>
                    <Tabs defaultActiveKey="entregados" id="uncontrolled-tab-example">
                        <Tab eventKey="entregados" title="Pedidos entregados">
                        {listOrders.map((item,index) => (
                            (item[0][0].status === "ENTREGADO")
                            ?<div key={index} className='card' style={{marginBottom:15}}>
                                <table className="">
                                    <thead style={{borderBottom:"solid",borderBottomWidth:1,borderBottomColor:"#DFDFDF",textAlign:"start"}}>
                                        <tr>
                                            <th className="col" style={{width:"25%"}}><b>Fecha de pedido: </b><br></br><span style={{fontWeight:300}}>{item[0][0].order_date}</span></th>
                                            <th className="col" style={{width:"25%"}}><b>Fecha de entrega: </b><br></br><span style={{fontWeight:300}}>{item[0][0].date_delivery}</span></th>
                                            <th className="col" style={{width:"25%"}}><b>Referencia de pedido: </b><br></br><span style={{fontWeight:300}}>{item[0][0].delivery_number}</span></th>
                                            <th className="col" style={{width:"25%"}}><b>Status: </b><br></br><span style={{color:"green",fontWeight:700}}>Entregado</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listOrders[index][2].map((item,index2) =>(
                                            <tr key={index2}>
                                                <td colSpan="1">
                                                    <img src={'https://yellowrabbitbucket.s3.amazonaws.com/'+item[0].image_one} alt="" style={{width:72,height:72,border:"solid",margin:5,borderWidth:1,borderColor:"#E7E7E7",borderRadius:5}}></img>
                                                </td>
                                                <td colSpan="2" style={{textAlign:"start"}}>
                                                <a className='nodecorationa' href={'/article/details/'+item[0].id}><span>{item[0].product_name}</span><br></br></a>
                                                    <span><span style={{fontWeight:700}}>Cantidad: </span>{listOrders[index][1][index2].amount}</span>
                                                </td>
                                                <td colSpan="1">
                                                    
                                                </td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan="4" style={{textAlign:"end"}}>
                                                <button className='btn' style={{fontWeight:500,backgroundColor:"#E94E1B",color:"white"}} onClick = {() => { methodName(item[0][0].id);} }>Ver detalles</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            :<div key={index}></div>
                        ))}
                            
                        </Tab>
                        <Tab eventKey="pendientes" title="Pedidos pendientes">
                        {listOrders.map((item,index) => (
                            (item[0][0].status === "Pendiente")
                            ?<div key={index} className='card' style={{marginBottom:15}}>
                                <table className="">
                                    <thead style={{borderBottom:"solid",borderBottomWidth:1,borderBottomColor:"#DFDFDF",textAlign:"start"}}>
                                        <tr>
                                            <th className="col" style={{width:"25%"}}><b>Fecha de pedido: </b><br></br><span style={{fontWeight:300}}>{item[0][0].order_date}</span></th>
                                            <th className="col" style={{width:"25%"}}><b>Fecha de entrega: </b><br></br><span style={{fontWeight:300}}>{item[0][0].date_delivery}</span></th>
                                            <th className="col" style={{width:"25%"}}><b>Referencia de pedido: </b><br></br><span style={{fontWeight:300}}>{item[0][0].delivery_number}</span></th>
                                            <th className="col" style={{width:"25%"}}><b>Status: </b><br></br><span style={{color:"#E94E1B",fontWeight:700}}>Pendientes</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listOrders[index][2].map((item,index2) =>(
                                            <tr key={index2}>
                                                <td colSpan="1">
                                                    <img src={'https://yellowrabbitbucket.s3.amazonaws.com/'+item[0].image_one} alt="" style={{width:72,height:72,border:"solid",margin:5,borderWidth:1,borderColor:"#E7E7E7",borderRadius:5}}></img>
                                                </td>
                                                <td colSpan="2" style={{textAlign:"start"}}>
                                                <a className='nodecorationa' href={'/article/details/'+item[0].id}><span>{item[0].product_name}</span><br></br></a>
                                                    <span><span style={{fontWeight:700}}>Cantidad: </span>{listOrders[index][1][index2].amount}</span>
                                                </td>
                                                <td colSpan="1">
                                                    
                                                </td>
                                            </tr>
                                        ))}
                                            <td colSpan="4" style={{textAlign:"end"}}>
                                                <button className='btn' style={{fontWeight:500,backgroundColor:"#E94E1B",color:"white"}} onClick = {() => { methodName(item[0][0].id);} }>Ver detalles</button>
                                            </td>
                                    </tbody>
                                </table>
                            </div>
                            :<div key={index}></div>
                        ))}
                            
                        </Tab>
                        <Tab eventKey="cancelados" title="Pedidos cancelados">
                        {listOrders.map((item,index) => (
                            (item[0][0].status === "CANCELADO")
                            ?<div key={index} className='card' style={{marginBottom:15}}>
                                <table className="">
                                    <thead style={{borderBottom:"solid",borderBottomWidth:1,borderBottomColor:"#DFDFDF",textAlign:"start"}}>
                                        <tr>
                                            <th className="col" style={{width:"25%"}}><b>Fecha de pedido: </b><br></br><span style={{fontWeight:300}}>{item[0][0].order_date}</span></th>
                                            <th className="col" style={{width:"25%"}}><b>Fecha de entrega: </b><br></br><span style={{fontWeight:300}}>{item[0][0].date_delivery}</span></th>
                                            <th className="col" style={{width:"25%"}}><b>Referencia de pedido: </b><br></br><span style={{fontWeight:300}}>{item[0][0].delivery_number}</span></th>
                                            <th className="col" style={{width:"25%"}}><b>Status: </b><br></br><span style={{color:"red",fontWeight:700}}>Cancelados</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listOrders[index][2].map((item,index2) =>(
                                            <tr key={index2}>
                                                <td colSpan="1">
                                                    <img src={'https://yellowrabbitbucket.s3.amazonaws.com/'+item[0].image_one} alt="" style={{width:72,height:72,border:"solid",margin:5,borderWidth:1,borderColor:"#E7E7E7",borderRadius:5}}></img>
                                                </td>
                                                <td colSpan="2" style={{textAlign:"start"}}>
                                                    <a className='nodecorationa' href={'/article/details/'+item[0].id}><span>{item[0].product_name}</span><br></br></a>
                                                    <span><span style={{fontWeight:700}}>Cantidad: </span>{listOrders[index][1][index2].amount}</span>
                                                </td>
                                                <td colSpan="1">
                                                    
                                                </td>
                                            </tr>
                                        ))}
                                            <td colSpan="4" style={{textAlign:"end"}}>
                                                <button className='btn' style={{fontWeight:500,backgroundColor:"#E94E1B",color:"white"}} onClick = {() => { methodName(item[0][0].id);} }>Ver detalles</button>
                                            </td>
                                    </tbody>
                                </table>
                            </div>
                            :<div key={index}></div>
                        ))}
                        
                        </Tab>
                    </Tabs>
                    <hr style={{height:"5px",backgroundColor:"#EB5929",opacity:1}}></hr>
                    <br></br>

                </div>
            </div> 

        </div>
        <Footer></Footer>

        </>
    )

}
export default UserOrders;