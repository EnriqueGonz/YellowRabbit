import './App.css';
import React from "react";
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import IndexClient from './Components/IndexClient';
import Datos from './Components/Datos';
import Contacto from './Components/Contacto';
import Blog from './Components/Blog';
import Producto from './Components/Productos';
import UserPerfil from './Components/UserPerfil';
import UserOrders from './Components/UserOrders';
import UserWhiteList from './Components/UserWhiteList';
import UserOrderDetails from './Components/UserOrderDetails';


function App() {
  return (
    <div className="App" style={{width:"100%", height:"100vh"}}>
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



        <Route path="/user/mi-perfil">
            <UserPerfil></UserPerfil>
        </Route>
        <Route path="/user/mis-pedidos">
            <UserOrders></UserOrders>
        </Route>

        <Route path="/user/mi-whitelist">
            <UserWhiteList></UserWhiteList>
        </Route>

        <Route path="/detallesPedido/:idorder/">
            <UserOrderDetails></UserOrderDetails>
        </Route>
        <Route path="/user/mi-whitlist">
            <UserWhiteList></UserWhiteList>
        </Route>


        </Switch>
      </Router>
    </div>
  );
}

export default App;
