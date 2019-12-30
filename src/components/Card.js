
import React, { Component } from 'react'

class Card extends Component {
  state={
    house: this.props.house,
    contador: 0
  }
  
  increase() {
    this.setState({contador:this.state.contador+1})
  }
  reduce() { 
    let contador = this.state.contador
    if(contador>0) {
      this.setState({contador:contador-1})
    }
  }
  
  render() {
    
    const {house, contador} = this.state
    const sqm = Math.floor(house.price / house.meters)
    const btnPrevios = (contador > 0) ? 
    <button type="button" className="btn btn-success btn-small" onClick={this.reduce.bind(this)} value="Anterior"><small>Anterior</small></button> : '';
    const btnNext = (contador !== house.image.length - 1)  ? 
    <button type="button" className="btn btn-success btn-small ml-1" onClick={this.increase.bind(this)} value="Siguiente"><small>Siguiente</small></button> : '';

    return (
    <div className="card">
      <div className="card text-center mt-3 col-12">
        <div className="card-header text-center bg-warning">
          <img className="img-fluid w-80" src={house.image[contador]} alt="imagen vivienda"/>
          <div className="d-flex justify-content-center">
            {btnPrevios}
            {btnNext}
          </div>
          <div className="mt-3 mb-2">
            <h3 className="">Price: {house.price} €</h3>
            <p>{sqm} €/m<sup>2</sup></p>
          </div>
        </div>
        <div className="card-title mt-2">
          <h3>{house.title}</h3>
          <h5>{house.city} - {house.address}</h5> 

        </div>
        <div className="">
           <div className=" d-flex justify-content-center flex-nowrap  ">         
             <p><img className=" img-fluid size" src="https:image.freepik.com/iconos-gratis/corregir_318-10822.jpg" alt="icono ok"></img> {house.meters} m<sup>2</sup></p>
             <p>|</p>
             <p><img className="img-fluid size" src="https:image.flaticon.com/icons/png/512/90/90011.png" alt="icono bed"></img>  {house.numBedrooms} habs.</p>
             <p>|</p>
             <p><img className=" img-fluid size" src="https:image.flaticon.com/icons/png/512/47/47634.png" alt="icono bath"></img> {house.numBaths} baños</p>
           </div>
         </div>
      </div>
    </div>
    )
  }
}

export default Card 