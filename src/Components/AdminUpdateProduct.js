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
    var { idproduct,idcategoria } = useParams(); // params
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
            //console.log(response);
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
            axios.get(baseUrl + '/products/api/specific-product/' + idproduct + '/')
                .then((response) => {
                    console.log(response);
                    setInputs(response.data[0][0])
                    setlistProduct(response.data[0][0])
                })
                .catch((error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setInputs],[setlistProduct])



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


    function showas() {
        try {
            const objectUrl1 = URL.createObjectURL(selectedFile1)
            setPreview1(objectUrl1)
            document.getElementById('img1').style.display = "none"
        } catch (error) {
            console.log('');
        }
        try {

            const objectUrl2 = URL.createObjectURL(selectedFile2)
            setPreview2(objectUrl2)
            document.getElementById('img2').style.display = "none"
        } catch (error) {
            console.log('');
        }
        try {
            const objectUrl3 = URL.createObjectURL(selectedFile3)
            setPreview3(objectUrl3)
            document.getElementById('img3').style.display = "none"
        } catch (error) {
            console.log('');
        }
        try {
            const objectUrl4 = URL.createObjectURL(selectedFile4)
            setPreview4(objectUrl4)
            document.getElementById('img4').style.display = "none"
        } catch (error) {
            console.log('');
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
        console.log("categoria:" +document.getElementById('categorySelected').value);
        event.preventDefault();
        console.log(selectedFile1);
        console.log(selectedFile2);
        console.log(selectedFile3);
        console.log(selectedFile4);

        if(validateInputs() === true) {
            let formData = new FormData();
            formData.append('categories', document.getElementById('categorySelected').value)
            formData.append('product_name', inputs.product_name)
            formData.append('price', inputs.price)
            formData.append('amount', inputs.amount)
            formData.append('unit_of_existence', inputs.amount)
            // NOTA
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
                                    <Col><input type="file" onChange={handleFileSelect1} style={{position:"absolute",top:"50%"}}/></Col>
                                    <Col style={{ textAlign: "right" }}><div className='col'><button style={{ color: "white", backgroundColor: "#E94E1B", borderColor: "#E94E1B" }} className='btn' onClick={() => { showas() }}>Preview</button></div></Col>
                                </div>
                                <img alt='' id="img1" src={'https://yellowrabbitbucket.s3.amazonaws.com/'+listProduct.image_one} style={{ width: "90%" }} />
                                <img alt='' src={preview1} style={{ width: "90%" }} />
                            </div>
                            <div className='col'>
                                <div className='row'>
                                    <div className='col' style={{ position: "relative" }}>
                                        <input type="file" onChange={handleFileSelect2} style={{position:"absolute",top:"50%"}}/>
                                        <img alt='' id="img2" src={'https://yellowrabbitbucket.s3.amazonaws.com/'+listProduct.image_two} style={{ width: "90%" }} />
                                        <img alt='' src={preview2} style={{ width: "90%" }} />
                                    </div>
                                    <div className='col' style={{position:"relative"}}>
                                        <input type="file" onChange={handleFileSelect3} style={{position:"absolute",top:"50%"}}/>
                                        <img alt='' id='img3' src={'https://yellowrabbitbucket.s3.amazonaws.com/'+listProduct.image_three} style={{ width: "90%" }} />
                                        <img alt='' src={preview3} style={{ width: "90%" }} />
                                    </div>
                                    <div className='col' style={{position:"relative"}}>
                                        <input type="file" onChange={handleFileSelect4} style={{position:"absolute",top:"50%"}}/>
                                        <img alt='' id='img4' src={'https://yellowrabbitbucket.s3.amazonaws.com/'+listProduct.image_four} style={{ width: "90%" }} />
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
                                        {showErrProductName ? <MsgProductName /> : null}
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
            <Footer></Footer>
        </>
    )

}
export default UpdateProducts;