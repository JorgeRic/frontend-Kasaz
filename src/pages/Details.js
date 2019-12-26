import React, { Component } from 'react'
import CardDetail from '../components/CardDetail'
import houseBackendService from '../service/house-service'

class Details extends Component {
  state={
    house: []
  }
  componentDidMount(){
    const {id} = this.props.match.params
    houseBackendService.getOneHouse(id)
    .then((response)=> {
      console.log(response.data.image)
      this.setState({
        house: response.data,
       })
     })
    .catch((error)=>{
      console.log(error)
    })
  }
  goToPreviousPage = () => {
    this.props.history.goBack()
  }
  nextImage = () => {

  }
  previousImage = () => {

  }
  render() {
    const {house} = this.state
    return (
      <>
    <div  key={house._id} className="container d-flex">
      <div className="row justify-content-center">
        <div className="col-xs-12 col-md-10 ">
          <CardDetail house={house} />
        </div>
      </div>
    </div>
    <div className="text-center">
      <button className="btn btn-success mt-2 mb-2 col-8" onClick={this.goToPreviousPage}><h4>Volver Atras</h4></button>
    </div>
      </>

     )
    }
}

export default Details

