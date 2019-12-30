import React, { Component } from 'react'
import withAuth from '../components/withAuth'
import { Link } from 'react-router-dom';
import houseBackendService from '../service/house-service'
import Card from '../components/Card'
import Paginador from '../components/Paginador'
import Bar from '../components/Bar'

class Private extends Component {

state= {
  houses: [],
  paginador: {
    page: 1,
    per_page: 5
  },
  numHouses: '',
  message: 'Vivienda Eliminada',
  success: false
}

componentDidMount(){
  this.loadHouses()
}
  loadHouses(){
    const {paginador} = this.state
    houseBackendService.getAllHouses(paginador.page, paginador.per_page)
    .then(response => {
      // console.log(response)
      this.setState({
        houses: response.data.listOfHouses,
        numHouses: response.data.numHouses
      })
    })
  }
  onSuccessfulSubmit = ()=> {
    this.setState({
      success: true
    }, () => {
      setTimeout(()=>{
        this.setState({
          success: false
        })
      }, 1500)
    })
  }

  pagePrevious = () => {
    this.setState({
      paginador:{
        per_page: this.state.paginador.per_page,
        page: this.state.paginador.page - 1,
      }
    }, this.loadHouses)
  }

  pageNext = () => {
    this.setState({
      paginador:{
        per_page: this.state.paginador.per_page,
        page: this.state.paginador.page + 1
      }
    }, this.loadHouses)
  }
  handleDeleteClick = (id) => {
    const {houses} = this.state;
    houseBackendService.deleteOneHouse(id)
    .then(()=>{
      this.onSuccessfulSubmit()
      const filterHouses = houses.filter((house)=> {
        return house._id !== id
      })
      this.setState({
        houses: filterHouses
      })
    })
  }
  
  render() {
    const {houses, numHouses, paginador, success, message} = this.state
    
    return (
      <>
      <div className="text-center">
        <Bar />
      </div>
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
                    <Link to={`/houses/update/${house._id}`}><button type="button" className="btn w-80 btn-warning bar mb-4">Modificar Datos Vivienda</button></Link>
                    <button type="button" className="btn w-80 btn-danger bar mb-4" onClick={()=> {
                      if(window.confirm('Confirme para eliminar vivienda')){
                        this.handleDeleteClick(house._id)
                          }
                      }}>Borrar</button>
                    { success ? <h4 className="bg-danger p-4 message">{message}</h4> : '' }
                  </div>
                  </div>
                  )
                }): <p>Loading...</p>}

            </div>
            <Paginador 
              page= {paginador.page}
              numHouses = {numHouses}
              per_page={paginador.per_page}
              pagePrevious={this.pagePrevious}
              pageNext={this.pageNext}
            />
         </div>
      </div>
    </>
    )
  }
}

export default  withAuth(Private);

