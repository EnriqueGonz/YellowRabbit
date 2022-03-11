import React, { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
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

var opcion = undefined;
var jsonProductDetailList = {
    size: "",
    color: "",
    flavor: "",
    other_details: ""
};

// Order details - raw
var jsonOrderDetails = {
    products: undefined,
    amount: undefined,
    unit_price: undefined,
    total_price: undefined
};

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const ProductoEspecifico = () => {
    const [listProducto, setListProducto] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    const [totalCost, setTotalCost] = useState({ 'totalcost': 0 });
    const [quantity, setQuantity] = useState({ 'cantidad': 1 });
    const [orderDetails, setOrderDetails] = useState({
        products: undefined,
        amount: undefined,
        unit_price: undefined,
        total_price: undefined
    });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    var { idproduct } = useParams(); // params
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

    useEffect(() => {
        try {
            axios.get('https://yellowrabbit.herokuapp.com/products/api/specific-product/' + idproduct + '/', { headers })
                .then((response) => {
                    console.log(response.data);
                    setListProducto(response.data[0][0]);
                    setProductDetails(response.data[1]);
                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setListProducto])


    function methodAddWishlist(id) {
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

    function methodAddCarshop(id) {
        console.log(id);
        console.log(idusuario);

        try {
            axios.post('https://yellowrabbit.herokuapp.com/shoppingcart/api/add/', {
                user: idusuario,
                products: id,
                amount: 1
            }, { headers })
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


    function methodBuyProduct(id) {
        /*
         * Options
         *  - 0: Not description
         *  - 1: Color
         *  - 2: Size
         *  - 3: Flavor
         *  - 4: Color & size
         */

        console.log('id product: ', id);

        let getColor = jsonProductDetailList.color;
        let getSize = jsonProductDetailList.size;
        let getFlavor = jsonProductDetailList.flavor;
        // Products
        let precioUnitario = listProducto.price;
        let cantidadProducto = quantity.cantidad;
        let precioTotal = parseFloat(precioUnitario) * parseInt(cantidadProducto);
        // Total price with 2 de decimals
        let totalPriceTDecimal = (Math.round(parseFloat(precioTotal) * 100) / 100);
        setTotalCost(values => ({ ...values, ['totalcost']: totalPriceTDecimal }))


        jsonOrderDetails['products'] = id;
        jsonOrderDetails['amount'] = parseInt(cantidadProducto);
        jsonOrderDetails['unit_price'] = parseFloat(precioUnitario);
        jsonOrderDetails['total_price'] = totalPriceTDecimal;


        let orderSpecifications = [];
        localStorage.removeItem('orderSpecifications');


        orderSpecifications.push(listProducto);
        orderSpecifications.push(parseInt(opcion));
        orderSpecifications.push(jsonProductDetailList);
        orderSpecifications.push(jsonOrderDetails);
        localStorage.setItem('orderSpecifications', JSON.stringify(orderSpecifications));


        switch (opcion) {
            case 0:
                // El producto no cuenta con especificaciones
                window.location = '/confirmar/pedido';
                break;
            case 1:
                if (getColor !== "") {
                    window.location = '/confirmar/pedido';
                } else {
                    setShow(true);
                }
                break;

            case 2:
                if (getSize !== "") {
                    window.location = '/confirmar/pedido';
                } else {
                    setShow(true);
                }
                break;

            case 3:
                if (getFlavor !== "") {
                    window.location = '/confirmar/pedido';
                } else {
                    setShow(true);
                }
                break;

            case 4:
                if (getSize !== "" && getColor !== "") {
                    window.location = '/confirmar/pedido';
                } else {
                    setShow(true);
                }
                break;
        }
    }


    function handleChange(evt) {
        let name = evt.target.name;
        let value = evt.target.value;
        jsonOrderDetails[name] = value;
        setOrderDetails(values => ({ ...values, [name]: value }))
    }


    function sumarCantidad() {
        let cantidadActual = quantity.cantidad;
        cantidadActual += 1;
        setQuantity(values => ({ ...values, ['cantidad']: cantidadActual }))
    }


    const restarCantidad = () => {
        let cantidadActual = quantity.cantidad;
        if (cantidadActual === 1) {
            // Do something
        }
        else {
            cantidadActual -= 1;
            setQuantity(values => ({ ...values, ['cantidad']: cantidadActual }))
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
                                </div>
                                <div className='container' style={{ textAlign: "left" }}>
                                    <button href='#formContent' className='btn row' style={{ marginRight: 10, color: "white", backgroundColor: "#E94E1B", borderColor: "#E94E1B" }} onClick={() => { methodBuyProduct(listProducto.id); }}>Comprar</button>
                                    <MdOutlineFavorite style={{ marginRight: 10, fontSize: 32 }} className='btnFav' onClick={() => { methodAddWishlist(listProducto.id); }} ></MdOutlineFavorite>
                                    <MdAddShoppingCart style={{ marginRight: 10, fontSize: 32 }} className='btnFav' onClick={() => { methodAddCarshop(listProducto.id); }} ></MdAddShoppingCart>
                                    <ToastContainer></ToastContainer>
                                    <br></br>
                                </div>
                                <div>
                                    <ChildProductDetails datas={productDetails} />
                                </div>
                                <br></br>

                                <div>

                                    <Form.Label style={{ width: "auto", textAlign: 'center', color: "#EB5929", fontWeight: "bold", fontSize: "18px" }} type="text" name="quantity"> Seleccionar Cantidad </Form.Label>
                                    <br></br>
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Menos</Tooltip>}>
                                        {({ ref, ...triggerHandler }) => (
                                            <div variant="light" {...triggerHandler} className="d-inline-flex align-items-center">
                                                <span ref={ref} className="ms-1"><MdRemove style={{ marginRight: "10px", fontSize: 25 }} className='btnFav' onClick={() => { restarCantidad() }}></MdRemove></span>
                                            </div>
                                        )}
                                    </OverlayTrigger>

                                    <Form.Label style={{ backgroundColor: "#DFDFDF", width: "35px", textAlign: 'center' }} required type="text" name="quantity"> {quantity.cantidad}</Form.Label>

                                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Más</Tooltip>}>
                                        {({ ref, ...triggerHandler }) => (
                                            <div variant="light" {...triggerHandler} className="d-inline-flex align-items-center">
                                                <span ref={ref} className="ms-1"><MdAdd style={{ marginRight: "10px", fontSize: 25 }} className='btnFav' onClick={() => { sumarCantidad() }}></MdAdd></span>
                                            </div>
                                        )}
                                    </OverlayTrigger>

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

        
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Hola </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: "19px" }}>¡Por favor! selecciona los detalles de tu producto.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>

                </Modal.Footer>
            </Modal>

            <Footer></Footer>
        </>
    )
}


const ChildProductDetails = (datas) => {

    const [detailsSelected, setDetailsSelected] = useState([]);


    var arrDatas = datas['datas'];
    var size = arrDatas.length;


    React.useEffect(() => {
        setDetailsSelected({
            size: "",
            color: "",
            flavor: "",
            other_details: ""
        });
    }, [setDetailsSelected])



    if (size === 0) {
        opcion = 0;
        return (<div></div>)
    } else {
        /*
          * Options: 
            * color & size: Some product, such as clothing, lingerie for example.
            * color: Some product without size.
            * flavor: Any product, containing liquid.
            * size: Some product, such as vibrators for example.
        */

        var dato = arrDatas[0];
        var dataFlavor = dato.flavor;
        var dataColor = dato.color;
        var dataSize = dato.size;


        function handleChange(evt) {
            let name = evt.target.name;
            let value = evt.target.value;
            jsonProductDetailList[name] = value;
            setDetailsSelected(values => ({ ...values, [name]: value }))
        }


        // Only color
        if (dataFlavor === "" && dataSize === "" && dataColor !== "") {
            opcion = 1;
            var arrColor = fillArrays(arrDatas, 1);

            return (
                <div>
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>Seleccionar Color</span>
                    <Form.Select aria-label="Select" id='selectColor' name="color" onChange={handleChange} value={detailsSelected.color}>
                        <option value="" disabled>Seleccionar</option>
                        {arrColor.map((c, index) => (
                            <option key={index} value={c}> {c}</option>
                        ))}
                    </Form.Select>
                </div>
            )
        } else {
            // Only size
            if (dataFlavor === "" && dataColor === "" && dataSize !== "") {
                opcion = 2;
                var arrSize = fillArrays(arrDatas, 2);

                return (
                    <div className='col-md-7'>
                        <span style={{ fontWeight: "bold", fontSize: "18px" }}>Seleccionar tamaño</span>
                        <Form.Select aria-label="Select" id='selectSize' name="size" onChange={handleChange} value={detailsSelected.size}>
                            <option value="" disabled>Seleccionar</option>
                            {arrSize.map((s, index) => (
                                <option key={index} value={s}> {s}</option>
                            ))}
                        </Form.Select>
                    </div>
                )
            } else {
                // Only Flavor
                if (dataColor === "" && dataSize === "" && dataFlavor !== "") {
                    opcion = 3;
                    var arrFlavor = fillArrays(arrDatas, 3);
                    return (
                        <div className='col-md-7'>
                            <span style={{ fontWeight: "bold", fontSize: "18px" }}>Seleccionar Sabor</span>
                            <Form.Select aria-label="Select" id='selectFlavor' name="flavor" onChange={handleChange} value={detailsSelected.flavor}>
                                <option value="" disabled>Seleccionar</option>
                                {arrFlavor.map((f, index) => (
                                    <option key={index} value={f}> {f}</option>
                                ))}
                            </Form.Select>
                        </div>
                    )
                }
                else {
                    // Color & size
                    if (dataFlavor === "" && dataColor !== "" && dataSize !== "") {
                        opcion = 4;
                        var datasFilled = fillArrays(arrDatas, 4);
                        var arrSize = datasFilled[0];
                        var arrColor = datasFilled[1];

                        return (
                            <div className='col-md-7'>

                                <span style={{ fontWeight: "bold", fontSize: "18px" }}>Seleccionar Color</span>
                                <Form.Select required as="select" aria-label="Select" id='selectColor' name="color" onChange={handleChange} value={detailsSelected.color}>
                                    <option value="" disabled>Seleccionar</option>
                                    {arrColor.map((c, index) => (
                                        <option key={index} value={c} name="color"> {c} </option>
                                    ))}
                                </Form.Select>
                                <br></br>
                                <span style={{ fontWeight: "bold", fontSize: "18px" }}>Seleccionar Talla</span>
                                <Form.Select required as="select" aria-label="Select" id='selectSize' name="size" onChange={handleChange} value={detailsSelected.size}>
                                    <option value="" disabled>Seleccionar</option>
                                    {arrSize.map((s, index) => (
                                        <option key={index} value={s}> {s} </option>
                                    ))}
                                </Form.Select>
                            </div>
                        )
                    }

                    // nulll
                    if (dataFlavor === "" && dataColor === "" && dataSize === "") {
                        opcion = 0;
                        return (<div></div>)
                    }
                }
            }
        }
    }


    // fill arrays with NOT null values.
    function fillArrays(datosFill, option) {
        var arrColors = [];
        var arrSizes = [];
        var arrFlavors = [];
        var arrdatasReturn = [];


        switch (option) {
            // color
            case 1:
                Object.entries(datosFill).forEach(([key, value]) => {
                    if (value.color === "" || value.color === undefined) {
                        // Do something
                    }
                    else {
                        arrColors.push(value.color);
                    }
                })
                return arrColors;

            // size
            case 2:
                Object.entries(datosFill).forEach(([key, value]) => {
                    if (value.size === "" || value.size === undefined) {
                        // Do something
                    }
                    else {
                        arrSizes.push(value.size);
                    }
                })
                return arrSizes;

            // flavor
            case 3:
                Object.entries(datosFill).forEach(([key, value]) => {
                    if (value.flavor === "" || value.flavor === undefined) {
                        // Do something
                    }
                    else {
                        arrFlavors.push(value.flavor);
                    }
                })
                return arrFlavors;


            // Color & size
            case 4:
                Object.entries(datosFill).forEach(([key, value]) => {
                    if (value.size === "" || value.size === undefined) {
                        // Do something
                    }
                    else {
                        arrSizes.push(value.size);
                    }
                    if (value.color === "" || value.color === undefined) {
                        // Do something
                    }
                    else {
                        arrColors.push(value.color);
                    }
                });

                arrdatasReturn.push(arrSizes);
                arrdatasReturn.push(arrColors);
                return arrdatasReturn;
        }
    }
}

export default ProductoEspecifico;