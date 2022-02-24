import React,{ useEffect, useState } from 'react';


import Appbar from './appbarClient';
import Footer from './footer';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { MdOutlineFavorite,MdAddShoppingCart } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var token = localStorage.getItem('tokenClient');
var idusuario = localStorage.getItem('userId');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};

const ProductoEspecifico = () =>{
    const [listProducto, setListProducto] = useState([]);
    var { idproduct } = useParams(); // params
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
          axios.get('https://yellowrabbit.herokuapp.com/products/api/specific-product/'+idproduct+'/')
          .then((response) => {
            console.log(response);
            setListProducto(response.data[0][0]);
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setListProducto])

      function methodAddWishlist(id) {
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

    function methodAddCarshop(id) {
        console.log(id);
        console.log(idusuario);

        try {
            axios.post('https://yellowrabbit.herokuapp.com/shoppingcart/api/add/',{
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


    return(    
        <>
        <Appbar></Appbar>
        <div>
            <div className='container' style={{backgroundColor:"white",width:"90%",paddingTop:30}}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-5'>
                            <div className='col'>
                                <div className='row'>
                                    <div className="gallery test1 cf">
                                        <div>
                                            <img alt='' style={{width:"100%",height:350}} src={'https://yellowrabbitbucket.s3.amazonaws.com/'+listProducto.image_one}/>
                                        </div>
                                    </div>

                                </div>
                                <div className='row'>
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="gallery test2 cf">
                                                <div>
                                                    <img alt='' style={{height:131,width:"100%"}} src={'https://yellowrabbitbucket.s3.amazonaws.com/'+listProducto.image_two}></img>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="gallery test2 cf">
                                                <div>
                                                    <img alt='' style={{height:131,width:"100%"}} src={'https://yellowrabbitbucket.s3.amazonaws.com/'+listProducto.image_three}></img>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="gallery test2 cf">
                                                <div>
                                                    <img alt='' style={{height:131,width:"100%"}} src={'https://yellowrabbitbucket.s3.amazonaws.com/'+listProducto.image_four}></img>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>

                            </div>

                        </div>
                        <div className='col-md-7'>
                            <div className='container'>
                                <h3>{listProducto.product_name}</h3>
                                <p className="card__info"><span className='simbol_price'>$</span>{listProducto.price} <span className='simbol_price'>+ envio</span></p>
                            </div>
                            <div className='container' style={{textAlign:"left"}}>
                            <button href='#formContent' className='btn row' style={{marginRight:10,color:"white",backgroundColor:"#E94E1B",borderColor:"#E94E1B"}} >Comprar</button>
                                <MdOutlineFavorite style={{marginRight:10,fontSize:32}} className='btnFav' onClick = {() => { methodAddWishlist(listProducto.id);} } ></MdOutlineFavorite>
                                <MdAddShoppingCart style={{marginRight:10,fontSize:32}} className='btnFav' onClick = {() => { methodAddCarshop(listProducto.id);} } ></MdAddShoppingCart>
                                <ToastContainer></ToastContainer>
                            </div>

                        </div>

                    </div>
                    <p>Descripcion del producto</p>
                    <p>{listProducto.description}</p>
                </div>
                

                <hr style={{height:"5px",backgroundColor:"#EB5929",opacity:1}}></hr>

            </div> 
        </div>

        <Footer></Footer>
    


        </>
    )

}
export default ProductoEspecifico;