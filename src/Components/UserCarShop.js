import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';

import imgindex1 from '../images/fondouser.png';
import LoadingUserCarShop from './LoadingUserCarShop';

import Appbar from './appbarClient';
import Footer from './footer';
import axios from 'axios';

import { MdOutlineFavorite, MdRemoveShoppingCart, MdAdd, MdRemove } from "react-icons/md";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../config';


var baseUrl = global.config.yellow.rabbit.url;

var token = localStorage.getItem('tokenClient');
var username = localStorage.getItem('usernameClient');
var idusuario = localStorage.getItem('userId');


const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const UserCarShop = () => {
    const [list, setList] = React.useState([]);

    const notify = () => {
        toast('Producto agregado a tu whitelist🔥', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }

    /* Shopping Cart */
    const notifyShoppingCart = () => {
        toast('Producto removido de tu carrito de compras.', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }

    const notifyUpdateShoppingCart = () => {
        toast('Se ha guardado los cambios.', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }


    // End notifyShoppingCart

    const notifyerror = () => {
        toast.error('Opsss, intentalo mas tarde', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }


    const notifylisto = () => {
        toast('Ese producto ya esta en tu whitelist', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }


    React.useEffect(() => {
        try {
            axios.get(baseUrl+'/shoppingcart/api/my-shopping-cart/' + username + '/', { headers })
                .then((response) => {
                    setList(response.data);
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps


    }, [setList])

    if (!list.length) return <LoadingUserCarShop />;

    function methodName(id) {
        try {
            axios.post(baseUrl+'/wishlist/api/add-wishlist/', {
                user: idusuario,
                products: id
            }, { headers })
                .then((response) => {
                    if (response.status === 200) {
                        notify();
                    }
                    if (response.status === 208) {
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

    /* Shopping Cart */
    function methodRemoveShopCart(id) {
        try {
            axios.delete(baseUrl+'/shoppingcart/api/delete/' + parseInt(id) + '/', { headers })
                .then((response) => {
                    if (response.status === 200) {
                        notifyShoppingCart();
                        reloadList();
                        
                    }
                })
                .catch((error) => {
                    notifyerror();
                });

        } catch (error) {
            console.log(' . ', error);
        }

    }


    function updateCarShop(idCarShop,cantidad){
        try {
            axios.put(baseUrl+'/shoppingcart/api/update/'+idCarShop+'/',{
                amount:cantidad
            },{ headers })
                .then((response) => {
                    console.log(response)
                    document.getElementById('btnSumar'+idCarShop).style.display="block"
                    document.getElementById('loadingSuma'+idCarShop).style.display="none"
                    document.getElementById('btnRestar'+idCarShop).style.display="block"
                    document.getElementById('loading'+idCarShop).style.display="none"
                    reloadList(idCarShop);
                })
                .catch((error) => {
                    notifyerror();
                });

        } catch (error) {
            console.log(' . ', error);
        }
    }

    let costo_total = 0;
    let CantidadTotal = 0;


    list.map((item) =>(
        costo_total += parseFloat(item[0][0]["total_price"]),
        CantidadTotal += item[0][0]["amount"]
    ))
    costo_total = costo_total.toFixed(2);

    function reloadList(idCarShop){
        try {
            axios.get(baseUrl+'/shoppingcart/api/my-shopping-cart/' + username + '/', { headers })
                .then((response) => {
                    setList(response.data);
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log(' . ', error);
        }
    }


    function sumarCantidad(id) {
        console.log(id)
        var cantidadNow = 0;
        document.getElementById('btnSumar'+id).style.display="none"
        document.getElementById('loadingSuma'+id).style.display="block"
        for (let num = 0; num < list.length; num++) {
            if(id === list[num][0][0].id){
                cantidadNow = list[num][0][0].amount + 1;
            }
        }

        updateCarShop(id,cantidadNow);

    }


    const restarCantidad = (id) => {
        console.log(id)
        var cantidadNow = 0;
        document.getElementById('btnRestar'+id).style.display="none"
        document.getElementById('loading'+id).style.display="block"

        for (let num = 0; num < list.length; num++) {
            if(id === list[num][0][0].id){
                cantidadNow = list[num][0][0].amount - 1;
            }
        }

        if(cantidadNow > 0){
            updateCarShop(id,cantidadNow);
        }else{
            document.getElementById('btnRestar'+id).style.display="block"
            document.getElementById('loading'+id).style.display="none"
        }
        
        
    }


    return (
        <>
            <Appbar></Appbar>
            <div style={{ backgroundImage: "url('" + imgindex1 + "')" }}>
                <div className='row' style={{width:"100%"}}>
                <div className='col-8'>
                    <div className='container' style={{ backgroundColor: "white", width: "90%" }}>
                    <div className='container' style={{ width: "90%" }}>
                        <br /><br />
                        <h3>Carrito de compras</h3>
                        <div className='container' style={{ width: "90%" }}>


                        </div>

                        <hr style={{ height: "5px", backgroundColor: "#EB5929", opacity: 1 }}></hr>

                        <div className='container'>
                        <div style={{ marginBottom: 10,borderBottom:"solid",borderWidth:1,borderColor:"#E6E6E6",textAlign:"right" }} className="col-sm-12">
                            <p>Precio</p>
                        </div>

                            {list.map((item, index) => (
                                <div key={index} style={{ marginBottom: 10,borderBottom:"solid",borderWidth:1,borderColor:"#E6E6E6" }} className="col-sm-12">

                                    <div style={{ backgroundColor: "#FFF", height: "100%", textAlign: "start" }} className="">

                                        <div className="card-body" style={{padding:1}}>
                                            <div className='row'>
                                                <div className='col-sm-2' style={{textAlign:"center"}}>
                                                    <img alt="" style={{ width:60, height: 60, borderRadius:30 }} src={'https://yellowrabbitbucket.s3.amazonaws.com/' + item[1][0].image_one}></img>
                                                </div>
                                                <div className='col-sm-8'>
                                                    <a href={'/article/details/' + item[1][0].id} title='Ver producto' style={{ textDecorationLine: "none" }}><p className='module line-clamp' style={{ fontFamily: "'Cairo', sans-serif", fontWeight: "bold", color: "black" }}>{item[1][0].product_name}</p></a>
                                                    <div className="contianer" style={{display:"flex",alignItems:"center"}}>

                                                        <Form.Label style={{ width: "auto", textAlign: 'center', color:"#EB5929", fontWeight:"bold" }} type="text" name="quantity"> <p style={{ fontFamily: "'Cairo', sans-serif", fontWeight: "bold", color: "black"}}>Cantidad</p> </Form.Label>
                                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Menos</Tooltip>}>
                                                                {({ ref, ...triggerHandler }) => (
                                                                    <div variant="light" {...triggerHandler} className="d-inline-flex align-items-center">
                                                                        <div id={"loading"+item[0][0].id} className="spinner-border" style={{display:"none",width:20,height:20,marginLeft:7,marginRight:5}} role="status">
                                                                        </div>
                                                                        <span id={"btnRestar"+item[0][0].id} ref={ref} className="ms-1"><MdRemove style={{ marginRight: "10px", fontSize: 25 }} className='btnFav' onClick={() => { restarCantidad(item[0][0].id) }}></MdRemove></span>
                                                                    </div>
                                                                )}
                                                            </OverlayTrigger>

                                                            

                                                            <Form.Label style={{ backgroundColor: "#DFDFDF", width: "35px", textAlign: 'center' }} required type="text" name="quantity"> {item[0][0].amount} </Form.Label>

                                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Más</Tooltip>}>
                                                                {({ ref, ...triggerHandler }) => (
                                                                    <div variant="light" {...triggerHandler} className="d-inline-flex align-items-center">
                                                                        <div id={"loadingSuma"+item[0][0].id} className="spinner-border" style={{display:"none",width:20,height:20,marginLeft:5}} role="status">
                                                                        </div>
                                                                        <span id={"btnSumar"+item[0][0].id} ref={ref} className="ms-1"><MdAdd style={{ marginRight: "10px", fontSize: 25 }} className='btnFav' onClick={() => { sumarCantidad(item[0][0].id) }}></MdAdd></span>
                                                                    </div>
                                                                )}
                                                            </OverlayTrigger>
                                                        
                                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Quitar del carrito de compras</Tooltip>}>
                                                            {({ ref, ...triggerHandler }) => (
                                                                <div variant="light" {...triggerHandler} className="d-inline-flex align-items-center">
                                                                    <span ref={ref} className="ms-1"><MdRemoveShoppingCart style={{ marginRight: "10px", fontSize: 25 }} className='btnFav' onClick={() => { methodRemoveShopCart(item[0][0].id); }} ></MdRemoveShoppingCart></span>
                                                                </div>
                                                            )}
                                                        </OverlayTrigger>

                                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Agregar a la wishlist</Tooltip>}>
                                                            {({ ref, ...triggerHandler }) => (
                                                                <div variant="light" {...triggerHandler} className="d-inline-flex align-items-center">
                                                                    <span ref={ref} className="ms-1"><MdOutlineFavorite style={{ fontSize: 25 }} className='btnFav' alt="Agregar a la wishlist" onClick={() => { methodName(item[0][0].products_id); }}></MdOutlineFavorite></span>
                                                                </div>
                                                            )}
                                                        </OverlayTrigger>

                                                        <ToastContainer></ToastContainer>
                                                    </div>
                                                </div>
                                                <div className='col-sm-2' style={{textAlign:"end",padding:0}}>
                                                    <p style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 500 }}>{'$' + item[1][0].price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <br></br>

                    </div>
                    </div>
                </div>
                <div className='col-4'>
                    <div className='container' style={{ backgroundColor: "white", width: "90%" }}>
                        <div className='container' style={{ width: "90%" }}>
                        <br /><br />
                        <h3>Comprar Carrito</h3>
                        <hr style={{ height: "5px", backgroundColor: "#EB5929", opacity: 1 }}></hr>
                        <br/><br/>
                        <p>{"Subtotal: ("+CantidadTotal+" productos):"}</p>
                        <p>{"$"+costo_total+" MXN"}</p>

                        <Button style={{ backgroundColor: "#E94E1B", borderColor: "#E94E1B", fontSize: "14px" }} > Proceder al pago </Button>
                        <br/><br/>
                        
                        </div>
                    </div>
                    
                </div>

                </div>

            </div>
            <Footer></Footer>

        </>
    )

}
export default UserCarShop;