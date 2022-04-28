import React, { useState, useEffect } from 'react';
import { Form, Row, Button, Col } from 'react-bootstrap';
import axios from 'axios';
import '../config';
import validator from 'validator';
import { useParams } from 'react-router-dom';
import Appbar from './AdminAppbar';
import Footer from './footer';


var baseUrl = global.config.yellow.rabbit.url;
var token = localStorage.getItem('tokenAdmin');
var categoriaName = "";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const UpdateProducts = () => {
    var { idproduct, idcategoria } = useParams(); // params
    const [listCategoria, setlistCategoria] = useState([]);
    const [listProduct, setlistProduct] = useState([]);

    const [selectedFile1, setSelectedFile1] = useState()
    const [selectedFile2, setSelectedFile2] = useState()
    const [selectedFile3, setSelectedFile3] = useState()
    const [selectedFile4, setSelectedFile4] = useState()

    const [preview1, setPreview1] = useState()
    const [preview2, setPreview2] = useState()
    const [preview3, setPreview3] = useState()
    const [preview4, setPreview4] = useState()

    const [inputs, setInputs] = useState({
        product_name: "",
        short_description: "",
        description: "",
        amount: "",
        price: "",
        categories_id: "",
        peso: "",
        dimensions_length: "",
        dimensions_width: "",
        dimensions_height: "",
        quantities_sold: "",
    })


    // Erros
    const [showErrors, setShowErrors] = useState({
        errProductName: false,
        errPrice: false,
        errAmount: false,
        errDescription: false,
        errShortDesc: false,
        errPeso: false,
        errDimensionsL: false,
        errDimensionsW: false,
        errDimensionsH: false,
    });


    /* Messages */
<<<<<<< HEAD
    const [warnings] = useState({
=======
    const [warnings, setWarnings] = useState({
>>>>>>> 99d6619918d3b76249be676eb8b24b48d139332b
        msgProductName: "Ingrese el nombre del producto.",
        msgShortDescription: "Especifique los detalles.",
        msgDescription: "Ingrese la descripción.",
        msgAmount: "Ingrese la cantidad en existencia.",
        msgPrice: "Ingrese el precio.",
        msgPeso: "Ingrese el peso.",
        msgDimensionsLength: "Ingrese la dimensión del producto (Largo).",
        msgDimensionsWidth: "Ingrese la dimensión del producto (Ancho).",
        msgDimensionsHeight: "Ingrese la dimensión del producto (Alto).",
    })


    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    useEffect(() => {
        try {
            axios.post(baseUrl + '/categories/api/all-categories/', {
                category_name: "",
            })
                .then((response) => {
                    setlistCategoria(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setlistCategoria])

    useEffect(() => {
        try {
            axios.get(baseUrl + '/products/api/specific-product/' + idproduct + '/')
                .then((response) => {
                    setInputs(response.data[0][0])
                    setlistProduct(response.data[0][0])
                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setInputs], [setlistProduct])



    const handleFileSelect1 = (event) => {
        setSelectedFile1(event.target.files[0])
    }
    const handleFileSelect2 = (event) => {
        setSelectedFile2(event.target.files[0])
    }
    const handleFileSelect3 = (event) => {
        setSelectedFile3(event.target.files[0])
    }
    const handleFileSelect4 = (event) => {
        setSelectedFile4(event.target.files[0])
    }


    function showPreview() {
        try {
            const objectUrl1 = URL.createObjectURL(selectedFile1)
            setPreview1(objectUrl1)
            document.getElementById('img1').style.display = "none"
        } catch (error) {
            
        }
        try {

            const objectUrl2 = URL.createObjectURL(selectedFile2)
            setPreview2(objectUrl2)
            document.getElementById('img2').style.display = "none"
        } catch (error) {
            
        }
        try {
            const objectUrl3 = URL.createObjectURL(selectedFile3)
            setPreview3(objectUrl3)
            document.getElementById('img3').style.display = "none"
        } catch (error) {
            
        }
        try {
            const objectUrl4 = URL.createObjectURL(selectedFile4)
            setPreview4(objectUrl4)
            document.getElementById('img4').style.display = "none"
        } catch (error) {
            
        }
    }

    function setFalseErrors() {
        setShowErrors(values => ({ ...values, "errProductName": false }));
        setShowErrors(values => ({ ...values, "errPrice": false }));
        setShowErrors(values => ({ ...values, "errAmount": false }));
        setShowErrors(values => ({ ...values, "errDescription": false }));
        setShowErrors(values => ({ ...values, "errShortDesc": false }));
        setShowErrors(values => ({ ...values, "errPeso": false }));
        setShowErrors(values => ({ ...values, "errDimensionsL": false }));
        setShowErrors(values => ({ ...values, "errDimensionsW": false }));
        setShowErrors(values => ({ ...values, "errDimensionsH": false }));
    }

    function validateInputs() {
        setFalseErrors();

        let productPrice = inputs.price;
        let productAmount = inputs.amount;
        let productDescription = inputs.description;
        let productShortDesc = inputs.short_description;
        let productPeso = inputs.peso;
        let dimensionsLength = inputs.dimensions_length;
        let dimensionsWidth = inputs.dimensions_width;
        let dimensionsHeight = inputs.dimensions_height;
        let fieldsValid = true;


        // validate
        try {
            if (validator.isEmpty(inputs.product_name)) {
<<<<<<< HEAD
                setShowErrors(values => ({ ...values, "errProductName": true }));
=======
                setShowErrors(values => ({ ...values, ['errProductName']: true }));
>>>>>>> 99d6619918d3b76249be676eb8b24b48d139332b
                fieldsValid = false;
            }
        } catch (error) {
            fieldsValid = false;
<<<<<<< HEAD
            setShowErrors(values => ({ ...values, "errProductName": true }));
=======
            setShowErrors(values => ({ ...values, ['errProductName']: true }));
>>>>>>> 99d6619918d3b76249be676eb8b24b48d139332b
        }

        try {
            if (validator.isEmpty(productPrice)) {
<<<<<<< HEAD
                setShowErrors(values => ({ ...values, "errPrice": true }));
                fieldsValid = false;
            }
        } catch (error) {
            setShowErrors(values => ({ ...values, "errPrice": true }));
=======
                setShowErrors(values => ({ ...values, ['errPrice']: true }));
                fieldsValid = false;
            }
        } catch (error) {
            setShowErrors(values => ({ ...values, ['errPrice']: true }));
>>>>>>> 99d6619918d3b76249be676eb8b24b48d139332b
            fieldsValid = false;
        }

        try {
            if (validator.isEmpty(productDescription)) {
<<<<<<< HEAD
                setShowErrors(values => ({ ...values, "errDescription": true }));
                fieldsValid = false;
            }
        } catch (error) {
            setShowErrors(values => ({ ...values, "errDescription": true }));
=======
                setShowErrors(values => ({ ...values, ['errDescription']: true }));
                fieldsValid = false;
            }
        } catch (error) {
            setShowErrors(values => ({ ...values, ['errDescription']: true }));
>>>>>>> 99d6619918d3b76249be676eb8b24b48d139332b
            fieldsValid = false;
        }

        try {
            if (validator.isEmpty(productShortDesc)) {
<<<<<<< HEAD
                setShowErrors(values => ({ ...values, "errShortDesc": true }));
                fieldsValid = false;
            }
        } catch (error) {
            setShowErrors(values => ({ ...values, "errShortDesc": true }));
=======
                setShowErrors(values => ({ ...values, ['errShortDesc']: true }));
                fieldsValid = false;
            }
        } catch (error) {
            setShowErrors(values => ({ ...values, ['errShortDesc']: true }));
>>>>>>> 99d6619918d3b76249be676eb8b24b48d139332b
            fieldsValid = false;
        }
        try {
            if (validator.isEmpty(productAmount.toString())) {
<<<<<<< HEAD
                setShowErrors(values => ({ ...values, "errAmount": true }));
                fieldsValid = false;
            }
        } catch (error) {
            setShowErrors(values => ({ ...values, "errAmount": true }));
=======
                setShowErrors(values => ({ ...values, ['errAmount']: true }));
                fieldsValid = false;
            }
        } catch (error) {
            setShowErrors(values => ({ ...values, ['errAmount']: true }));
>>>>>>> 99d6619918d3b76249be676eb8b24b48d139332b
            fieldsValid = false;
        }

        try {
            if (validator.isEmpty(productPeso)) {
<<<<<<< HEAD
                setShowErrors(values => ({ ...values, "errPeso": true }));
                fieldsValid = false;
            }
        } catch (error) {
            setShowErrors(values => ({ ...values, "errPeso": true }));
=======
                setShowErrors(values => ({ ...values, ['errPeso']: true }));
                fieldsValid = false;
            }
        } catch (error) {
            setShowErrors(values => ({ ...values, ['errPeso']: true }));
>>>>>>> 99d6619918d3b76249be676eb8b24b48d139332b
            fieldsValid = false;
        }

        try {
            if (validator.isEmpty(dimensionsLength)) {
<<<<<<< HEAD
                setShowErrors(values => ({ ...values, "errDimensionsL": true }));
                fieldsValid = false;
            }
        } catch (error) {
            setShowErrors(values => ({ ...values, "errDimensionsL": true }));
=======
                setShowErrors(values => ({ ...values, ['errDimensionsL']: true }));
                fieldsValid = false;
            }
        } catch (error) {
            setShowErrors(values => ({ ...values, ['errDimensionsL']: true }));
>>>>>>> 99d6619918d3b76249be676eb8b24b48d139332b
            fieldsValid = false;
        }
        try {
            if (validator.isEmpty(dimensionsWidth)) {
<<<<<<< HEAD
                setShowErrors(values => ({ ...values, "errDimensionsW": true }));
                fieldsValid = false;
            }
        } catch (error) {
            setShowErrors(values => ({ ...values, "errDimensionsW": true }));
=======
                setShowErrors(values => ({ ...values, ['errDimensionsW']: true }));
                fieldsValid = false;
            }
        } catch (error) {
            setShowErrors(values => ({ ...values, ['errDimensionsW']: true }));
>>>>>>> 99d6619918d3b76249be676eb8b24b48d139332b
            fieldsValid = false;
        }
        try {
            if (validator.isEmpty(dimensionsHeight)) {
<<<<<<< HEAD
                setShowErrors(values => ({ ...values, "errDimensionsH": true }));
=======
                setShowErrors(values => ({ ...values, ['errDimensionsH']: true }));
>>>>>>> 99d6619918d3b76249be676eb8b24b48d139332b
                fieldsValid = false;
            }
        }
        catch (error) {
<<<<<<< HEAD
            setShowErrors(values => ({ ...values, "errDimensionsH": true }));
=======
            setShowErrors(values => ({ ...values, ['errDimensionsH']: true }));
>>>>>>> 99d6619918d3b76249be676eb8b24b48d139332b
            fieldsValid = false;
        }

        return fieldsValid;
    }


    const handleSubmit = (event) => {
<<<<<<< HEAD
=======
        console.log("categoria:" + document.getElementById('categorySelected').value);
>>>>>>> 99d6619918d3b76249be676eb8b24b48d139332b
        event.preventDefault();

        if (validateInputs() === true) {
            let formData = new FormData();
            formData.append('categories', document.getElementById('categorySelected').value)
            formData.append('product_name', inputs.product_name)
            formData.append('price', inputs.price)
            formData.append('amount', inputs.amount)
            formData.append('unit_of_existence', inputs.amount)
            formData.append('quantities_sold', parseInt(inputs.quantities_sold))
            formData.append('description', inputs.description)
            formData.append('short_description', inputs.short_description)
            formData.append('peso', inputs.peso)
            formData.append('dimensions_length', inputs.dimensions_length)
            formData.append('dimensions_width', inputs.dimensions_width)
            formData.append('dimensions_height', inputs.dimensions_height)
            formData.append('image_one', selectedFile1)
            formData.append('image_two', selectedFile2)
            formData.append('image_three', selectedFile3)
            formData.append('image_four', selectedFile4)

            axios.put(baseUrl + '/products/api/update/' + idproduct + '/',
                formData
                , { headers })
                .then((response) => {
                    console.log('Updated: ', response);
                    setFalseErrors();
                })
                .catch(err => {
                    console.log(err);
                });

        } else {
            console.log('Validate false');
        }
    }



    listCategoria.map((item) => (
        (item.id === parseInt(idcategoria))
            ? categoriaName = item.category_name
            : <></>
    ))


    return (
        <>
            <Appbar></Appbar>
            <div className='container' style={{ paddingTop: 30 }}>
                <div className=''>
                    <h4>Editar productos</h4>
                    <hr />
                    <div className='row'>
                        <div className='col-12 col-md-6' style={{ textAlign: "center" }}>
                            <div className='col' style={{ marginBottom: 10, position: "relative" }}>
                                <div className='row' style={{ marginBottom: 10, maxWidth: "100%" }}>
<<<<<<< HEAD
                                    <Col><input type="file" onChange={handleFileSelect1} style={{ position: "absolute", top: "45%" }} /></Col>
                                    <Col style={{ textAlign: "right" }}><div className='col'><button style={{ color: "white", backgroundColor: "#E94E1B", borderColor: "#E94E1B" }} className='btn' onClick={() => { showPreview() }}>Preview</button></div></Col>
=======
                                    <Col><input type="file" onChange={handleFileSelect1} style={{ position: "absolute", top: "50%" }} /></Col>
                                    <Col style={{ textAlign: "right" }}><div className='col'><button style={{ color: "white", backgroundColor: "#E94E1B", borderColor: "#E94E1B" }} className='btn' onClick={() => { showas() }}>Preview</button></div></Col>
>>>>>>> 99d6619918d3b76249be676eb8b24b48d139332b
                                </div>
                                <img alt='' id="img1" src={'https://yellowrabbitbucket.s3.amazonaws.com/' + listProduct.image_one} style={{ width: "90%" }} />
                                <img alt='' src={preview1} style={{ width: "90%" }} />
                            </div>
                            <div className='col'>
                                <div className='row'>
                                    <div className='col' style={{ position: "relative" }}>
<<<<<<< HEAD
                                        <input type="file" onChange={handleFileSelect2} style={{ position: "absolute", top: "40%" }} />
=======
                                        <input type="file" onChange={handleFileSelect2} style={{ position: "absolute", top: "50%" }} />
>>>>>>> 99d6619918d3b76249be676eb8b24b48d139332b
                                        <img alt='' id="img2" src={'https://yellowrabbitbucket.s3.amazonaws.com/' + listProduct.image_two} style={{ width: "90%" }} />
                                        <img alt='' src={preview2} style={{ width: "90%" }} />
                                    </div>
                                    <div className='col' style={{ position: "relative" }}>
<<<<<<< HEAD
                                        <input type="file" onChange={handleFileSelect3} style={{ position: "absolute", top: "40%" }} />
=======
                                        <input type="file" onChange={handleFileSelect3} style={{ position: "absolute", top: "50%" }} />
>>>>>>> 99d6619918d3b76249be676eb8b24b48d139332b
                                        <img alt='' id='img3' src={'https://yellowrabbitbucket.s3.amazonaws.com/' + listProduct.image_three} style={{ width: "90%" }} />
                                        <img alt='' src={preview3} style={{ width: "90%" }} />
                                    </div>
                                    <div className='col' style={{ position: "relative" }}>
<<<<<<< HEAD
                                        <input type="file" onChange={handleFileSelect4} style={{ position: "absolute", top: "40%" }} />
=======
                                        <input type="file" onChange={handleFileSelect4} style={{ position: "absolute", top: "50%" }} />
>>>>>>> 99d6619918d3b76249be676eb8b24b48d139332b
                                        <img alt='' id='img4' src={'https://yellowrabbitbucket.s3.amazonaws.com/' + listProduct.image_four} style={{ width: "90%" }} />
                                        <img alt='' src={preview4} style={{ width: "90%" }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-6'>
                            <Form>
                                <Row className="mb-3">
                                    <Form.Group >
                                        <Form.Label>Nombre del producto</Form.Label>
                                        <Form.Control placeholder='nombre del producto' required type="text" name="product_name" style={{ backgroundColor: "#DFDFDF" }} value={inputs.product_name == null ? '' : inputs.product_name} onChange={handleChange} />
                                        <div>
                                            <span style={{ color: "#FF5733" }}>{showErrors.errProductName ? warnings.msgProductName : null}</span>
                                        </div>
                                    </Form.Group>

                                </Row>
                                <Row className="mb-3">
                                    <div className="form-group">
                                        <label htmlFor="categorySelected" style={{ paddingBottom: "5px" }}>Categoria</label>
                                        <select id='categorySelected' style={{ backgroundColor: "#DFDFDF" }} className="form-control" required>
                                            <option value={idcategoria}>{categoriaName}</option>

                                            {listCategoria.map((item, index) => (
                                                (item.id === parseInt(idcategoria))
                                                    ? null
                                                    : < option key={index} value={item.id}>{item.category_name}</option>
                                            ))}

                                        </select>
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Descripcion</Form.Label>
                                        <Form.Control placeholder='Descripcion' as={"textarea"} required type="text" name="description" style={{ backgroundColor: "#DFDFDF" }} value={inputs.description == null ? '' : inputs.description} onChange={handleChange} />
                                        <div>
                                            <span style={{ color: "#FF5733" }}>{showErrors.errDescription ? warnings.msgDescription : null}</span>
                                        </div>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Especificaciones (color, talla, sabor, etc.)</Form.Label>
                                        <Form.Control placeholder='Especificaciones' as={"textarea"} required type="text" name="short_description" style={{ backgroundColor: "#DFDFDF" }} value={inputs.short_description == null ? '' : inputs.short_description} onChange={handleChange} />
                                        <div>
                                            <span style={{ color: "#FF5733" }}>{showErrors.errShortDesc ? warnings.msgShortDescription : null}</span>
                                        </div>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Existencias</Form.Label>
                                        <Form.Control placeholder='Existencias' min={1} required type="number" name="amount" style={{ backgroundColor: "#DFDFDF" }} value={inputs.amount == null ? '' : inputs.amount} onChange={handleChange} />
                                        <div>
                                            <span style={{ color: "#FF5733" }}>{showErrors.errAmount ? warnings.msgAmount : null}</span>
                                        </div>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Precio</Form.Label>
                                        <Form.Control placeholder='Precio' min={1} required type="number" name="price" style={{ backgroundColor: "#DFDFDF" }} value={inputs.price == null ? '' : inputs.price} onChange={handleChange} />
                                        <div>
                                            <span style={{ color: "#FF5733" }}>{showErrors.errPrice ? warnings.msgPrice : null}</span>
                                        </div>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Peso</Form.Label>
                                        <Form.Control placeholder='Peso (Kg)' min={1} required type="number" name="peso" style={{ backgroundColor: "#DFDFDF" }} value={inputs.peso == null ? '' : inputs.peso} onChange={handleChange} />
                                        <div>
                                            <span style={{ color: "#FF5733" }}>{showErrors.errPeso ? warnings.msgPeso : null}</span>
                                        </div>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Alto</Form.Label>
                                        <Form.Control placeholder='Alto (cm)' min={1} required type="number" name="dimensions_height" style={{ backgroundColor: "#DFDFDF" }} value={inputs.dimensions_height == null ? '' : inputs.dimensions_height} onChange={handleChange} />
                                        <div>
                                            <span style={{ color: "#FF5733" }}>{showErrors.errDimensionsH ? warnings.msgDimensionsHeight : null}</span>
                                        </div>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Ancho</Form.Label>
                                        <Form.Control placeholder='Ancho (cm)' min={1} required type="number" name="dimensions_width" style={{ backgroundColor: "#DFDFDF" }} value={inputs.dimensions_width == null ? '' : inputs.dimensions_width} onChange={handleChange} />
                                        <div>
                                            <span style={{ color: "#FF5733" }}>{showErrors.errDimensionsW ? warnings.msgDimensionsWidth : null}</span>
                                        </div>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Largo</Form.Label>
                                        <Form.Control placeholder='Largo (cm)' min={1} required type="number" name="dimensions_length" style={{ backgroundColor: "#DFDFDF" }} value={inputs.dimensions_length == null ? '' : inputs.dimensions_length} onChange={handleChange} />
                                        <div>
                                            <span style={{ color: "#FF5733" }}>{showErrors.errDimensionsL ? warnings.msgDimensionsLength : null}</span>
                                        </div>
                                    </Form.Group>
                                </Row>

                                <Button style={{ marginLeft: 10, float: "right", backgroundColor: "#E94E1B", borderColor: "#E94E1B" }} onClick={handleSubmit}>
                                    Guardar producto
                                </Button>
                            </Form>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
            <Footer></Footer>
        </>
    )

}
export default UpdateProducts;
