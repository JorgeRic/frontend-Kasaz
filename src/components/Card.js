import React from 'react'

function Card(props) {
  const {house, mostrarUnaFoto} = props;
  const sqm = Math.floor(house.price / house.meters)
  console.log(house)

  return (
    <div className="card">
      <div className="card text-center mt-3 col-12">
        <div className="card-header text-center bg-warning">
        {
          mostrarUnaFoto
            ? (<img className="img-fluid w-80" src={house.image[0]} alt="imagen house"/>)
            : house.image
              ? house.image.map((img) => (<img className="img-fluid w-80 mt-2" key={img} src={img} alt="imagen house"/>))
              : null
        }
          {/* <img src={house.image[0]} className="img-fluid p-2 mb-1 img-thumbnail card-img-top mx-auto d-block" alt={house.title}/> */}
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
            <p><img className=" img-fluid size" src="https://image.freepik.com/iconos-gratis/corregir_318-10822.jpg" alt="icono ok"></img> {house.meters} m<sup>2</sup></p>
            <p>|</p>
            <p><img className="img-fluid size" src="https://image.flaticon.com/icons/png/512/90/90011.png" alt="icono bed"></img>  {house.numBedrooms} habs.</p>
            <p>|</p>
            <p><img className=" img-fluid size" src="https://image.flaticon.com/icons/png/512/47/47634.png" alt="icono bath"></img> {house.numBaths} baños</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Card