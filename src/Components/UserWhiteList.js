import React,{ useEffect, useState } from 'react';

import imgindex1 from '../images/fondouser.png';
import LoadingUserProducts from './LoadingUserProductos';

import Appbar from './appbarClient';
import Footer from './footer';
import axios from 'axios';

var token = localStorage.getItem('tokenClient');
var username = localStorage.getItem('usernameClient');


const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
};



const UserWhiteList = () =>{
    const [list, setList] = useState([]);


    useEffect(() =>{  
        try {
          axios.post('https://yellowrabbit.herokuapp.com/wishlist/api/wishlist-customer/'+username+'/',{
              product_name:""
          },{headers})
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
      },[setList])

      if (!list.length) return <LoadingUserProducts />;

    function methodName(id) {
        console.log(id);
        try {
            axios.delete('https://yellowrabbit.herokuapp.com/wishlist/api/delete/'+id+'/',{headers})
            .then((response) => {
                console.log(response.status);
                window.location.href = "/user/mi-whitlist"
            })
            .catch((error) => {
                console.log(error);
            });
    
        } catch (error) {
            console.log(' . ', error);
        }
    }

    return(    
        <>
        <Appbar></Appbar>
        <div style={{backgroundImage:"url('"+imgindex1+"')"}}>
            <div className='container' style={{backgroundColor:"white",width:"60%"}}>

                <div className='container' style={{width:"90%"}}>
                    <br/><br/>
                    <h3>WHITELIST</h3>
                    <div className='container' style={{width:"90%"}}>
                        

                    </div>

                    <hr style={{height:"5px",backgroundColor:"#EB5929",opacity:1}}></hr>

                    <h6>Mis productos</h6>
                    <br></br>
                    <div className='container' style={{width:"90%"}}>
                    {list.map((item,index) => (
                        <div key={index} style={{marginBottom:10}} className="col-sm-12">
                            
                            <div  style={{backgroundColor:"#FFE9EB",borderRadius:20,height:"100%"}} className="card">

                            <div className="card-body">
                                <div className='row'>
                                    <div className='col-sm-4'>
                                        <img alt="" style={{width:"100%"}} src={ 'https://yellowrabbitbucket.s3.amazonaws.com/'+item[1][0].image_one}></img>
                                    </div>
                                    <div className='col-sm-8'>
                                        <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:"bold",color:"#EB5929"}}>{item[1][0].product_name}</p>
                                        <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:500}}>{item[1][0].product_name}</p>
                                        <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:500}}>{'$'+item[1][0].price}</p>
                                        <p style={{fontFamily:"'Cairo', sans-serif",fontWeight:500}}>{'Disponibles: '+item[1][0].unit_of_existence}</p>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div style={{textAlign:"right"}} className="contianer">
                                    <button onClick = {() => { methodName(item[0][0].id);} } style={{borderRadius:15,backgroundColor:"#E75353",color:"white"}} className="btn"   >Quitar de whitelist</button>
                                </div>
                            </div>
                            </div>
                        </div>
                    ))}
                    </div><br></br><br></br>
                    <hr style={{height:"5px",backgroundColor:"#EB5929",opacity:1}}></hr>
                    
                    
                    <br></br>

                </div>
            </div> 

        </div>
        <Footer></Footer>

        </>
    )

}
export default UserWhiteList;