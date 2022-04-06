import React, {useState,useEffect} from 'react';

import imgproducto from '../images/producto.png';

import { Carousel} from 'react-bootstrap';

import Appbar from './appbar';
import Footer from './footer';

import axios from 'axios';
import { MdOutlineFavorite,MdAddShoppingCart } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../config';


var baseUrl = global.config.yellow.rabbit.url;

var token = localStorage.getItem('tokenClient');
//var username = localStorage.getItem('usernameClient');
var idusuario = localStorage.getItem('userId');



const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};




const Productos = () =>{
    const [listProductos, setListProductos] = useState([]);
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
          axios.post(baseUrl+'/products/api/all-products/',{
            product_name: "",
            category_name:""
          })
          .then((response) => {
            console.log(response);
            setListProductos(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setListProductos])

      function methodName(id) {
        console.log(id);
        console.log(idusuario);

        try {
            axios.post(baseUrl+'/wishlist/api/add-wishlist/',{
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

    function methodAddCarshop(id) {
        console.log(id);
        console.log(idusuario);

        try {
            axios.post(baseUrl+'/shoppingcart/api/add/',{
            user: idusuario,
            products:id,
            amount: 1
            },{headers})
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(' . ', error);
        }
    }

    function methodShowProduct(id) {
        console.log(id);
        window.location = '/article/details/'+id;

    }

    return(    
        <>
        <Appbar></Appbar>
        <div className='container'>
            <div style={{widows:"75%"}}>
            <div className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"#FFF",justifyContent: "space-around"}}>
              <a className='aNoSelected' href='/inicio'>INICIO</a>
              <a className='aNoSelected' href='/datos'>DATOS</a>
              <a className='aSelected' href='/productos'>PRODUCTOS</a>
              <a className='aNoSelected' href='/blog'>BLOG</a>
              <a className='aNoSelected' href='/contacto'>CONTACTO</a>
            </div>

            </div>

        </div>
        <Carousel>
            <Carousel.Item className='contenedor'>
                <img alt='' src={imgproducto} style={{width:"100%"}}/>
                <div className="possText1Img1" style={{color:"#FFF"}}>
                    <p style={{fontFamily:"'Quicksand', sans-serif",fontWeight:"bold",fontSize:65}}>Sigue tus</p>
                    <p style={{fontFamily:"'Quicksand', sans-serif",fontWeight:"bold",fontSize:85}}>Instintos</p>
                </div>
            </Carousel.Item>
        </Carousel>

        <div className='container'>
            <center>
            <div style={{width:"100%",textAlign:"justify"}}>
                <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:"bold",color:"#EB5929"}}>Catalogo de productos</p>
                <div className="grid-container-productos">
                    {listProductos.map((item,index) => (
                        <div className="grid-item" key={index}>
                            <div className="column" style={{height:"100%"}}>
                                <div className="card" >
                                    <div className="card__content">
                                        <div className='row' style={{height:"50%"}}>
                                            <img onClick = {() => { methodShowProduct(item.id);} } alt={'Img'} style={{height:"100%"}} src={'https://yellowrabbitbucket.s3.amazonaws.com/'+item.image_one}></img>    
                                        </div>
                                        <div className='row' style={{height:"50%"}}>
                                            <p onClick = {() => { methodShowProduct(item.id);} } className="card__info" style={{marginBottom:0}}>{item.product_name}</p>
                                            <p className="card__info"><span className='simbol_price'>$</span>{item.price} <span className='simbol_price'>+ envio</span></p>
                                            <div className='container' style={{textAlign:"right"}}>
                                                <MdOutlineFavorite style={{marginLeft:"10px",fontSize:25}} className='btnFav' onClick = {() => { methodName(item.id);} } ></MdOutlineFavorite>
                                                <MdAddShoppingCart style={{marginLeft:"10px",fontSize:25}} className='btnFav' onClick = {() => { methodAddCarshop(item.id);} } ></MdAddShoppingCart>
                                                <ToastContainer></ToastContainer>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
            </div>
            </center>
        </div>
        <br></br>


        <Footer></Footer>

        </>
    )

}
export default Productos;