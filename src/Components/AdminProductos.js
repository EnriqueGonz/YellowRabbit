import React, {useState,useEffect} from 'react';

import imgproducto from '../images/producto.png';

import { Carousel,Pagination,Modal,Button,Form } from 'react-bootstrap';

import Appbar from './AdminAppbar';
import Footer from './footer';

import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import '../config';
import AdminUpdateProduct from './AdminUpdateProduct';


var baseUrl = global.config.yellow.rabbit.url;

var token = localStorage.getItem('tokenAdmin');
//var username = localStorage.getItem('usernameClient');
//var idusuario = localStorage.getItem('userId');
var paginas = 0;
var idproducto =0;
var idcategoria = 0;


const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};




const AdminProductos = () =>{
    const [listProductos, setListProductos] = useState([]);
    const [array,setArray] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);

    const [listCategoria,setlistCategoria] = useState([]);

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

    useEffect(() =>{  
        try {
          axios.post(baseUrl+'/products/api/all-products-admin/',{
            product_name: "",
            category_name:"",
            page:1
          },{headers})
          .then((response) => {
            console.log(response);
            paginas = response.data[0][0]["num_pages"];
            setListProductos(response.data[1]);
            for (let num = 0; num < array.length; num++) {
                setArray([...array, num])
                
            }
          })
          .catch((error) => {
            console.log(error);
          });
    
        } catch (error) {
          console.log(' . ', error);
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      },[setListProductos],[setArray])

  
    function methodLoadPage(number){
        axios.post(baseUrl+'/products/api/all-products-admin/',{
            product_name: "",
            category_name:"",
            page:number
        },{headers})
        .then((response) => {
        console.log(response);
        setListProductos(response.data[1]);
        })
        .catch((error) => {
        console.log(error);
        });
    }


    let items = [];
    for (let number = 1; number <= paginas; number++) {
    items.push(
        <li className="page-item" key={number}><button className="page-link" onClick = {() => { methodLoadPage(number)} }>{number}</button></li>,
    );
    }

    const paginationBasic = (
        <div>
          <Pagination style={{justifyContent:"center"}}>{items}</Pagination>
          <br />
        </div>
      );


      function methodDeleteProduct(number){
        idproducto = number;
        console.log(number);
        handleShow();
    }

    function methodDelete(){
        axios.delete(baseUrl+'/products/api/delete/'+idproducto+'/',{headers})
        .then((response) => {
            methodLoadPage(1);        
            handleClose();
        })
        .catch((error) => {
        console.log(error);
        });

    }

    function methodModalAgotado(number){
        idproducto = number;
        console.log(number);
        handleShow2();
    }

    function methodAgotado(){
        axios.put(baseUrl+'/products/api/product-out-stock/'+idproducto+'/',{},{headers})
        .then((response) => {
            handleClose2();
            methodLoadPage(1);

        })
        .catch((error) => {
        console.log(error);
        });

    }


    function BuscarPorCampana(evt) {
        
        try {
            axios.post(baseUrl+'/products/api/all-products-admin/',{
              product_name: "",
              category_name:document.getElementById('selectCategoria').value,
              page:1
            },{headers})
            .then((response) => {
              paginas = response.data[0][0]["num_pages"];
              setListProductos(response.data[1]);
              for (let num = 0; num < array.length; num++) {
                  setArray([...array, num])
              }
            })
            .catch((error) => {
              console.log(error);
            });
      
          } catch (error) {
            console.log(' . ', error);
          }
    }


    function methodModalUpdate(number,categoria){
        idproducto = number;
        idcategoria = categoria;
        handleShow3();
    }

    return(    
        <div>
        <Appbar></Appbar>
        
        <Carousel>
            <Carousel.Item className='contenedor'>
                <img alt='' src={imgproducto} style={{width:"100%"}}/>
                <div className="possText1Img1" style={{color:"#FFF"}}>
                    <p style={{fontFamily:"'Quicksand', sans-serif",fontWeight:"bold",fontSize:65}}>Sigue tus</p>
                    <p style={{fontFamily:"'Quicksand', sans-serif",fontWeight:"bold",fontSize:85}}>Instintos</p>
                </div>
            </Carousel.Item>
        </Carousel>


        <>
            <div className='container'>
                <div style={{width:"100%",textAlign:"justify"}}>
                    <div className='row' style={{marginTop:20,marginBottom:20}}>
                        <div className='col'>
                            <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:"bold",color:"#EB5929"}}>Catalogo de productos</p>
                        </div>
                        <div className='col'>
                            <Form.Select  id='selectCategoria' onChange={BuscarPorCampana} style={{width:"auto",float:"right"}}>
                                <option value="">Filtrar por categoria</option>
                                {listCategoria.map((item, index) => (
                                    <option key={index} value={item.category_name} >{item.category_name}</option>
                                ))}
                            </Form.Select>
                        </div>

                    </div>
                    <div className='row'>
                    {listProductos.map((item,index) => (
                    <div key={index} className='col-6 col-md-3' style={{paddingBottom:15}}>
                        <div className="card" >
                            {
                                (item.unit_of_existence === 0)
                                ? <span className='productoAgotado'>Agotado</span>
                                : <></>
                            }
                            <div className="card__content">
                                <div className='row' style={{height:"50%",justifyContent:"center"}}>
                                    <a href={'/article/details/'+item.id} >
                                        <img alt={'Img'} style={{width:150,height:150}} src={'https://yellowrabbitbucket.s3.amazonaws.com/'+item.image_one}></img>    
                                    </a>
                                </div>
                                <div className='module line-clamp'>
                                    <a href={'/article/details/'+item.id} style={{color:"black",textDecoration:"none"}}><p style={{fontWeight:"bold"}}>{item.product_name}</p></a>
                                </div>
                                    <p className="card__info" style={{height:"fit-content"}}> <span className='simbol_price'>$</span>{item.price} <span className='simbol_price'>+ envio</span></p>
                                <div style={{width:"105%"}}>
                                    <div className='row'>
                                        <div className='col-12 col-md-4' style={{margin:0,padding:0}}>
                                            <button className='botonProductosAdmin' style={{margin:0,backgroundColor:"#F9B233"}} onClick = {() => { methodModalAgotado(item.id)} }>Agotado</button>
                                        </div>
                                        <div className='col-12 col-md-4' style={{margin:0,padding:0}}>
                                            <button className='botonProductosAdmin' style={{margin:0,backgroundColor:"#E94E1B"}} onClick = {() => { methodModalUpdate(item.id,item.categories_id)} }>Editar</button>
                                        </div>
                                        <div className='col-12 col-md-4' style={{margin:0,padding:0}}>
                                            <button className='botonProductosAdmin' style={{margin:0,backgroundColor:"#C12C2C"}} onClick = {() => { methodDeleteProduct(item.id)} }>Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        
                    ))}
                    </div> 
                </div>
            </div>
            <div style={{paddingTop:20}}>
                {paginationBasic}
            </div>
        </>

        
        <br></br>


        <Footer></Footer>

        <Modal  show={show} size="md" onHide={handleClose} >
            <Modal.Body style={{margin:20}}>
            <div>
                <h4>¿Segur@ que quieres eliminar el producto {idproducto}?</h4>
                <span>*Nota: Los productos que esten relacionado con algun pedido no podran ser eliminados</span>


                <Button style={{marginLeft:10,float:"right",backgroundColor:"#C12C30",borderColor:"#C12C30",color:"white" }} onClick = {() => { methodDelete()} } >
                    Eliminar
                </Button>
                <Button style={{marginLeft:10,float:"right",backgroundColor:"#E94E1B",borderColor:"#E94E1B"}} onClick = {handleClose}>
                    Volver
                </Button>
                
            </div>
            </Modal.Body>
        </Modal>

        <Modal  show={show2} size="md" onHide={handleClose2} >
            <Modal.Body style={{margin:20}}>
            <div>
                <h4>¿Agotar producto {idproducto}?</h4>

                <Button style={{marginLeft:10,float:"right",backgroundColor:"#C12C30",borderColor:"#C12C30",color:"white" }} onClick = {() => { methodAgotado()} } >
                    Agotar
                </Button>
                <Button style={{marginLeft:10,float:"right",backgroundColor:"#E94E1B",borderColor:"#E94E1B"}} onClick = {handleClose2}>
                    Volver
                </Button>
                
            </div>
            </Modal.Body>
        </Modal>


        <Modal  show={show3} size="lg" onHide={handleClose3} >
            <Modal.Body style={{margin:20}}>
            <div>
                <AdminUpdateProduct idProducto={idproducto} idCategoria={idcategoria}/>
            </div>
            </Modal.Body>
        </Modal>

        </div>
    )

}
export default AdminProductos;