import React, { Component } from 'react'
import houseBackendService from '../service/house-service'
import { Link } from 'react-router-dom';
import Map from './Map'
import credentials from '../service/credentials'
import {GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps'

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
    {/* <div className="d-flex justify-content-around bar mb-3"> */}
    <div className="card p-3">
      <div className="card text-center d-flex">
        <div className="card-header text-center mr-3 ml-3  bg-warning">
        <Map 
          googleMapURL= {mapURL}
          google={this.props.google}
          zoom={14}
          initialCenter={{lat: 41.387177, lng: 2.170104}} 
          containerElement= {<div style={{height: '400px'}} />}
          mapElement= {<div style={{height: '100%'}} />}
          loadingElement= {<p>Loading...</p>}
        >
          {/* <Marker position={{lat: 41.40, lng: 2.17}} /> */}
        </Map>
       
        </div>
      </div>
    </div>
      {/* <form className="text-center w-70 d-flex mt-2 mb-2 mr-5 ml-5 search-map"> */}
        {/* <input className="search-map"></input>
        <img className="lupa"src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS869c35CtB9o-tkc9rg-Vwh2cYzuUkn3vtNTPY6lb6RtHE4HI3&s" alt="lupa"></img> */}
      {/* </form> */}
      {/* <form onSubmit={this.handleSubmit}>
        <label htmlFor=''>Titulo</label> */}
          {/* <input type='text' id='' name='' value={} onChange={this.handleOnChange}/> */}
        {/* <label htmlFor='price'>precio</label>
      </form> */}
      <Link to='/houses/search' className="btn btn-warning btn-small filtrar mr-3 mt-1 mb-1 font-weight-bold" >Filtrar</Link>
    {/* </div> */}
</>
    )
  }
}
export default Bar