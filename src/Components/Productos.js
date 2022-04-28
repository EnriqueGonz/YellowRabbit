import React, {useState,useEffect} from 'react';

import imgproducto from '../images/producto.png';

import { Carousel,Pagination} from 'react-bootstrap';

import Appbar from './appbar';
import Footer from './footer';

import axios from 'axios';
import { MdOutlineFavorite,MdAddShoppingCart } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../config';
import { ReactComponent as IconCarShop} from '../images/icons/BtnWhatsapp.svg';
import { ReactComponent as IconBtnCarshop } from '../images/icons/CarShopB.svg';


var baseUrl = global.config.yellow.rabbit.url;

var token = localStorage.getItem('tokenClient');
//var username = localStorage.getItem('usernameClient');
var idusuario = localStorage.getItem('userId');
var paginas = 0;


const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};




const Productos = () =>{
    const [listProductos, setListProductos] = useState([]);
    const [array,setArray] = useState([]);
    const [listCategoria,setlistCategoria] = useState([]);

    const notify = () => 
    {toast('Producto agregado🔥', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    })}
    const notifyerror = () => 
    {toast.error('Opsss, intentalo mas tarde', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    })}
    const notifylisto = () => 
    {toast('Ese producto ya esta agregado', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    })}

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
          axios.post(baseUrl+'/products/api/all-products/',{
            product_name: "",
            category_name:"",
            page:1
          })
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

      function methodName(id) {
        console.log(id);
        console.log(idusuario);

        try {
            axios.post(baseUrl+'/wishlist/api/add-wishlist/',{
            user: idusuario,
            products:id
            },{headers})
            .then((response) => {
                console.log(response.status);
                if(response.status === 200){
                    notify();
                }
                if(response.status === 208){
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

    function methodLoadPage(number){
        axios.post(baseUrl+'/products/api/all-products/',{
            product_name: "",
            category_name:"",
            page:number
        })
        .then((response) => {
        console.log(response);
        setListProductos(response.data[1]);
        })
        .catch((error) => {
        console.log(error);
        });
    }

    function methodAddCarshop(id) {
        console.log(id);
        console.log(idusuario);

        try {
            axios.post(baseUrl+'/shoppingcart/api/add/',{
            user: idusuario,
            products:id,
            amount: 1
            },{headers})
            .then((response) => {
                if(response.status === 200){
                    notify();
                }
                if(response.status === 208){
                    notifylisto();
                }
            })
            .catch((error) => {
                //console.log(error);
                notifyerror();
            });
        } catch (error) {
            console.log(' . ', error);
        }
    }

    function methodShowProduct(id) {
        console.log(id);
        window.location = '/article/details/'+id;

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

      function methodShowWhatsapp(){
        window.location.href ='https://api.whatsapp.com/send/?phone=529671551588&text=¡Hola!%20Necesito%20ayuda'
    }

    function methodtest(name){
        console.log(name)
        try {
            axios.post(baseUrl+'/products/api/all-products/',{
              product_name: "",
              category_name:name,
              page:1
            })
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
          }
    }

    return(    
        <div id='wrapper'>
            <div id="sticky">
                <button className='btn-flotante' onClick = {() => { methodShowWhatsapp()} }><IconCarShop style={{width:35,height:50}}/></button>
            </div>
        <Appbar></Appbar>
        <div className='container'>
            <div style={{widows:"75%"}}>
            <div className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"#FFF",justifyContent: "space-around"}}>
              <a className='aNoSelected' href='/inicio'>INICIO</a>
              <a className='aNoSelected' href='/datos'>DATOS</a>
              <a className='aSelected' href='/productos'>PRODUCTOS</a>
              <a className='aNoSelected' href='/blog'>BLOG</a>
              <a className='aNoSelected' href='/contacto'>CONTACTO</a>
            </div>

            </div>

        </div>
        <Carousel>
            <Carousel.Item className='contenedor'>
                <img alt='' src={imgproducto} style={{width:"100%"}}/>
                <div className="possText1Img1" style={{color:"#FFF"}}>
                    <p style={{fontFamily:"'Quicksand', sans-serif",fontWeight:"bold",fontSize:65}}>Sigue tus</p>
                    <p style={{fontFamily:"'Quicksand', sans-serif",fontWeight:"bold",fontSize:85}}>Instintos</p>
                </div>
            </Carousel.Item>
        </Carousel>


        <div className='row'>
            <div className='col-12 col-md-2' style={{padding:0}} >
                <div style={{width:"100%",backgroundColor:"#E94E1B",textAlign:"center"}}>
                    <button className='btn'>
                        <IconBtnCarshop style={{width:"40%",height:"auto"}}/><br></br>
                        <span style={{color:"white",fontSize:12}}>Ir al carrito de compras</span>
                    </button>
                </div>
                <div className='container' style={{width:"100%"}}>
                    <br/>
                    <span>Categoria</span>

                    <div className="form-check" >
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick = {() => { methodtest("")} }/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Sin filtros
                        </label>
                        </div>
                    {listCategoria.map((item,index) => (
                        <div key={index} className="form-check" >
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick = {() => { methodtest(item.category_name)} }/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            {item.category_name}
                        </label>
                        </div>

                    ))}

                </div>
            
            </div>
            <div className='col-12 col-md-10' style={{borderLeft:"solid",borderColor:"#E94E1B"}}>
            <div className='container'>
            <center>
            <div style={{width:"100%",textAlign:"justify"}}>
                <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:"bold",color:"#EB5929"}}>Catalogo de productos</p>
                <div className='row'>
                {listProductos.map((item,index) => (
                <div key={index} className='col-6 col-md-3' style={{paddingBottom:15}}>
                    <div className="card" >
                        <div className="card__content">
                            <div className='row' style={{height:"50%",justifyContent:"center"}}>
                                <img onClick = {() => { methodShowProduct(item.id);} } alt={'Img'} style={{width:150,height:150}} src={'https://yellowrabbitbucket.s3.amazonaws.com/'+item.image_one}></img>    
                            </div>
                            <div className='module line-clamp'>
                                <a href={'/article/details/'+item.id} style={{color:"black",textDecoration:"none"}}><p style={{fontWeight:"bold"}}>{item.product_name}</p></a>
                            </div>
                                <p className="card__info" style={{height:"fit-content"}}> <span className='simbol_price'>$</span>{item.price} <span className='simbol_price'>+ envio</span></p>
                                <div className='container' style={{textAlign:"right",padding:0}}>
                                    <MdOutlineFavorite style={{marginLeft:"10px",fontSize:25}} className='btnFav' onClick = {() => { methodName(item.id);} } ></MdOutlineFavorite>
                                    <MdAddShoppingCart style={{marginLeft:"10px",fontSize:25}} className='btnFav' onClick = {() => { methodAddCarshop(item.id);} } ></MdAddShoppingCart>
                                    <ToastContainer rtl></ToastContainer>
                                </div>
                            
                        </div>
                    </div>
                </div>
                    
                ))}

                </div>
                
                
            </div>
            </center>
        </div>
        <div style={{paddingTop:20}}>
            {paginationBasic}
        </div>
            </div>
        </div>

        
        <br></br>


        <Footer></Footer>

        </div>
    )

}
export default Productos;