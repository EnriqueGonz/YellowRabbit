import React, { useState, useEffect } from 'react';
import imgblog from '../images/Blog.png';
import imgdefault2 from '../images/imgDefaultLoad2.png';
import imgdefault1 from '../images/imgDefaultLoad1.png';
import { Tab, Tabs, Form, Row, Button, Col } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
//import axios from 'axios';
import Appbar from './AdminAppbar';
import axios from 'axios';
import '../config';
import validator from 'validator';



var baseUrl = global.config.yellow.rabbit.url;
var token = localStorage.getItem('tokenAdmin');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const AdminProductosAgregar = () => {
    const [listCategoria, setlistCategoria] = useState([]);
    const [selectedFile, setSelectedFile] = useState()
    const [preview1, setPreview1] = useState()
    const [preview2, setPreview2] = useState()
    const [preview3, setPreview3] = useState()
    const [preview4, setPreview4] = useState()

    const [inputs, setInputs] = useState({
        nombre: "",
        descripcionCorta: "",
        descripcionLarga: "",
        existencias: "",
        precio: "",

        category: "",
    })

    // Error Message
    const [showErrProductName, setShowErrProductName] = useState(false);
    const [showErrPrice, setShowErrPrice] = useState(false);
    const [showErrAmount, setShowErrAmount] = useState(false);
    const [showErrDescription, setShowErrDescription] = useState(false);
    const [showErrShortDesc, setShowErrShortDesc] = useState(false);
    const [showErrCategory, setShowErrCategory] = useState(false);

    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        //console.log(name + value)
        setInputs(values => ({ ...values, [name]: value }))
    }

    useEffect(() => {
        try {
            axios.post(baseUrl + '/categories/api/all-categories/', {
                category_name: "",
            })
                .then((response) => {
                    console.log(response);
                    setlistCategoria(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setlistCategoria])

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files)

    }


    function showas() {
        console.log(selectedFile)

        if (selectedFile.length === 1) {
            const objectUrl1 = URL.createObjectURL(selectedFile[0])
            setPreview1(objectUrl1)
            setPreview2("")
            setPreview3("")
            setPreview4("")

            document.getElementById('img1').style.display = "none"
            document.getElementById('img2').style.display = "block"
            document.getElementById('img3').style.display = "block"
            document.getElementById('img4').style.display = "block"
        }
        if (selectedFile.length === 2) {
            const objectUrl1 = URL.createObjectURL(selectedFile[0])
            setPreview1(objectUrl1)

            const objectUrl2 = URL.createObjectURL(selectedFile[1])
            setPreview2(objectUrl2)

            setPreview3("")
            setPreview4("")

            document.getElementById('img1').style.display = "none"
            document.getElementById('img2').style.display = "none"
            document.getElementById('img3').style.display = "block"
            document.getElementById('img4').style.display = "block"
        }
        if (selectedFile.length === 3) {
            const objectUrl1 = URL.createObjectURL(selectedFile[0])
            setPreview1(objectUrl1)

            const objectUrl2 = URL.createObjectURL(selectedFile[1])
            setPreview2(objectUrl2)

            const objectUrl3 = URL.createObjectURL(selectedFile[2])
            setPreview3(objectUrl3)


            setPreview4("")

            document.getElementById('img1').style.display = "none"
            document.getElementById('img2').style.display = "none"
            document.getElementById('img3').style.display = "none"
            document.getElementById('img4').style.display = "block"
        }

        if (selectedFile.length === 4) {
            const objectUrl1 = URL.createObjectURL(selectedFile[0])
            setPreview1(objectUrl1)

            const objectUrl2 = URL.createObjectURL(selectedFile[1])
            setPreview2(objectUrl2)

            const objectUrl3 = URL.createObjectURL(selectedFile[2])
            setPreview3(objectUrl3)

            const objectUrl4 = URL.createObjectURL(selectedFile[3])
            setPreview4(objectUrl4)

            document.getElementById('img1').style.display = "none"
            document.getElementById('img2').style.display = "none"
            document.getElementById('img3').style.display = "none"
            document.getElementById('img4').style.display = "none"
        }
        if (selectedFile.length > 4) {
            const objectUrl1 = URL.createObjectURL(selectedFile[0])
            setPreview1(objectUrl1)

            const objectUrl2 = URL.createObjectURL(selectedFile[1])
            setPreview2(objectUrl2)

            const objectUrl3 = URL.createObjectURL(selectedFile[2])
            setPreview3(objectUrl3)

            const objectUrl4 = URL.createObjectURL(selectedFile[3])
            setPreview4(objectUrl4)

            document.getElementById('img1').style.display = "none"
            document.getElementById('img2').style.display = "none"
            document.getElementById('img3').style.display = "none"
            document.getElementById('img4').style.display = "none"

        }
    }

    const handleSubmitCategoria = (event) => {
        console.log('ok')
        axios.post(baseUrl + '/categories/api/register/', {
            category_name: inputs.category,
        }, { headers })
            .then((response) => {
                //console.log(response);
                loadCategories();
                inputs.category = ""

            })
            .catch((error) => {
                console.log(error);
            });
    }

    function loadCategories() {
        axios.post(baseUrl + '/categories/api/all-categories/', {
            category_name: "",
        }, { headers })
            .then((response) => {
                //console.log(response);
                setlistCategoria(response.data)

            })
            .catch((error) => {
                console.log(error);
            });

    }

    function setFalseErrors() {
        setShowErrProductName(false);
        setShowErrPrice(false);
        setShowErrAmount(false);
        setShowErrDescription(false);
        setShowErrShortDesc(false);
        setShowErrCategory(false);
    }

    function validateInputs() {
        setFalseErrors();
        let productName = inputs.nombre;
        let productPrice = inputs.precio;
        let productAmount = inputs.existencias;
        let productDescription = inputs.descripcionLarga;
        let productShortDesc = inputs.descripcionCorta;
        let productCategory = document.getElementById('selectCategoria').value;
        let fieldsValid = true;

        // validate
        if (validator.isEmpty(productName)) {
            setShowErrProductName(true);
            fieldsValid = false
        }

        if (validator.isEmpty(productPrice)) {
            setShowErrPrice(true);
            fieldsValid = false
        }

        if (validator.isEmpty(productAmount)) {
            setShowErrAmount(true);
            fieldsValid = false
        }

        if (validator.isEmpty(productDescription)) {
            setShowErrDescription(true);
            fieldsValid = false
        }

        if (validator.isEmpty(productShortDesc)) {
            setShowErrShortDesc(true);
            fieldsValid = false
        }
        if (validator.isEmpty(productCategory)) {
            setShowErrCategory(true);
            fieldsValid = false
        }

        return fieldsValid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateInputs() === true) {
            if (selectedFile === undefined) {
                document.getElementById('errorimg').style.color = "red"
            } else if (selectedFile.length === 4) {
                document.getElementById('errorimg').style.color = "black"
                if (document.getElementById('selectCategoria').value === "") {
                    document.getElementById('errorcategoria').style.color = "red"
                } else {
                    document.getElementById('errorcategoria').style.color = "black"
                    let formData = new FormData();
                    formData.append('categories', document.getElementById('selectCategoria').value)
                    formData.append('product_name', inputs.nombre)
                    formData.append('price', inputs.precio)
                    formData.append('amount', inputs.existencias)
                    formData.append('unit_of_existence', inputs.existencias)
                    formData.append('quantities_sold', 0)
                    formData.append('description', inputs.descripcionLarga)
                    formData.append('short_description', inputs.descripcionCorta)
                    formData.append('image_one', selectedFile[0])
                    formData.append('image_two', selectedFile[1])
                    formData.append('image_three', selectedFile[2])
                    formData.append('image_four', selectedFile[3])

                    axios.post(baseUrl + '/products/api/register/',
                        formData
                        , { headers })
                        .then((response) => {
                            console.log(response);
                            setFalseErrors();
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            } else {
                document.getElementById('errorimg').style.color = "red"
            }

        } else {
            console.log('XXXXXXXXXXXXXXXX')
        }
    }

    /* Messages */
    const MsgProductName = () => (
        <div style={{ marginTop: "1%" }}>
            <span style={{ color: "#FF5733" }}>Por favor, ingrese el nombre del producto.</span>
        </div>
    )

    const MsgShortDescription = () => (
        <div style={{ marginTop: "1%" }}>
            <span style={{ color: "#FF5733" }}>Por favor, ingrese una descripción corta.</span>
        </div>
    )

    const MsgCategory = () => (
        <div style={{ marginTop: "1%" }}>
            <span style={{ color: "#FF5733" }}>Por favor, seleccione una categoria.</span>
        </div>
    )

    const MsgDescription = () => (
        <div style={{ marginTop: "1%" }}>
            <span style={{ color: "#FF5733" }}>Por favor, ingrese la descripción.</span>
        </div>
    )

    const MsgQuantity = () => (
        <div style={{ marginTop: "1%" }}>
            <span style={{ color: "#FF5733" }}>Por favor, ingrese la cantidad en existencia.</span>
        </div>
    )

    const MsgPrice = () => (
        <div style={{ marginTop: "1%" }}>
            <span style={{ color: "#FF5733" }}>Por favor, ingrese el precio.</span>
        </div>
    )



    function methodEliminarCategoria() {

        var checkboxes = document.getElementsByName('foo');
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            if (checkboxes[i].checked === true) {
                console.log(checkboxes[i].checked)
                console.log(checkboxes[i].value);
                axios.delete(baseUrl + '/categories/api/delete/' + checkboxes[i].value + '/', { headers })
                    .then((response) => {
                        //console.log(response)
                        loadCategories();

                    })
                    .catch((error) => {
                    });

            }
        }


    }

    return (
        <>
            <Appbar></Appbar>
            
            <Carousel>
                <Carousel.Item className='contenedor'>
                    <img alt='' src={imgblog} style={{ width: "100%" }} />
                    <div className="possText2Img1">
                        <p style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: "bold", color: "white", fontSize: 65 }}>Contactanos</p>
                    </div>
                </Carousel.Item>
            </Carousel>


            <div className='container' style={{ paddingTop: 30 }}>
                <Tabs defaultActiveKey="addproducto" id="uncontrolled-tab-example">
                    <Tab eventKey="addproducto" title="Añadir producto">
                        <div className=''>
                            <hr />
                            <h4>Añadir producto</h4>

                            <div className='row'>
                                <div className='col'>
                                    <div className='col' style={{ marginBottom: 10, position: "relative" }}>
                                        <div className='row' style={{ marginBottom: 10 }}>
                                            <p id="errorimg">Selecciona 4 imagenes *</p>
                                            <div className='col'><input type="file" multiple onChange={handleFileSelect} /></div>
                                            <div className='col'><button style={{ float: "right", color: "white", backgroundColor: "#E94E1B", borderColor: "#E94E1B" }} className='btn' onClick={() => { showas() }}>Preview</button></div>

                                        </div>
                                        <img alt='' id="img1" src={imgdefault1} style={{ width: "100%" }} />
                                        <img alt='' src={preview1} style={{ width: "100%" }} />
                                    </div>
                                    <div className='col'>
                                        <div className='row'>
                                            <div className='col' style={{ marginBottom: 10, position: "relative" }}>
                                                <img alt='' id="img2" src={imgdefault2} style={{ width: "100%" }} />
                                                <img alt='' src={preview2} style={{ width: "100%" }} />
                                            </div>
                                            <div className='col'>
                                                <img alt='' id='img3' src={imgdefault2} style={{ width: "100%" }} />
                                                <img alt='' src={preview3} style={{ width: "100%" }} />
                                            </div>
                                            <div className='col'>
                                                <img alt='' id='img4' src={imgdefault2} style={{ width: "100%" }} />
                                                <img alt='' src={preview4} style={{ width: "100%" }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <Form>
                                        <Row className="mb-3">
                                            <Form.Group controlId="validationCustom03">
                                                <Form.Label>Nombre del producto</Form.Label>
                                                <Form.Control placeholder='nombre del producto' required type="text" name="nombre" value={inputs.nombre} onChange={handleChange} />
                                                {showErrProductName ? <MsgProductName /> : null}
                                            </Form.Group>

                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group>
                                                <Form.Label>Descripcion corta</Form.Label>
                                                <Form.Control placeholder='Descripcion corta' required type="text" name="descripcionCorta" value={inputs.descripcionCorta} onChange={handleChange} />
                                                {showErrShortDesc ? <MsgShortDescription /> : null}
                                            </Form.Group>

                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group>
                                                <Form.Label id="errorcategoria">Selecciona categoria</Form.Label>
                                                <Form.Select id='selectCategoria' required>
                                                    <option value="">Selecciona categoria</option>
                                                    {listCategoria.map((item, index) => (
                                                        <option key={index} value={item.id} >{item.category_name}</option>
                                                    ))}
                                                </Form.Select>
                                                {showErrCategory ? <MsgCategory /> : null}
                                            </Form.Group>

                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group>
                                                <Form.Label>Descripcion detallada</Form.Label>
                                                <Form.Control placeholder='Descripcion detallada' as={"textarea"} required type="text" name="descripcionLarga" value={inputs.descripcionLarga} onChange={handleChange} />
                                                {showErrDescription ? <MsgDescription /> : null}
                                            </Form.Group>

                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col}>
                                                <Form.Label>Existencias</Form.Label>
                                                <Form.Control placeholder='Existencias' min={1} required type="number" name="existencias" value={inputs.existencias} onChange={handleChange} />
                                                {showErrAmount ? <MsgQuantity /> : null}
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Label>Precio</Form.Label>
                                                <Form.Control placeholder='Precio' min={1} required type="number" name="precio" value={inputs.precio} onChange={handleChange} />
                                                {showErrPrice ? <MsgPrice /> : null}
                                            </Form.Group>


                                        </Row>
                                        <Button style={{ marginLeft: 10, float: "right", backgroundColor: "#E94E1B", borderColor: "#E94E1B" }} onClick={handleSubmit}>
                                            Registrar
                                        </Button>

                                    </Form>

                                </div>

                            </div>

                            <hr />

                        </div>


                    </Tab>
                    <Tab eventKey="addcategoria" title="Añadir categoria">
                        <div>
                            <hr />
                            <h4>Categorias</h4>

                            <div>
                                <div className='row'>
                                    <div className='col-12 col-sm-6'>
                                        <span>Lista de categorias</span>

                                        <div style={{ padding: 30, backgroundColor: "#DFDFDF" }}>
                                            {listCategoria.map((item, index) => (
                                                <div key={index} className="form-check">
                                                    <input className="form-check-input" type="checkbox" value={item.id} name='foo' />
                                                    <label className="form-check-label" htmlFor="flexCheckChecked">
                                                        {item.category_name}
                                                    </label>
                                                </div>
                                            ))}

                                            <div className='container' style={{ textAlign: "end" }}>
                                                <Button style={{ backgroundColor: "#404345", borderColor: "#404345" }} onClick={() => { methodEliminarCategoria() }} >
                                                    Eliminar
                                                </Button>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 col-sm-6' >
                                        <span>Agregar nueva categoria</span>
                                        <div style={{ border: "solid", borderColor: "#EB5929", padding: 30 }}>
                                            <Form>
                                                <Row className="mb-3">
                                                    <Form.Group>
                                                        <Form.Label>Nombre de la categoria</Form.Label>
                                                        <Form.Control placeholder='Nombre de la categoria' required type="text" name="category" value={inputs.category} onChange={handleChange} />
                                                    </Form.Group>

                                                    <div className='container' style={{ textAlign: "center" }}>
                                                        <Button style={{ marginTop: 25, width: "100%", backgroundColor: "#E94E1B", borderColor: "#E94E1B" }} onClick={handleSubmitCategoria} >
                                                            Registrar
                                                        </Button>
                                                    </div>
                                                </Row>

                                            </Form>

                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>

                    </Tab>
                </Tabs>

            </div>



            <footer style={{ backgroundColor: "#EB5929" }}>
                <div className="navbar navbar-expand-lg navbar-light" style={{ justifyContent: "space-around" }}>
                    <div style={{ textAlign: "center" }}>
                        <p style={{ color: "white", margin: 5 }}>@2021 Yellow Rabbit - Todos los derechos reservados</p>
                    </div>
                </div>
            </footer>
        </>
    )

}
export default AdminProductosAgregar;