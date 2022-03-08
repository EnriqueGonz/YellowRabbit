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

var token = localStorage.getItem('tokenClient');
var username = localStorage.getItem('usernameClient');
var idusuario = localStorage.getItem('userId');


const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const UserCarShop = () => {
    const [list, setList] = React.useState([]);
    const [initialCost, setInitialCost] = useState(null);

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
            axios.get('https://yellowrabbit.herokuapp.com/shoppingcart/api/my-shopping-cart/' + username + '/', { headers })
                .then((response) => {
                    console.log(response.data);
                    setList(response.data);
                    var costoTotalInicio = calcularCostoTotal(response.data);
                    setInitialCost(costoTotalInicio);
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
        console.log(id);
        console.log(idusuario);

        try {
            axios.post('https://yellowrabbit.herokuapp.com/wishlist/api/add-wishlist/', {
                user: idusuario,
                products: id
            }, { headers })
                .then((response) => {
                    console.log(response.status);
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
            axios.delete('https://yellowrabbit.herokuapp.com/shoppingcart/api/delete/' + parseInt(id) + '/', { headers })
                .then((response) => {
                    console.log(response.status);
                    if (response.status === 200) {
                        notifyShoppingCart();
                        // sleep 3 seconds
                        sleep(3000).then(r => {
                            window.location.href = "/user/mi-carrito";
                        })
                    }
                })
                .catch((error) => {
                    notifyerror();
                });

        } catch (error) {
            console.log(' . ', error);
        }

    }



    function updateShoppingCart() {
        var arrValores = list;
        var arrShoppingCart = [];

        // Only Shoppint cart
        for (let i = 0; i < arrValores.length; i++) {
            var element = arrValores[i];
            arrShoppingCart.push(element[0])
        }

        // Shopping cart id & amount
        for (let j = 0; j < arrShoppingCart.length; j++) {
            var quantity = arrShoppingCart[j][0].amount;
            var shoppingId = arrShoppingCart[j][0].id;
            // Update
            try {
                axios.put('https://yellowrabbit.herokuapp.com/shoppingcart/api/update/' + parseInt(shoppingId) + '/', {
                    amount: parseInt(quantity)
                }, { headers })
                    .then((response) => {
                        console.log(response.status);
                        if (response.status === 200) {
                            // Do something
                        }
                    })
                    .catch((error) => {
                        notifyerror();
                    });

            } catch (error) {
                console.log(' . ', error);
            }
        }
        // sleep 2 seconds
        notifyUpdateShoppingCart();
        sleep(2000).then(r => {
            window.location.href = "/user/mi-carrito";
        })
    }
    // END Shopping cart

    // Set sleep
    function sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }


    function sumarCantidad(index) {
        var arrActual = list;
        var arrModificar = arrActual[index][0]
        arrModificar[0].amount += 1;
        // Empty the list before reassigning the new value.
        setList([]);
        setList(prevState => ([...prevState, ...arrActual]));
        setInitialCost(calcularCostoTotal(list));
    }


    const restarCantidad = (index) => {
        var arrActual = list;
        var arrModificar = arrActual[index][0]
        if (parseInt(arrModificar[0].amount) === 1) {
            // Empty the list before reassigning the new value.
            setList([]);
            setList(prevState => ([...prevState, ...arrActual]));
            setInitialCost(calcularCostoTotal(list));
        }
        else {
            arrModificar[0].amount -= 1;
            // Empty the list before reassigning the new value.
            setList([]);
            setList(prevState => ([...prevState, ...arrActual]));
            setInitialCost(calcularCostoTotal(list));
        }
    }



    function calcularCostoTotal(costo) {
        var precioTotal = 0
        for (let index = 0; index < costo.length; index++) {
            var element = costo[index];
            var precioUnitario = element[0][0].unit_price;
            precioTotal += (parseFloat(precioUnitario) * parseInt(element[0][0].amount));
        }
        // total price with 2 decimals
        var totalPriceTDecimal = (Math.round(parseFloat(precioTotal) * 100) / 100);
        return totalPriceTDecimal;
    }


    return (
        <>
            <Appbar></Appbar>
            <div style={{ backgroundImage: "url('" + imgindex1 + "')" }}>
                <div className='container' style={{ backgroundColor: "white", width: "60%" }}>

                    <div className='container' style={{ width: "90%" }}>
                        <br /><br />
                        <h3>Carrito de compras</h3>
                        <div className='container' style={{ width: "90%" }}>


                        </div>

                        <hr style={{ height: "5px", backgroundColor: "#EB5929", opacity: 1 }}></hr>

                        <br></br>
                        <div className='container' style={{ width: "90%"}}>

                            {list.map((item, index) => (
                                <div key={index} style={{ marginBottom: 10 }} className="col-sm-12">

                                    <div style={{ backgroundColor: "#FFF", borderRadius: 20, height: "100%", textAlign: "start" }} className="card">

                                        <div className="card-body">
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <img alt="Quitar de la wishlist" style={{ width: "100%", height: "100px" }} src={'https://yellowrabbitbucket.s3.amazonaws.com/' + item[1][0].image_one}></img>
                                                </div>
                                                <div className='col-sm-9'>
                                                    <a href={'/article/details/' + item[1][0].id} title='Ver producto' style={{ textDecorationLine: "none" }}><p style={{ fontFamily: "'Cairo', sans-serif", fontWeight: "bold", color: "#EB5929" }}>{item[1][0].product_name}</p></a>
                                                    <p style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 500 }}>{'$' + item[1][0].price}</p>
                                                    <div style={{ position: "absolute", right: "2%", bottom: "2%" }} className="contianer">

                                                        <Form.Label style={{ width: "auto", textAlign: 'center', color:"#EB5929", fontWeight:"bold" }} type="text" name="quantity"> Cantidad </Form.Label>
                                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Menos</Tooltip>}>
                                                                {({ ref, ...triggerHandler }) => (
                                                                    <div variant="light" {...triggerHandler} className="d-inline-flex align-items-center">
                                                                        <span ref={ref} className="ms-1"><MdRemove style={{ marginRight: "10px", fontSize: 25 }} className='btnFav' onClick={() => { restarCantidad(index) }}></MdRemove></span>
                                                                    </div>
                                                                )}
                                                            </OverlayTrigger>

                                                            <Form.Label style={{ backgroundColor: "#DFDFDF", width: "35px", textAlign: 'center' }} required type="text" name="quantity"> {item[0][0].amount} </Form.Label>

                                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Más</Tooltip>}>
                                                                {({ ref, ...triggerHandler }) => (
                                                                    <div variant="light" {...triggerHandler} className="d-inline-flex align-items-center">
                                                                        <span ref={ref} className="ms-1"><MdAdd style={{ marginRight: "10px", fontSize: 25 }} className='btnFav' onClick={() => { sumarCantidad(index) }}></MdAdd></span>
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div><br></br><br></br>
                        <div style={{ textAlign: "center", fontSize: "20px", marginBottom: "2%", fontWeight: "bold" }}>
                            <p><span style={{ color: "#EB5929", opacity: 1 }}>Costo total: </span> {initialCost} </p>
                            <Button style={{ backgroundColor: "#E94E1B", borderColor: "#E94E1B", fontSize: "18px" }} onClick={() => { updateShoppingCart(); }}> Guardar cambios </Button>
                        </div>

                        <hr style={{ height: "5px", backgroundColor: "#EB5929", opacity: 1 }}></hr>
                        <br></br>

                    </div>
                </div>

            </div>
            <Footer></Footer>

        </>
    )

}
export default UserCarShop;