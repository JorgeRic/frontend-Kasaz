import React, { Component } from 'react'

class Paginador extends Component {
  state={
    paginador: {
      pages: Math.floor(this.props.numHouses/ this.props.per_page)
    }
  }
  render() {
    const num_pages = Math.ceil(this.props.numHouses / this.props.per_page)
    const btnPrevious = (this.props.page > 1) ? 
    <button type = "button" onClick={this.props.pagePrevious} className="btn btn-success mr-2">
      Anterior
    </button>: ''
    
    const btnNext = (this.props.page > 0 && this.props.page < num_pages) ? 
    <button type = "button" onClick={this.props.pageNext} className="btn btn-success">
      Siguiente
    </button>: ''

    return (
      <div className="m1-5 d-flex col-6 justify-content-center">
        {btnPrevious}
        {btnNext}
        
      </div>
    )
  }
}
export default Paginador
