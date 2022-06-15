import './App.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import IndexClient from './Components/IndexClient';
import Datos from './Components/Datos';
import Contacto from './Components/Contacto';
import Blog from './Components/Blog';
import Producto from './Components/Productos';
import ProductoEspecifico from './Components/ProductoEspecifico';
import UserPerfil from './Components/UserPerfil';
import UserOrders from './Components/UserOrders';
import UserWishlist from './Components/UserWishlist';
import UserOrderDetails from './Components/UserOrderDetails';
import UserCarShop from './Components/UserCarShop';
import UserDirecciones from './Components/UserDirecciones';

import ConfirmOrder from './Components/ConfirmOrder';
import PayWithOxxo from './Components/PayWithOxxo';
import PageNotFound from './Components/PageNotFound';
//Payment with credit card
import SuccessPaymentCard from './Components/SuccessPaymentCard';
import FailedCardPayment from './Components/FailedCardPayment';
// PayPal
import PayPal from './Components/PayPal';


//ADMIN
import AdminProductosAgregar from './Components/AdminProductosAgregar';
import AdminPedidos from './Components/AdminPedidos';
import AdminProductos from './Components/AdminProductos';
import AdminUpdateProduct from './Components/AdminUpdateProduct';
import ConfirmEmail from './Components/ConfirmEmail';



function App() {
    return (
        <div className="App" style={{ width: "100%", height: "100vh" }}>
            <Router>
                <Switch>

                <Route exact path="/">
                        <IndexClient></IndexClient>
                    </Route>

                    <Route path="/mailing/api/confirm-mail/:idinvitacion/:tokeninvitacion/">
                        <ConfirmEmail></ConfirmEmail>
                    </Route>

                    <Route path="/inicio">
                        <IndexClient></IndexClient>
                    </Route>
                    <Route path="/datos">
                        <Datos></Datos>
                    </Route>
                    <Route path="/contacto">
                        <Contacto></Contacto>
                    </Route>
                    <Route path="/blog">
                        <Blog></Blog>
                    </Route>
                    <Route path="/productos">
                        <Producto></Producto>
                    </Route>

                    <Route path="/article/details/:idproduct/">
                        <ProductoEspecifico></ProductoEspecifico>
                    </Route>


                    <Route path="/user/mi-perfil">
                        <UserPerfil></UserPerfil>
                    </Route>
                    <Route path="/user/mis-pedidos">
                        <UserOrders></UserOrders>
                    </Route>

                    <Route path="/user/mi-wishlist">
                        <UserWishlist></UserWishlist>
                    </Route>

                    <Route path="/detallesPedido/:idorder/">
                        <UserOrderDetails></UserOrderDetails>
                    </Route>
                    <Route path="/user/mi-carrito">
                        <UserCarShop></UserCarShop>
                    </Route>

                    <Route path="/user/mis-direcciones">
                        <UserDirecciones></UserDirecciones>
                    </Route>

                    {/* <Route path="/confirmar/pedido/:idProducto/:cantidad/:precio">
                        <ConfirmOrder></ConfirmOrder>
                    </Route> */}

                    <Route path="/pagar/carrito/">
                        <ConfirmOrder></ConfirmOrder>
                    </Route>

                   {/*  <Route path="/pagar/con/oxxo/:idusuario/:idorder/:productName/:envio/:total">
                        <PayWithOxxo></PayWithOxxo>
                    </Route> */}

                    <Route path="/success:session_id">
                        <SuccessPaymentCard></SuccessPaymentCard>
                    </Route>

                    <Route path="/cancelled">
                        <FailedCardPayment></FailedCardPayment>
                    </Route>

                    {/* <Route path="/pagar/con/paypal/:idusuario/:idorder/:productName/:total">
                        <PayPal></PayPal>
                    </Route> */}

                    <Route path="/not/found">
                        <PageNotFound></PageNotFound>
                    </Route>

                    


                    <Route path="/admin/products/api/update/:idproduct/:idcategoria/">
                        <AdminUpdateProduct></AdminUpdateProduct>
                    </Route>
                    <Route path="/admin/productos">
                        <AdminProductos></AdminProductos>
                    </Route>
                    <Route path="/admin/añadir">
                        <AdminProductosAgregar></AdminProductosAgregar>
                    </Route>
                    <Route path="/admin/pedidos">
                        <AdminPedidos></AdminPedidos>
                    </Route>
                    <Route path="/admin/notificaciones">
                        <AdminPedidos></AdminPedidos>
                    </Route>


                </Switch>
            </Router>
        </div>
    );
}

export default App;
