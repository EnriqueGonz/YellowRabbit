import React,{ useState,useEffect } from 'react';
import imgblog from '../images/Blog.png';
import imgdefault2 from '../images/imgDefaultLoad2.png';
import imgdefault1 from '../images/imgDefaultLoad1.png';
import { Tab,Tabs } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
//import axios from 'axios';
import Appbar from './appbar';

var arrPictures = [];
var arrPicturesPreview = [];
var nameFiles = [];

const AdminProductosAgregar = () =>{

    function uploadPictures(event) {
        var arrPicturesPreviewTemp = []
        var selectedPictures = document.getElementById("pictures");
        var amountPictures = selectedPictures.files.length;
    
        for (var i = 0; i < amountPictures; i++) {
            var fileName = event.target.files[i].name;
    
            try {
                // Avoid duplicate file uploads
                const found = nameFiles.find(element => element == fileName);
                if (found === undefined | found === '') {
                    var fileName = event.target.files[i].name;
                    var pictures = document.getElementById("pictures").files[i];
                    var urlsfiles = URL.createObjectURL(event.target.files[i]);
    
                    arrPicturesPreviewTemp.push(urlsfiles)
                    arrPictures.push(pictures)
                    nameFiles.push(fileName);
    
                    for (let index = 0; index < arrPicturesPreviewTemp.length; index++) {
                        arrPicturesPreview.push(arrPicturesPreviewTemp[index])
                    }
                    var arrPicturesPreviewTemp = [];
                }
            } catch (error) {
            }
        }
    
        // call previuw pictures
        previewPictures(arrPicturesPreview);
    }



    function previewPictures(arrPicturesPreview) {
        // clean the div "grl-cards"
        document.getElementById("grl-cards").innerHTML = "";
    
        for (var i = 0; i < arrPicturesPreview.length; i++) {
            var newDivCol = document.createElement("div");
            newDivCol.className = 'col';
            newDivCol.style.cssText = 'max-width: 15rem !important;';
            newDivCol.innerHTML = '';
    
            var newDivBtnContainer = document.createElement("div");
            newDivBtnContainer.className = 'button-container';
            newDivBtnContainer.innerHTML = '';
    
            var image = document.createElement('img');
            image.src = arrPicturesPreview[i];
            image.className = "rounded float-start";
            image.style.cssText = 'width: 200px !important; height: 200px !important';
            image.innerHTML = '';
    
            var btnClose = document.createElement('button');
            btnClose.className = "btn-close";
            btnClose.value = i;
            btnClose.onclick = function (e) {
                e.preventDefault();
                var posRemove = parseInt(e.target.value);
                var removed = arrPicturesPreview.splice(posRemove, 1); //  position, Amount of elements to remove
                var removefn = nameFiles.splice(posRemove, 1); //  position, Amount of elements to remove
                var removep = arrPictures.splice(posRemove, 1); //  position, Amount of elements to remove
                // If you delete all the photos in the list, the input files of the photos will also be emptied.
                if (arrPictures.length === 0) {
                    // The input value is empty
                    var valuePicture = document.getElementById("pictures");
                    valuePicture.value = '';
                }
                previewPictures(arrPicturesPreview);
            }
            btnClose.innerHTML = '';
    
            newDivBtnContainer.appendChild(image);
            newDivBtnContainer.appendChild(btnClose);
            newDivCol.appendChild(newDivBtnContainer);
            document.getElementById("grl-cards").appendChild(newDivCol);
        }
    }

    return(    
        <>
        <Appbar></Appbar>
        <div className='container'>
            <div style={{widows:"75%"}}>
            <div className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"#FFF",justifyContent: "space-around"}}>
              <a className='aNoSelected' href='/inicio'>INICIO</a>
              <a className='aNoSelected' href='/datos'>DATOS</a>
              <a className='aNoSelected' href='/productos'>PRODUCTOS</a>
              <a className='aSelected' href='/blog'>BLOG</a>
              <a className='aNoSelected' href='/contacto'>CONTACTO</a>
            </div>

            </div>

        </div>
        <Carousel>
            <Carousel.Item className='contenedor'>
                <img alt='' src={imgblog} style={{width:"100%"}}/>
                <div className="possText2Img1">
                    <p style={{fontFamily:"'Quicksand', sans-serif",fontWeight:"bold",color:"white",fontSize:65}}>Contactanos</p>
                </div>
            </Carousel.Item>
        </Carousel>


        <div className='container' style={{paddingTop:30}}>
        <Tabs defaultActiveKey="addproducto" id="uncontrolled-tab-example">
            <Tab eventKey="addproducto" title="Añadir producto">
                <div className=''>
                    <hr/>
                    <h4>Añadir producto</h4>

                    <div className='row'>
                        <div className='col'>
                            <div className='col' style={{marginBottom:10,position:"relative"}}>
                                <input type="file" onChange={uploadPictures} name="files[]" id="pictures"
                                accept=".png, .jpg, .jpeg" className="form-control" multiple required/>
                                <img id="img1" src={imgdefault1} style={{width:"100%"}}/>
                            </div>
                            <div className='col'>
                                <div className='row'>
                                    <div className='col' style={{marginBottom:10,position:"relative"}}>
                                        <img id="img1" src={imgdefault2} style={{width:"100%"}}/>
                                    </div>
                                    <div className='col'>
                                        <button className='btn' style={{width:"100%"}}>
                                            <img src={imgdefault2} style={{width:"100%"}}/>
                                        </button>
                                    </div>
                                    <div className='col'>
                                        <button className='btn' style={{width:"100%"}}>
                                            <img src={imgdefault2} style={{width:"100%"}}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col'>

                        </div>

                        <div class="row row-cols-1 row-cols-md-3 g-4" id="grl-cards">
                        </div>
                        

                    </div>

                    <hr/>

                </div>


            </Tab>
            <Tab eventKey="addcategoria" title="Añadir categoria">
            </Tab>
        </Tabs>

        </div>



        <footer style={{backgroundColor:"#EB5929"}}>
            <div className="navbar navbar-expand-lg navbar-light" style={{justifyContent: "space-around"}}>
                <div style={{textAlign:"center"}}>
                    <p style={{color:"white",margin:5}}>@2021 Yellow Rabbit - Todos los derechos reservados</p>
                </div>
            </div>
        </footer>
        </>
    )

}
export default AdminProductosAgregar;