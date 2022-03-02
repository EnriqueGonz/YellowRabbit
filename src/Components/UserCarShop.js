import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Modal} from 'react-bootstrap';

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
    const [quantity, setQuantity] = useState(null);

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

    function methodRemoveCardhop(id) {
        console.log(id);

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



    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        console.log(name + value);
        
        //setList(values => ({ ...values, [name]: value }))
    }

    // Set sleep
    function sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    //const sumarCantidad = () => { 
    function sumarCantidad(index) {
        var arrActual = list;
        var arrModificar = arrActual[index][0]
        arrModificar[0].amount += 1;
        // Empty the list before reassigning the new value.
        setList([]);
        setList(prevState => ([...prevState, ...arrActual]));        
    }

    const restarCantidad = (index) => {
        var arrActual = list;
        var arrModificar = arrActual[index][0]
        if (parseInt(arrModificar[0].amount) === 1) {
            // Empty the list before reassigning the new value.
            setList([]); 
            setList(prevState => ([...prevState, ...arrActual]));
        }
        else {
            arrModificar[0].amount -= 1;
            // Empty the list before reassigning the new value.
            setList([]);
            setList(prevState => ([...prevState, ...arrActual]));
        }
    }

    const handleSubmitDireccion = (event) => {

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
                        <div className='container' style={{ width: "90%" }}>
                            <p>     Vuee  --------------------</p>

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
                                                    
                                                    
                                                    <Form onSubmit={handleSubmitDireccion}>
                                                        {/* <Form.Label>Cantidad</Form.Label> */}
                                                        <Button style={{ marginLeft: 10, float: "right", backgroundColor: "#E94E1B", borderColor: "#E94E1B" }}>
                                                            Guardar
                                                        </Button>

                                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Menos</Tooltip>}>
                                                            {({ ref, ...triggerHandler }) => (
                                                                <div variant="light" {...triggerHandler} className="d-inline-flex align-items-center">
                                                                    <span ref={ref} className="ms-1"><MdRemove style={{ marginRight: "10px", fontSize: 25 }} className='btnFav' onClick={() => { restarCantidad(index) }}></MdRemove></span>
                                                                </div>
                                                            )}
                                                        </OverlayTrigger>

                                                        <Form.Label style={{ backgroundColor: "#DFDFDF", width: "35px", textAlign: 'center' }} required type="text" name="quantity" onChange={handleChange}> {item[0][0].amount} </Form.Label>

                                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Más</Tooltip>}>
                                                            {({ ref, ...triggerHandler }) => (
                                                                <div variant="light" {...triggerHandler} className="d-inline-flex align-items-center">
                                                                    <span ref={ref} className="ms-1"><MdAdd style={{ marginRight: "10px", fontSize: 25 }} className='btnFav' onClick={() => { sumarCantidad(index) }}></MdAdd></span>
                                                                </div>
                                                            )}
                                                        </OverlayTrigger>
                                                        </Form>





                                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Quitar del carrito de compras</Tooltip>}>
                                                            {({ ref, ...triggerHandler }) => (
                                                                <div variant="light" {...triggerHandler} className="d-inline-flex align-items-center">
                                                                    <span ref={ref} className="ms-1"><MdRemoveShoppingCart style={{ marginRight: "10px", fontSize: 25 }} className='btnFav' onClick={() => { methodRemoveCardhop(item[0][0].id); }} ></MdRemoveShoppingCart></span>
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