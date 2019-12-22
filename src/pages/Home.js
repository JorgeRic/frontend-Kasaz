

import React, { Component } from 'react'
import houseBackendService from '../service/house-service'
import { Link } from 'react-router-dom';
import Card from '../components/Card'

class Home extends Component {
  state= {
    houses: []
  }

  componentDidMount(){
    houseBackendService.getAllHouses()
    .then(response => {
      const allHouses = response.data.listOfHouses
      const filterHouses = allHouses.filter((house)=>{
        return house.important === true
      })
      this.setState({
        houses: filterHouses
      })
      console.log(filterHouses)
    })
  }

  render() {
    const {houses} = this.state
    console.log(houses)

    return (
      <>
      <div className="text-center">
        <h2>Viviendas Destacadas</h2>
      </div>
        <div className="container d-flex">
          <div className="row justify-content-center">
            <div className="col-xs-10 col-md-8 ">
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
        </div>
      </>
    )
  }
}
export default Home