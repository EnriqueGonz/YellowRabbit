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


function App() {
    return (
        <div className="App" style={{ width: "100%", height: "100vh" }}>
            <Router>
                <Switch>

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

                    <Route path="/confirmar/pedido">
                        <ConfirmOrder></ConfirmOrder>
                    </Route>

                    <Route path="/pagar/con/oxxo">
                        <PayWithOxxo></PayWithOxxo>
                    </Route>

                    <Route path="/not/fount">
                        <PageNotFound></PageNotFound>
                    </Route>

                </Switch>
            </Router>
        </div>
    );
}

export default App;
