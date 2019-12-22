import React, { Component } from 'react'

class Paginador extends Component {
  state={
    paginador: {
      pages: Math.ceil(Number(this.props.numHouses) / this.props.limite)
    }
  }
  render() {
    const {actual} = this.props;
    const btnPrevious = (actual > 1) ? 
    <button type = "button" onClick={this.props.pagePrevious} className="btn btn-warning mr-2">
      Anterior
    </button>: ''
    
    const {pages} = this.state.paginador
    const btnNext = (actual !== pages) ? 
    <button type = "button" onClick={this.props.pageNext} className="btn btn-warning">
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
