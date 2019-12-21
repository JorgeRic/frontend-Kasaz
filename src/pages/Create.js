import React, { Component } from 'react'
import houseBackendService from '../service/house-service'
import { Redirect } from 'react-router-dom'

class Create extends Component {
  state={
    title: '',
    price: 0,
    type: '',
    image: '',
    numBedrooms: 0,
    numBaths: 0,
    description: '',
    meters: 0,
    redirect: false
  }
  handleSubmit= (event) => {
    const {title, price, type, image, numBedrooms, numBaths, description, meters} = this.state;
    event.preventDefault();
    houseBackendService.addOneHouse({
      title, 
      price, 
      type, 
      image, 
      numBedrooms, 
      numBaths, 
      description, 
      meters
    })
    .then((response)=>{
      console.log(response)
      this.setState({
        redirect: true
      })
    })
    .catch(error =>{console.log(error)})
    }

  handleOnChange = (event)=> {
    const {name,value} = event.target;
    this.setState({
      [name]: value
    });
  }
  render() {
    const {title, price, type, image, numBedrooms, numBaths, description, meters, redirect} = this.state;

    return (
      <div>
        <div>
           <h1>Crear Nueva Vivienda</h1>
           <form onSubmit={this.handleSubmit}>
           
          <label htmlFor='title'>Titulo</label>
            <input type='text' id='title' name='title' value={title} onChange={this.handleOnChange}/>
          <label htmlFor='price'>precio</label>
            <input type='number' id='price' name='price' value={price} onChange={this.handleOnChange}/>
          <label htmlFor='image'>Imagen</label>
            <input type='text' id='image' name='image' value={image} onChange={this.handleOnChange}/>
          <label htmlFor='numBedrooms'>Num Hab</label> 
            <input type='number' id='numBedrooms' name='numBedrooms' value={numBedrooms} onChange={this.handleOnChange}/>
          <label htmlFor='numBaths'>Num Baños</label>
            <input type='number' id='numBaths' name='numBaths' value={numBaths} onChange={this.handleOnChange}/>
          <label htmlFor='meters'>Metros</label>
            <input type='number' id='meters' name='meters' value={meters} onChange={this.handleOnChange}/>
          <label htmlFor='description'>Descripcion</label>
            <textarea type='text' id='description' name='description' value={description} onChange={this.handleOnChange}/> 
          <label htmlFor='type'>Tipo de Vivienda</label>
            <select id='type' value={type} onChange={this.handleOnChange} name='type'>
              <option value=''>Elegir</option>
              <option value='piso'>Piso</option>
              <option value='chalet'>Chalet</option>
              <option value='planta baja'>Planta baja</option>
              <option value='bungalow'>Bungalow</option>
              <option value='apartamento'>Apartamento</option>
              <option value='atico'>Atico</option>
            </select>
             <button type='submit'>Crear nuevo Ususario</button>
           </form>
           {redirect ? <Redirect to = '/houses'/> : null}
        </div>
      </div>
    )
  }
}


export default Create
