import React, { Component } from 'react'
import houseBackendService from '../service/house-service'
import Card from '../components/Card'
import { Link } from 'react-router-dom';

class Search extends Component {
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
    console.log("picked!!", event.target);
    const {name, value} = event.target;
    this.setState({[name]: value});
  };
  handleChangeRooms = (event) => { 
    window.theTarget = event.target;
    const name = "numBedrooms";
    const value = event.target.attributes.value.value;
    this.setState({[name]: value});
  };

  render() {
    const {priceMin, metersMin, metersMax, priceMax, houses} =this.state
    return (
      <>
      <div >
        <form onSubmit={this.handleFormSubmit} >
          <div className="justify-content-center text-center">

            <h3>Precios</h3>
            <div className="d-flex justify-content-center">
              <select name="priceMin" className="border-warning btn col-5 select-search" onChange={this.handleChange } value={priceMin} id="priceMin">
                <option value=''>Precio Minimo</option>
                <option value='0'>desde 0</option>
                <option value='50000'>desde 50000</option>
                <option value='100000'>desde 100000</option>
                <option value='150000'>desde 150000</option>
                <option value='200000'>desde 200000</option>
                <option value='250000'>desde 250000</option>
                <option value='300000'>desde 300000</option>
              </select>
                <pre>   __   </pre>
              <select name="priceMax" className="border-warning btn col-5 select-search" onChange={this.handleChange } value={priceMax} id="priceMax">
                <option value=''>Precio maximo</option>
                <option value='100000'>hasta 100000</option>
                <option value='200000'>hasta 200000</option>
                <option value='300000'>hasta 300000</option>
                <option value='400000'>hasta 400000</option>
                <option value='500000'>hasta 500000</option>
                <option value='600000'>hasta 600000</option>
              </select>
            </div>
            <h3 className="mt-2">Tamaños</h3>
            <div className="d-flex justify-content-center">
              <select name="metersMin" className="border-warning btn col-5 select-search" onChange={this.handleChange } value={metersMin} id="metersMin">
                <option value=''>Metros minimos</option>
                <option value='50'>50</option>
                <option value='100'>100</option>
                <option value='150'>150</option>
                <option value='200'>200</option>
              </select>
              <pre>   __   </pre>
              <select name="metersMax" className="border-warning btn col-5 select-search" onChange={this.handleChange } value={metersMax} id="metersMax">
                <option value=''>Metros maximos</option>
                <option value='100'>100</option>
                <option value='150'>150</option>
                <option value='200'>200</option>
                <option value='201'>Más 200</option>
              </select>
              </div>
              <h3 className="mt-2">Habitaciones</h3>
              <div className="btn-group">
                <div onClick={this.handleChangeRooms} value="0" className="border-warning btn-success btn-lg btn col-3 select-search" name="numBedrooms">Todas</div>
                <div onClick={this.handleChangeRooms} value="1" className="border-warning btn btn-warning white col-3 btn-lg select-search" name="numBedrooms">1+</div>
                <div onClick={this.handleChangeRooms} value="2" className="border-warning btn btn-warning white col-3 btn-lg select-search" name="numBedrooms">2+</div>
                <div onClick={this.handleChangeRooms} value="3" className="border-warning btn-warning white btn col-3 btn-lg select-search" name="numBedrooms">3+</div>
                <div onClick={this.handleChangeRooms} value="4" className="border-warning btn-warning white btn col-3 btn-lg select-search" name="numBedrooms">4+</div>
                <div onClick={this.handleChangeRooms} value="5" className="border-warning btn-warning white btn col-3 btn-lg select-search" name="numBedrooms">5+</div>
              </div>
              <div className="text-center">
                <button className="btn btn-outline-warning mt-4 mb-2 col-6" type="submit" ><h3>Search</h3></button>
              </div>  
          </div>
        </form>
        {houses.data ? houses.data.map((house)=>{
          return ( 
            <div key={house._id} className= "container d-flex">
                <div className="row justify-content-center">
                  <div className="col-xs-12 col-md-10 ">
                    <Card   
                      house={house}
                    />
                    <div className="text-center">
                      <Link to={`/houses/details/${house._id}`}><button type="button" className="btn w-80 btn-warning bar mb-4">Ver Datos Vivienda</button></Link>
                    </div>
                  </div>
                </div>
            </div>
              )
            }) : <p></p>
        }
        </div>

</>
    )
  }
}
export default Search 