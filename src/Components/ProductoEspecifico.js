import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Appbar from './appbarClient';
import Footer from './footer';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MdOutlineFavorite, MdAddShoppingCart, MdAdd, MdRemove } from "react-icons/md";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


var token = localStorage.getItem('tokenClient');
var idusuario = localStorage.getItem('userId');
var precio = 0;

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const ProductoEspecifico = () => {
    const [listProducto, setListProducto] = useState([]);
    const [amount, setAmount] = useState(1);
    const [initialCost, setInitialCost] = useState(null);


    var { idproduct } = useParams(); // params
    const notify = () => {
        toast('Producto agregado🔥', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }

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
        toast('Ese producto ya esta agregado', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }

    useEffect(() => {
        try {
          axios.get('https://yellowrabbit.herokuapp.com/products/api/specific-product/'+idproduct+'/')
          .then((response) => {
            console.log(response);
            setListProducto(response.data[0][0]);
            setInitialCost(response.data[0][0].price)
            precio = response.data[0][0].price;
          })
          .catch((error) => {
            console.log(error);
          });
    

            axios.get('https://yellowrabbit.herokuapp.com/products/api/specific-product/' + idproduct + '/', { headers })
                .then((response) => {
                    setListProducto(response.data[0][0]);
                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setListProducto])


    function methodAddWishlist(id) {
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

    function methodAddCarshop(id) {
        try {
            axios.post('https://yellowrabbit.herokuapp.com/shoppingcart/api/add/', {
                user: idusuario,
                products: id,
                amount: amount
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
                    console.log(error);
                    notifyerror();
                });
        } catch (error) {
            console.log(' . ', error);
        }
    }


    const sumarCantidad = () => {
        if(amount < listProducto.unit_of_existence){
            setAmount(amount + 1);
            updateCosto(1);

        }
        
    }

    const updateCosto = (num) => {
        setInitialCost((amount+num) * precio);
    }


    const restarCantidad = () => {
        if (amount === 1) {
            console.log('No se puede restar mas')
          } else {
            setAmount(amount - 1);
            updateCosto(-1);
          }
    }





    return (
        <>
            <Appbar></Appbar>
            <div>
                <div className='container' style={{ backgroundColor: "white", width: "90%", paddingTop: 30 }}>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-5'>
                                <div className='col'>
                                    <div className='row'>
                                        <div className="gallery test1 cf">
                                            <div>
                                                <img alt='' style={{ width: "100%", height: 350 }} src={'https://yellowrabbitbucket.s3.amazonaws.com/' + listProducto.image_one} />
                                            </div>
                                        </div>

                                    </div>
                                    <div className='row'>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="gallery test2 cf">
                                                        <div>
                                                            <img alt='' style={{ height: 131, width: "100%" }} src={'https://yellowrabbitbucket.s3.amazonaws.com/' + listProducto.image_two}></img>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="gallery test2 cf">
                                                        <div>
                                                            <img alt='' style={{ height: 131, width: "100%" }} src={'https://yellowrabbitbucket.s3.amazonaws.com/' + listProducto.image_three}></img>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="gallery test2 cf">
                                                        <div>
                                                            <img alt='' style={{ height: 131, width: "100%" }} src={'https://yellowrabbitbucket.s3.amazonaws.com/' + listProducto.image_four}></img>
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
                                    <span className='simbol_price'>Stock: {listProducto.unit_of_existence}  </span>
                                </div>

                                <div className='container'>
                                    <Form.Label style={{ width: "auto", textAlign: 'center', color: "#EB5929", fontWeight: "bold", fontSize: "18px" }} type="text" name="quantity"> Seleccionar Cantidad </Form.Label>
                                    <br></br>
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Menos</Tooltip>}>
                                        {({ ref, ...triggerHandler }) => (
                                            <div variant="light" {...triggerHandler} className="d-inline-flex align-items-center">
                                                <span ref={ref} className="ms-1"><MdRemove style={{ marginRight: "10px", fontSize: 25 }} className='btnFav' onClick={() => { restarCantidad() }}></MdRemove></span>
                                            </div>
                                        )}
                                    </OverlayTrigger>

                                    <Form.Label style={{ backgroundColor: "#DFDFDF", width: "35px", textAlign: 'center' }} required type="text" name="quantity" >{amount}</Form.Label>

                                    

                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Más</Tooltip>}>
                                        {({ ref, ...triggerHandler }) => (
                                            <div variant="light" {...triggerHandler} className="d-inline-flex align-items-center">
                                                <span ref={ref} className="ms-1"><MdAdd style={{ marginRight: "10px", fontSize: 25 }} className='btnFav' onClick={() => { sumarCantidad() }}></MdAdd></span>
                                            </div>
                                        )}
                                    </OverlayTrigger>

                                    <div style={{ marginTop: "3%", fontSize: "19px", marginRight: "10px", fontWeight: "bold", backgroundColor:"#0000" }}>
                                </div>
                                <div className='container' style={{ textAlign: "left",paddingLeft:0 }}>
                                    <MdOutlineFavorite style={{ marginRight: 10, fontSize: 32 }} className='btnFav' onClick={() => { methodAddWishlist(listProducto.id); }} ></MdOutlineFavorite>
                                    <MdAddShoppingCart style={{ marginRight: 10, fontSize: 32 }} className='btnFav' onClick={() => { methodAddCarshop(listProducto.id); }} ></MdAddShoppingCart>
                                    <ToastContainer></ToastContainer>
                                    <br></br>
                                </div>
                                <div className='container' style={{paddingLeft:0}}>
                                    <p>Costo Total: ${new Intl.NumberFormat().format(initialCost)}MXN <span className='simbol_price'>+ envio</span></p>
                                    <Button style={{ backgroundColor: "#E94E1B", borderColor: "#E94E1B", fontSize: "14px" }} > Proceder al pago </Button>

                                </div>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <p style={{ fontWeight: "bold", fontSize: "18px" }}>Descripcion del producto</p>
                        <p>{listProducto.description}</p>
                    </div>
                    <hr style={{ height: "5px", backgroundColor: "#EB5929", opacity: 1 }}></hr>

                </div>
            </div>


            <Footer></Footer>
        </>
    )
}



export default ProductoEspecifico;