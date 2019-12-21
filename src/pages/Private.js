import React, { Component } from 'react'
import withAuth from '../components/withAuth'
import { Link } from 'react-router-dom';
// import NavBar from '../components/NavBar.js';

class Private extends Component {
  render() {
    
    return (
      // <div className="main-private">
       <div className="container text-center">
         <div className="row btn-group-vertical">
           <h2>Private</h2> 
             {/* <Link to='/signup' activeClassName=""><button className="btn btn-outline-dark  mt-5 mb-4" ><h3>Crear nuevo usuario</h3></button></Link> */}
            {/* <NavLink to='/privatelist' activeClassName=""><button className="btn btn-outline-dark  mt-4 mb-4" ><h3>Lista de viviendas</h3></button></NavLink>
            <NavLink to='/crearvivienda' activeClassName="" ><button className="btn btn-outline-dark  mt-4 mb-4" ><h3>Crear nueva vivienda</h3></button></NavLink>
            <NavLink to='/searchreferencia' activeClassName="" ><button className="btn btn-outline-dark  mt-4 mb-4" ><h3>Buscar por referencia</h3></button></NavLink>
            <NavLink to='/modificarvivienda' activeClassName=""><button className="btn btn-outline-dark  mt-4 mb-4" ><h3>Modificar vivienda</h3></button></NavLink>
            <NavLink to='/eliminarvivienda' activeClassName=""><button className="btn btn-outline-dark  mt-4 mb-5" ><h3>Eliminar vivienda</h3></button></NavLink> */} */}
         </div>
       </div>
       
      // </div>
    )
  }
}

export default  withAuth(Private);