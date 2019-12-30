import React, { Component } from "react";
import {GoogleMap, withScriptjs, withGoogleMap, Marker} from 'react-google-maps'
import houseBackendService from '../service/house-service';

class Map extends Component {
  state = {
    houses: []
  }
  componentDidMount(){
    houseBackendService.getAllHouses()
    .then(response => {
      this.setState({
        houses: response.data.listOfHouses,
      })
    })
  }
  displayMarkers = () => {
      return this.state.houses.map((house, index) => {
        return <Marker key={index} id={index} position={{
         lat: parseFloat(house.lat),
         lng: parseFloat(house.long),
        }}
        // labelAnchor={{x:0,y:0}}
        // label= {house.price}
        // icon= {'https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/256x256/Box_Green.png'}
        // labelAnchor= {new google.maps.Point(22, 0)}
        onClick={() => {
          window.location = `/houses/details/${house._id}`
        }}
        ></Marker>
      })
  }
  render(){
    return (
      <div>
            <GoogleMap 
             google={this.props.google}
             defaultZoom={10}
             defaultCenter={{lat: 41.387177, lng: 2.170104}} 
            >
              {this.displayMarkers()}
            </GoogleMap>
      </div>
    )
  }
}

export default withScriptjs(withGoogleMap (Map))
