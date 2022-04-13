import React, {useState,useEffect} from 'react';

import imgproducto from '../images/producto.png';

import { Carousel,Pagination} from 'react-bootstrap';

import Appbar from './AdminAppbar';
import Footer from './footer';

import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import '../config';


var baseUrl = global.config.yellow.rabbit.url;

//var token = localStorage.getItem('tokenClient');
//var username = localStorage.getItem('usernameClient');
//var idusuario = localStorage.getItem('userId');
var paginas = 0;


/* const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
}; */




const AdminProductos = () =>{
    const [listProductos, setListProductos] = useState([]);
    const [array,setArray] = useState([]);
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
          axios.post(baseUrl+'/products/api/all-products/',{
            product_name: "",
            category_name:"",
            page:1
          })
          .then((response) => {
            console.log(response);
            paginas = response.data[0][0]["num_pages "];
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


    /* function methodFilterCategory(name){
        console.log(name)
        try {
            axios.post(baseUrl+'/products/api/all-products/',{
              product_name: "",
              category_name:name,
              page:1
            })
            .then((response) => {
              console.log(response);
              paginas = response.data[0][0]["num_pages "];
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
    } */

    /* {listCategoria.map((item,index) => (
        <div key={index} className="form-check" >
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick = {() => { methodtest(item.category_name)} }/>
        <label className="form-check-label" htmlFor="flexRadioDefault1">
            {item.category_name}
        </label>
        </div>

    ))} */

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
                    <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:"bold",color:"#EB5929"}}>Catalogo de productos</p>
                    <div className='row'>
                    {listProductos.map((item,index) => (
                    <div key={index} className='col-6 col-md-3' style={{paddingBottom:15}}>
                        <div className="card" >
                            <div className="card__content">
                                <div className='row' style={{height:"50%",justifyContent:"center"}}>
                                    <img alt={'Img'} style={{width:150,height:150}} src={'https://yellowrabbitbucket.s3.amazonaws.com/'+item.image_one}></img>    
                                </div>
                                <div className='module line-clamp'>
                                    <a href={'/article/details/'+item.id} style={{color:"black",textDecoration:"none"}}><p style={{fontWeight:"bold"}}>{item.product_name}</p></a>
                                </div>
                                    <p className="card__info" style={{height:"fit-content"}}> <span className='simbol_price'>$</span>{item.price} <span className='simbol_price'>+ envio</span></p>
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

        </div>
    )

}
export default AdminProductos;