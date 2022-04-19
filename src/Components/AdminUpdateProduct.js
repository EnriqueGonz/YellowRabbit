import React, { useState, useEffect } from 'react';
import imgdefault2 from '../images/imgDefaultLoad2.png';
import imgdefault1 from '../images/imgDefaultLoad1.png';
import { Form, Row, Button, Col } from 'react-bootstrap';
import axios from 'axios';
import '../config';
import validator from 'validator';



var baseUrl = global.config.yellow.rabbit.url;
var token = localStorage.getItem('tokenAdmin');
var categoriaName ="";
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};


const UpdateProducts = (parametros) => {
    const [listCategoria, setlistCategoria] = useState([]);

    const [selectedFile, setSelectedFile] = useState()
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
    })

    // Error Message
    const [showErrProductName, setShowErrProductName] = useState(false);
    const [showErrPrice, setShowErrPrice] = useState(false);
    const [showErrAmount, setShowErrAmount] = useState(false);
    const [showErrDescription, setShowErrDescription] = useState(false);
    const [showErrShortDesc, setShowErrShortDesc] = useState(false);
    const [showErrPeso, setShowErrPeso] = useState(false);
    const [showErrDimensionsL, SetShowErrDimensionsL] = useState(false);
    const [showErrDimensionsW, SetShowErrDimensionsW] = useState(false);
    const [showErrDimensionsH, SetShowErrDimensionsH] = useState(false);


    function handleChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    useEffect(() =>{  
        try {
          axios.post(baseUrl+'/categories/api/all-categories/',{
            category_name:"",
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
      },[setlistCategoria])

    useEffect(() => {
        try {
            axios.get(baseUrl + '/products/api/specific-product/' + parametros.idProducto + '/')
                .then((response) => {
                    console.log(response);
                    setInputs(response.data[0][0])
                    
                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setInputs])


    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files)

    }


    function showas() {
        console.log(selectedFile);
        try {
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
        } catch (error) {
            //
        }
    }


    function setFalseErrors() {
        setShowErrProductName(false);
        setShowErrPrice(false);
        setShowErrAmount(false);
        setShowErrDescription(false);
        setShowErrShortDesc(false);
        setShowErrPeso(false);
        SetShowErrDimensionsL(false);
        SetShowErrDimensionsW(false);
        SetShowErrDimensionsH(false);
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
                setShowErrProductName(true);
                fieldsValid = false;
            }
        } catch (error) {
            fieldsValid = false;
            setShowErrProductName(true);
        }

        try {
            if (validator.isEmpty(productPrice)) {
                setShowErrPrice(true);
                fieldsValid = false;
            }
        } catch (error) {
            setShowErrPrice(true);
            fieldsValid = false;
        }

        try {
            if (validator.isEmpty(productDescription)) {
                setShowErrDescription(true);
                fieldsValid = false;
            }
        } catch (error) {
            setShowErrDescription(true);
            fieldsValid = false;
        }

        try {
            if (validator.isEmpty(productShortDesc)) {
                setShowErrShortDesc(true);
                fieldsValid = false;
            }
        } catch (error) {
            setShowErrShortDesc(true);
            fieldsValid = false;
        }
        try {
            if (validator.isEmpty(productAmount.toString())) {
                setShowErrAmount(true);
                fieldsValid = false;
            }
        } catch (error) {
            setShowErrAmount(true);
            fieldsValid = false;
        }

        try {
            if (validator.isEmpty(productPeso)) {
                setShowErrPeso(true);
                fieldsValid = false;
            }
        } catch (error) {
            setShowErrPeso(true);
            fieldsValid = false;
        }

        try {
            if (validator.isEmpty(dimensionsLength)) {
                SetShowErrDimensionsL(true);
                fieldsValid = false;
            }
        } catch (error) {
            SetShowErrDimensionsL(true);
            fieldsValid = false;
        }
        try {
            if (validator.isEmpty(dimensionsWidth)) {
                SetShowErrDimensionsW(true);
                fieldsValid = false;
            }
        } catch (error) {
            SetShowErrDimensionsW(true);
            fieldsValid = false;
        }
        try {
            if (validator.isEmpty(dimensionsHeight)) {
                SetShowErrDimensionsH(true);
                fieldsValid = false;
            }
        }
        catch (error) {
            SetShowErrDimensionsH(true);
            fieldsValid = false;
        }

        return fieldsValid;
    }

    const handleSubmit = (event) => {
        console.log("categoria:" +document.getElementById('selectCategoria'));
        console.log("categoria:" +document.getElementById('selectCategoria').value);
        console.log("categoria:" +document.getElementById('selectCategoria').text);
        event.preventDefault();

        if (validateInputs() === true) {
            if (selectedFile === undefined) {
                document.getElementById('errorimg').style.color = "red"
            } else if (selectedFile.length === 4) {
                document.getElementById('errorimg').style.color = "black"
                let formData = new FormData();
                formData.append('categories', document.getElementById('selectCategoria').value)
                formData.append('product_name', inputs.product_name)
                formData.append('price', inputs.price)
                formData.append('amount', inputs.amount)
                // NOTA
                formData.append('quantities_sold', 0) //El valor de este campo debe enviarse de forma dinámica usando los datos retornados del producto.
                formData.append('description', inputs.description)
                formData.append('short_description', inputs.short_description)
                formData.append('peso', inputs.peso)
                formData.append('dimensions_length', inputs.dimensions_length)
                formData.append('dimensions_width', inputs.dimensions_width)
                formData.append('dimensions_height', inputs.dimensions_height)
                formData.append('image_one', selectedFile[0])
                formData.append('image_two', selectedFile[1])
                formData.append('image_three', selectedFile[2])
                formData.append('image_four', selectedFile[3])

                axios.put(baseUrl + '/products/api/update/' + parametros.idProducto + '/',
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
                document.getElementById('errorimg').style.color = "red"
            }

        } else {
            console.log('XXXXXXXXXXXXXXXX');
        }
    }

    /* Messages */
    const MsgProductName = () => (
        <div style={{ marginTop: "1%" }}>
            <span style={{ color: "#FF5733" }}>Ingrese el nombre del producto.</span>
        </div>
    )

    const MsgShortDescription = () => (
        <div style={{ marginTop: "1%" }}>
            <span style={{ color: "#FF5733" }}>Especifique los detalles.</span>
        </div>
    )

    const MsgDescription = () => (
        <div style={{ marginTop: "1%" }}>
            <span style={{ color: "#FF5733" }}>Ingrese la descripción.</span>
        </div>
    )

    const MsgQuantity = () => (
        <div style={{ marginTop: "1%" }}>
            <span style={{ color: "#FF5733" }}>Ingrese la cantidad en existencia.</span>
        </div>
    )

    const MsgPrice = () => (
        <div style={{ marginTop: "1%" }}>
            <span style={{ color: "#FF5733" }}>Ingrese el precio.</span>
        </div>
    )

    const MsgPeso = () => (
        <div style={{ marginTop: "1%" }}>
            <span style={{ color: "#FF5733" }}>Ingrese el peso.</span>
        </div>
    )

    const MsgDimensionsLength = () => (
        <div style={{ marginTop: "1%" }}>
            <span style={{ color: "#FF5733" }}>Ingrese la dimensión del producto (Largo).</span>
        </div>
    )

    const MsgDimensionsWidth = () => (
        <div style={{ marginTop: "1%" }}>
            <span style={{ color: "#FF5733" }}>Ingrese la dimensión del producto (Ancho).</span>
        </div>
    )

    const MsgDimensionsHeight = () => (
        <div style={{ marginTop: "1%" }}>
            <span style={{ color: "#FF5733" }}>Ingrese la dimensión del producto (Alto).</span>
        </div>
    )

    
    listCategoria.map((item) =>(
        (item.id === parametros.idCategoria)
        ? categoriaName = item.category_name
        : <></>
    ))



    return (
        <>
            <div className='container' style={{ paddingTop: 30 }}>
                <div className=''>
                    <h4>Editar productos</h4>
                    <hr />
                    <div className='row'>
                        <div className='col-12' style={{ textAlign: "center" }}>
                            <div className='col' style={{ marginBottom: 10, position: "relative" }}>
                                <div className='row' style={{ marginBottom: 10, maxWidth: "100%" }}>
                                    <p id="errorimg">Selecciona 4 imagenes *</p>
                                    <Col><input type="file" multiple onChange={handleFileSelect} /></Col>
                                    <Col style={{ textAlign: "right" }}><div className='col'><button style={{ color: "white", backgroundColor: "#E94E1B", borderColor: "#E94E1B" }} className='btn' onClick={() => { showas() }}>Preview</button></div></Col>
                                </div>
                                <img alt='' id="img1" src={imgdefault1} style={{ width: "90%" }} />
                                <img alt='' src={preview1} style={{ width: "90%" }} />
                            </div>
                            <div className='col'>
                                <div className='row'>
                                    <div className='col' style={{ marginBottom: 10, position: "relative" }}>
                                        <img alt='' id="img2" src={imgdefault2} style={{ width: "90%" }} />
                                        <img alt='' src={preview2} style={{ width: "90%" }} />
                                    </div>
                                    <div className='col'>
                                        <img alt='' id='img3' src={imgdefault2} style={{ width: "90%" }} />
                                        <img alt='' src={preview3} style={{ width: "90%" }} />
                                    </div>
                                    <div className='col'>
                                        <img alt='' id='img4' src={imgdefault2} style={{ width: "90%" }} />
                                        <img alt='' src={preview4} style={{ width: "90%" }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12'>
                            <Form>
                                <Row className="mb-3">
                                    <Form.Group controlId="validationCustom03">
                                        <Form.Label>Nombre del producto</Form.Label>
                                        <Form.Control placeholder='nombre del producto' required type="text" name="product_name" style={{ backgroundColor: "#DFDFDF" }} value={inputs.product_name == null ? '' : inputs.product_name} onChange={handleChange} />
                                        {showErrProductName ? <MsgProductName /> : null}
                                    </Form.Group>

                                </Row>
                                <Row className="mb-3">

                                    <Form.Group>
                                        <Form.Label>Categoria</Form.Label>
                                        <Form.Select id='selectCategoria' style={{ backgroundColor: "#DFDFDF" }}>
                                            <option value={parametros.idCategoria}>{categoriaName}</option>
                                            {listCategoria.map((item,index)=>(
                                                    (item.id === parametros.idCategoria)
                                                    ? null
                                                    :< option key={index} value={item.id}>{item.id}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Descripcion</Form.Label>
                                        <Form.Control placeholder='Descripcion' as={"textarea"} required type="text" name="description" style={{ backgroundColor: "#DFDFDF" }}  value={inputs.description == null ? '' : inputs.description} onChange={handleChange} />
                                        {showErrDescription ? <MsgDescription /> : null}
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Especificaciones (color, talla, sabor, etc.)</Form.Label>
                                        <Form.Control placeholder='Especificaciones' as={"textarea"} required type="text" name="short_description" style={{ backgroundColor: "#DFDFDF" }} value={inputs.short_description == null ? '' : inputs.short_description}  onChange={handleChange} />
                                        {showErrShortDesc ? <MsgShortDescription /> : null}
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Existencias</Form.Label>
                                        <Form.Control placeholder='Existencias' min={1} required type="number" name="amount" style={{ backgroundColor: "#DFDFDF" }} value={inputs.amount == null ? '' : inputs.amount} onChange={handleChange} />
                                        {showErrAmount ? <MsgQuantity /> : null}
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Precio</Form.Label>
                                        <Form.Control placeholder='Precio' min={1} required type="number" name="price" style={{ backgroundColor: "#DFDFDF" }} value={inputs.price == null ? '' : inputs.price} onChange={handleChange} />
                                        {showErrPrice ? <MsgPrice /> : null}
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Peso</Form.Label>
                                        <Form.Control placeholder='Peso (Kg)' min={1} required type="number" name="peso" style={{ backgroundColor: "#DFDFDF" }} value={inputs.peso == null ? '' : inputs.peso} onChange={handleChange} />
                                        {showErrPeso ? <MsgPeso /> : null}
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Alto</Form.Label>
                                        <Form.Control placeholder='Alto (cm)' min={1} required type="number" name="dimensions_height" style={{ backgroundColor: "#DFDFDF" }} value={inputs.dimensions_height == null ? '' : inputs.dimensions_height} onChange={handleChange} />
                                        {showErrDimensionsH ? <MsgDimensionsHeight /> : null}
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Ancho</Form.Label>
                                        <Form.Control placeholder='Ancho (cm)' min={1} required type="number" name="dimensions_width" style={{ backgroundColor: "#DFDFDF" }} value={inputs.dimensions_width == null ? '' : inputs.dimensions_width} onChange={handleChange} />
                                        {showErrDimensionsW ? <MsgDimensionsWidth /> : null}
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Largo</Form.Label>
                                        <Form.Control placeholder='Largo (cm)' min={1} required type="number" name="dimensions_length" style={{ backgroundColor: "#DFDFDF" }} value={inputs.dimensions_length == null ? '' : inputs.dimensions_length} onChange={handleChange} />
                                        {showErrDimensionsL ? <MsgDimensionsLength /> : null}
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
        </>
    )

}
export default UpdateProducts;