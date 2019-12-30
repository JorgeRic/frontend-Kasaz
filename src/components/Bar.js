import React, { Component } from 'react'
import houseBackendService from '../service/house-service'
import { Link } from 'react-router-dom';
import Map from './Map'
import credentials from '../service/credentials'

const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credentials.mapsKey}`

class Bar extends Component {
  state = {
    metersMin: '',
    metersMax: '',
    priceMin: '',
    priceMax:'',
    numBedrooms: null,
    houses: []
  };
  handleFormSubmit= (event) => {
    
    const {meters, priceMin, numBedrooms, priceMax, metersMax, metersMin } = this.state
    event.preventDefault();
    houseBackendService.searchHouse({
      metersMin, 
      metersMax,
      priceMax,
      meters,
      priceMin,
      numBedrooms
    })
    .then((houses) => {
        this.setState({
          houses
        })
      })
      .catch (error => {console.log(error)
      })
    };
    
  handleChange = (event) => {  
    event.preventDefault()
    const {name, value} = event.target;
    console.log(value)
    this.setState({[name]: value});
  };

  render() {
    return (
      <>
    <div className="card p-3">
      <div className="card text-center d-flex">
        <div className="card-header text-center mr-3 ml-3  bg-warning">
          <Map 
            googleMapURL= {mapURL}
            google={this.props.google}
            zoom={11}
            initialCenter={{lat: 41.387177, lng: 2.170104}} 
            containerElement= {<div style={{height: '400px'}} />}
            mapElement= {<div style={{height: '100%'}} />}
            loadingElement= {<p>Loading...</p>}
          >
          </Map>
        </div>
      </div>
    </div>
      <Link to='/houses/search' className="btn btn-warning btn-small filtrar mr-3 mt-1 mb-1 font-weight-bold" >Filtrar</Link>
</>
    )
  }
}
export default Bar