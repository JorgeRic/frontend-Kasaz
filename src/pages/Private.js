import React, { Component } from 'react'
import withAuth from '../components/withAuth'
import { Link } from 'react-router-dom';
import houseBackendService from '../service/house-service'
import Card from '../components/Card'
import Paginador from '../components/Paginador'

class Private extends Component {
  limite = 5
  state= {
    houses: [],
    paginador: {
      actual: 1,
      offset:0
    },
    numHouses: ''
  }

  componentDidMount(){
    houseBackendService.getAllHouses()
    .then(response => {
      console.log(response)
      this.setState({
        houses: response.data.listOfHouses,
        numHouses: response.data.numHouses
      })
    })
  }

  pagePrevious = () => {
    this.setState({
      paginador:{
        offset: this.state.paginador.offset - this.limite,
        actual: this.state.paginador.actual - 1
      }
    })
  }

  pageNext = () => {
    this.setState({
      paginador:{
        offset: this.state.paginador.offset + this.limite,
        actual: this.state.paginador.actual + 1
      }
    })
  }
  handleDeleteClick = (id) => {
    const {houses} = this.state;
    houseBackendService.deleteOneHouse(id)
    .then(()=>{
      const filterHouses = houses.filter((house)=> {
        return house._id !== id
      })
      this.setState({
        houses: filterHouses
      })
    })
  }
  
  render() {
    const {houses, numHouses, paginador} = this.state
    
    console.log(numHouses)
    console.log(paginador)
    return (
        <div className="container d-flex">
          <div className="row justify-content-center d-flex">
          <Link to='/signup' className=""><button className="btn btn-outline-warning mr-1 mt-2 mb-2" ><h3>Crear Nuevo Usuario</h3></button></Link>
          <Link to="/houses/create"><button className="btn btn-outline-warning ml-1 mt-2 mb-2" ><h3>Crear Nueva Vivienda</h3></button></Link>
            <div className="col-xs-12 col-md-10 ">
                {houses.length > 0 ? houses.map((house)=> {
                return (
                  <div  key={house._id}>
                    <Card 
                      house={house}    
                    />
                  <div className="text-center">
                    <Link to={`/houses/details/${house._id}`}><button type="button" className="btn w-80 btn-warning bar mb-4">Ver Datos Vivienda</button></Link>
                    <Link to={`/houses/update`}><button type="button" className="btn w-80 btn-warning bar mb-4">Modificar Datos Vivienda</button></Link>
                    <button type="button" className="btn w-80 btn-danger bar mb-4" onClick={()=> {
                      this.handleDeleteClick(house._id)
                    }}>Borrar</button>
                  </div>
                  </div>
                  )
                }): <p>Loading...</p>}

            </div>
            <Paginador 
              actual= {paginador.actual}
              numHouses = {numHouses}
              limite={this.limite}
              pagePrevious={this.pagePrevious}
              pageNext={this.pageNext}
            />
         </div>
        </div>
    )
  }
}

export default  withAuth(Private);

