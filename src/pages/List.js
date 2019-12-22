import React, { Component } from 'react'
import houseBackendService from '../service/house-service'
import { Link } from 'react-router-dom';
import Card from '../components/Card'
import Paginador from '../components/Paginador'

class List extends Component {
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
  
  render() {
    const {houses, numHouses, paginador} = this.state
    
    console.log(numHouses)
    console.log(paginador)
    return (
        <div className="container d-flex">
          <div className="row justify-content-center">
            <div className="col-xs-12 col-md-10 ">
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
export default List 

