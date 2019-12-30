
import React, { Component } from 'react'
import houseBackendService from '../service/house-service'
import { Link } from 'react-router-dom';
import Card from '../components/Card'
import Paginador from '../components/Paginador'
import Bar from '../components/Bar'

class Home extends Component {
  state= {
    houses: [],
    paginador: {
      page: 1,
      per_page: 5
    },
    numHouses: ''
  }

  componentDidMount(){
    this.loadHouses()
  }

  loadHouses(){
    const {paginador} = this.state
    houseBackendService.getAllHouses(paginador.page, paginador.per_page)
    .then(response => {
      const allHouses = response.data.listOfHouses
      const filterHouses = allHouses.filter((house)=>{
        return house.important === true
      })
      this.setState({
        houses: filterHouses
      })
      // console.log(filterHouses)
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

  render() {
    const {houses, numHouses, paginador} = this.state
    return (
      <>
      <div className="text-center">
        <Bar />
      </div>
      <div className="text-center">
        <h5>Administrador - username: jorge / password: jorge</h5>
        <h2>Viviendas Destacadas</h2>
      </div>
        <div className="container col-12">
          <div className="flex-row d-flex justify-content-center">
            <div className="col-xs-10 col-md-8">
                {houses.length > 0 ? houses.map((house)=> {
                return (
                  <div  key={house._id}>
                    <Card 
                      house={house}    
                    />
                  <div className="text-center">
                    <Link to={`/houses/details/${house._id}`}><button type="button" className="btn w-80 btn-warning bar mb-4">Ver Datos Vivienda</button></Link>
                  </div>
                  </div>
                  )
                }): <p>Loading...</p>}
            </div>
         </div>
            <Paginador 
              page= {paginador.page}
              numHouses = {numHouses}
              per_page={paginador.per_page}
              pagePrevious={this.pagePrevious}
              pageNext={this.pageNext}
            />
        </div>
      </>
    )
  }
}
export default Home