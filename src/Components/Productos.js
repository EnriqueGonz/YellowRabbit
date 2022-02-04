import React, {useState,useEffect} from 'react';

import imgproducto from '../images/producto.png';

import { Carousel} from 'react-bootstrap';

import Appbar from './appbar';
import Footer from './footer';

import axios from 'axios';
import { MdOutlineFavorite } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
          axios.post('https://yellowrabbit.herokuapp.com/products/api/all-products/',{
            product_name: ""
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
            <div style={{width:"90%",textAlign:"justify"}}>
                <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:"bold",color:"#EB5929"}}>Catalogo de productos</p>
                <div>
                    {listProductos.map((item) => (
                        <div key={item.id} style={{marginBottom:10}} className="col-sm-12">
                            <div  style={{backgroundColor:"#FFE9EB",borderRadius:20,height:"100%"}} className="card">
                            <div className="card-body">
                            
                            <div className='row'>
                                <div className='col-sm-4'>
                                    <img alt="producto" style={{width:"100%"}} src={ 'https://yellowrabbitbucket.s3.amazonaws.com/' + item.image_one}></img>
                                </div>
                                <div className='col-sm-8'>
                                    <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:"bold",color:"#EB5929"}}>{item.product_name}</p>
                                    <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:500}}>{item.description}</p>
                                    <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:500}}>Precio: ${item.price}</p>
                                    <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:500}}>Disponible: {item.unit_of_existence}</p>
                                </div>

                            </div>

                            </div>
                            <div className="card-footer">
                                <div style={{textAlign:"right"}} className="contianer">
                                <button onClick = {() => { methodName(item.id);} }  className='btn corazon'><MdOutlineFavorite className='colorear'></MdOutlineFavorite></button>
                                <button style={{borderRadius:15,backgroundColor:"#E75353",color:"white"}} className="btn"   >Comprar</button>
                                <button style={{borderRadius:15,backgroundColor:"#7B3E90",color:"white",marginLeft:10}} className="btn" >Agregar al carrito</button>
                                
                                <ToastContainer></ToastContainer>
                                
                                

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