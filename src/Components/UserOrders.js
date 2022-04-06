import React,{ useEffect, useState } from 'react';

import imgindex1 from '../images/fondouser.png';


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
            <div className='container' style={{backgroundColor:"white",width:"60%"}}>

                <div className='container' style={{width:"90%"}}>
                    <br/><br/>
                    <h3>Mis pedidos</h3>
                    <div className='container' style={{width:"90%"}}>
                        

                    </div>

                    <hr style={{height:"5px",backgroundColor:"#EB5929",opacity:1}}></hr>

                    <h6>Pedidos realizados</h6>
                    <br></br>
                    <div className='container' style={{width:"90%"}}>
                    {listOrders.map((item,index) => (
                        <div key={index} style={{marginBottom:10}} className="col-sm-12">
                            
                            <div  style={{backgroundColor:"#FFF",borderRadius:20,height:"100%",textAlign: "start"}} className="card">

                            <div className="card-body">
                                <div className='row'>
                                    <div className='col-sm-6'>
                                        <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:"bold",color:"#EB5929"}}>Id: {item[0][0]["delivery_number"]}</p>
                                        <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:500}}>Fecha de pedido: {item[0][0]["order_date"]}</p>
                                        <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:500}}>Status del pedido: {item[0][0]["status"]}</p>
                                        <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:500}}>Cantidad de tipos de producto: {item[1].length}</p>
                                    </div>
                                    <div className='col-sm-6'>
                                        <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:500}}>Productos:</p>
                                        {(listOrders[index][2]).map((data,index2) =>
                                            <li key={index2}>{data[0].product_name}</li>
                                         )}
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div style={{textAlign:"right"}} className="contianer">
                                    <button style={{borderRadius:15,backgroundColor:"#EB5929",color:"white",marginLeft:10}} onClick = {() => { methodName(item[0][0]["id"]);}} className="btn" >Ver mas</button>
                                </div>
                            </div>
                            </div>
                        </div>
                    ))}
                    </div><br></br>
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