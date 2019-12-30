import React, { Component } from 'react'
import houseBackendService from '../service/house-service'
import { Redirect } from 'react-router-dom'
import FileComponent from '../components/FileComponent'


class Update extends Component {
  state={
    title: '',
    price: '',
    type: '',
    image: [],
    numBedrooms: '',
    numBaths: '',
    description: '',
    meters: '',
    redirect: false,
    city:'',
    address: '',
    important: '',
    lat: '',
    long: '',
    message: 'Datos Modificados',
    update: false
  }
  componentDidMount(){
    const {id} = this.props.match.params
    // console.log(id)
    houseBackendService.getOneHouse(id)
    .then((response)=> {
      this.setState({
        title: response.data.title,
        price: response.data.price,
        type: response.data.type,
        image: response.data.image,
        numBedrooms: response.data.numBedrooms,
        numBaths: response.data.numBaths,
        description: response.data.description,
        meters: response.data.meters,
        city:response.data.city,
        address: response.data.address,
        important: response.data.important,
        lat: response.data.lat,
        long: response.data.long
       })
     })
    .catch((error)=>{
      console.log(error)
    })
  }
  handleSubmit = (event) => {
    const {title, price, type, image, city, address, important, numBedrooms, numBaths, description, meters, lat, long} = this.state;
    const{id} = this.props.match.params
    event.preventDefault()
    houseBackendService.updateOneHouse(id, {
      title, 
      price, 
      type, 
      image, 
      numBedrooms, 
      numBaths, 
      description, 
      meters,
      city,
      address,
      important,
      lat, 
      long
    })
    .then(() => {
      this.onSuccessfulSubmit()
    })
    .catch(error => console.log(error))
  }

  handleOnChange = (event)=> {
    const {name,value} = event.target;
    this.setState({
      [name]: value,

    });
  }
  onSuccessfulSubmit = ()=> {
    this.setState({
      update: true
    }, () => {
      setTimeout(()=>{
        this.setState({
          redirect: true
        })
      }, 3000)
    })
  }
  goToPreviousPage = () => {
    this.props.history.goBack()
  }
  onUploadFinished = filename => {
    this.setState({image: this.state.image.concat(filename)});
  };
  render() {
    const {title, message, update, price, type, city, address, important, numBedrooms, numBaths, description, meters, redirect, lat, long} = this.state;

    return (

      <div className="mt-2 text-center">
           <h1>Modificar Vivienda</h1>
           { update ? <h4 className=" bg-success p-4 message">{message}</h4> : '' }
           <form onSubmit={this.handleSubmit}>
          <div className="d-flex">
            <label htmlFor='title' className="datos-creacion mr-2">Titulo</label>
              <input type='text' className="mr-5 p-3 border-warning form-control letra mb-1" id='title' name='title' value={title} onChange={this.handleOnChange}/>
          </div>
          <div className="d-flex">
            <label htmlFor='city' className="datos-creacion">Ciudad</label>
              <input type='text' id='city' className="mr-5 p-3 border-warning form-control letra mb-1" name='city' value={city} onChange={this.handleOnChange}/>
          </div>
          <div className="d-flex">
          <label htmlFor='address' className="datos-creacion">Dirección</label>
            <input type='text'className="mr-5 p-3 border-warning form-control letra mb-1" id='address' name='address' value={address} onChange={this.handleOnChange}/>
          </div>
          <div className="d-flex">
          <label htmlFor='price' className="datos-creacion">precio</label>
            <input type='number' className="mr-5 p-3 border-warning form-control letra mb-1" id='price' name='price' value={price} onChange={this.handleOnChange}/>
          </div>  
          <div className="d-flex justify-content-center">
            <FileComponent id="image" className="w-25"  onUploadFinished={this.onUploadFinished}/>        
          </div>
          <div className="d-flex">
          <label htmlFor='numBedrooms' className="datos-creacion">Num Hab</label> 
            <input type='number' className="mr-5 p-3 border-warning form-control letra mb-1" id='numBedrooms' name='numBedrooms' value={numBedrooms} onChange={this.handleOnChange}/>
          </div>
          <div className="d-flex">
          <label htmlFor='numBaths' className="datos-creacion">Num Baños</label>
            <input type='number' className="mr-5 p-3 border-warning form-control letra mb-1" id='numBaths' name='numBaths' value={numBaths} onChange={this.handleOnChange}/>
          </div>
          <div className="d-flex">
          <label htmlFor='meters' className="datos-creacion">Metros</label>
            <input type='number' className="mr-5 p-3 border-warning form-control letra mb-1" id='meters' name='meters' value={meters} onChange={this.handleOnChange}/>
          </div>
          <div className="d-flex">
            <label htmlFor='description' className="datos-creacion">Descripcion</label>
              <div className=" mr-5">
                <textarea type='text' className="mr-5 p-3 border-warning form-control letra mb-1" cols="80" rows="3" id='description' name='description' value={description} onChange={this.handleOnChange}/> 
              </div>
          </div>
          <label htmlFor='type' className="datos-creacion">Tipo de Vivienda</label>
            <div className="mr-5 ml-5">
              <select id='type' className="border-warning form-control letra mb-1" value={type} onChange={this.handleOnChange} name='type'>
                <option value=''>Elegir</option>
                <option value='piso'>Piso</option>
                <option value='chalet'>Chalet</option>
                <option value='planta baja'>Planta baja</option>
                <option value='bungalow'>Bungalow</option>
                <option value='apartamento'>Apartamento</option>
                <option value='atico'>Atico</option>
              </select>
            </div>
            <div className="d-flex">
            <label htmlFor="lat" className="datos-creacion">Latitud</label>
              <input type="number" id="lat" className="mr-5 p-3 border-warning form-control letra mb-1" onChange={this.handleOnChange } name= "lat" value={lat} ></input>
            </div>
            <div className="d-flex">
            <label htmlFor="long" className="datos-creacion">Longitud</label>
              <input type="number" id="long" className="mr-5 p-3 border-warning form-control letra mb-1" onChange={this.handleOnChange } name= "long" value={long} ></input>
            </div>
            <label htmlFor='important' className="datos-creacion">Vivienda Destacada?</label>
            <div className="mr-5 ml-5">
              <select id='important' className="border-warning form-control letra" value={important} onChange={this.handleOnChange} name='important'>
                <option value=''></option>
                <option value='false'>No</option>
                <option value='true'>Si</option>
              </select>
            </div>
             { update ? <h4 className="bg-success p-4 message mt-1">{message}</h4> : '' }
             <button type='submit' className=" btn btn-outline-success btn-small  mt-4 mb-1 col-6"><h4>Modificar Datos</h4></button>
             <button className=" btn btn-outline-warning btn-small mt-4 mb-1 col-6 " onClick={this.goToPreviousPage}><h4>Volver</h4></button>
           </form>
           {redirect ? <Redirect to = '/private'/> : null}
        </div>

    )
  }
}

export default Update