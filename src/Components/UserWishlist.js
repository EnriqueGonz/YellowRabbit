import React,{ useEffect, useState } from 'react';

import imgindex1 from '../images/fondouser.png';
import LoadingUserProducts from './LoadingUserProductos';

import Appbar from './appbarClient';
import Footer from './footer';
import axios from 'axios';

import { MdOutlineFavorite,MdAddShoppingCart } from "react-icons/md";
import { OverlayTrigger,Tooltip } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var token = localStorage.getItem('tokenClient');
var username = localStorage.getItem('usernameClient');
var idusuario = localStorage.getItem('userId');


const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};



const UserWishlist = () =>{
    const [list, setList] = useState([]);
    const notify = () => 
    {toast('Producto agregado a tu whitelist🔥', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    })}
    const notifyerror = () => 
    {toast.error('Opsss, intentalo mas tarde', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    })}
    const notifylisto = () => 
    {toast('Ese producto ya esta en tu whitelist', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    })}


    useEffect(() =>{  
        try {
          axios.post('https://yellowrabbit.herokuapp.com/wishlist/api/wishlist-customer/'+username+'/',{
              product_name:""
          },{headers})
          .then((response) => {
            console.log(response.data);
            setList(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setList])

      if (!list.length) return <LoadingUserProducts />;

      function methodAddCarshop(id) {
        console.log(id);
        console.log(idusuario);

        try {
            axios.post('https://yellowrabbit.herokuapp.com/wishlist/api/add-wishlist/',{
            user: idusuario,
            products:id
            },{headers})
            .then((response) => {
                console.log(response.status);
                if(response.status === 200){
                    notify();
                }
                if(response.status === 208){
                    notifylisto();
                }
            })
            .catch((error) => {
                notifyerror();
            });
    
        } catch (error) {
            console.log(' . ', error);
        }
    }

    function methodName(id) {
        console.log(id);
        try {
            axios.delete('https://yellowrabbit.herokuapp.com/wishlist/api/delete/'+id+'/',{headers})
            .then((response) => {
                console.log(response.status);
                window.location.href = "/user/mi-wishlist"
            })
            .catch((error) => {
                console.log(error);
            });
    
        } catch (error) {
            console.log(' . ', error);
        }
    }

    return(    
        <>
        <Appbar></Appbar>
        <div style={{backgroundImage:"url('"+imgindex1+"')"}}>
            <div className='container' style={{backgroundColor:"white",width:"60%"}}>

                <div className='container' style={{width:"90%"}}>
                    <br/><br/>
                    <h3>WISHLIST</h3>
                    <div className='container' style={{width:"90%"}}>
                        

                    </div>

                    <hr style={{height:"5px",backgroundColor:"#EB5929",opacity:1}}></hr>

                    <h6>Mis productos</h6>
                    <br></br>
                    <div className='container' style={{width:"90%"}}>
                    {list.map((item,index) => (
                        <div key={index} style={{marginBottom:10}} className="col-sm-12">
                            
                            <div  style={{backgroundColor:"#FFF",borderRadius:20,height:"100%",textAlign:"start"}} className="card">

                            <div className="card-body">
                                <div className='row'>
                                    <div className='col-sm-3'>
                                        <img alt="Quitar de la wishlist" style={{width:"100%",height:"100px"}} src={ 'https://yellowrabbitbucket.s3.amazonaws.com/'+item[1][0].image_one}></img>
                                    </div>
                                    <div className='col-sm-9'>
                                        <a href={'/article/details/'+item[1][0].id} title='Ver producto' style={{textDecorationLine:"none"}}><p style={{fontFamily:"'Cairo', sans-serif",fontWeight:"bold",color:"#EB5929"}}>{item[1][0].product_name}</p></a>
                                        <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:500}}>{'$'+item[1][0].price}</p>
                                        <div style={{position:"absolute",right:"2%",bottom:"2%"}} className="contianer">
                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Agregar al carrito de compras</Tooltip>}>
                                                {({ ref, ...triggerHandler }) => (
                                                <div variant="light" {...triggerHandler} className="d-inline-flex align-items-center">
                                                    <span ref={ref} className="ms-1"><MdAddShoppingCart style={{marginRight:"10px",fontSize:25}} className='btnFav' onClick = {() => { methodAddCarshop(item[1][0].id);} } ></MdAddShoppingCart></span>
                                                </div>
                                                )}
                                            </OverlayTrigger>
                                            
                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Quitar de la wishlist</Tooltip>}>
                                                {({ ref, ...triggerHandler }) => (
                                                <div variant="light" {...triggerHandler} className="d-inline-flex align-items-center">
                                                    <span ref={ref} className="ms-1"><MdOutlineFavorite style={{fontSize:25}} className='btnQuitarfav' alt="Quitar de la wishlist" onClick = {() => { methodName(item[0][0].id);} }></MdOutlineFavorite></span>
                                                </div>
                                                )}
                                            </OverlayTrigger>
                                            <ToastContainer></ToastContainer>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    ))}
                    </div><br></br><br></br>
                    <hr style={{height:"5px",backgroundColor:"#EB5929",opacity:1}}></hr>
                    
                    
                    <br></br>

                </div>
            </div> 

        </div>
        <Footer></Footer>

        </>
    )

}
export default UserWishlist;