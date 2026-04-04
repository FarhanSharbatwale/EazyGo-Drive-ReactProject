import React from 'react'
import '../css/VehicleCard.css'
import { useNavigate } from 'react-router-dom'


const VehicleCard = ({ data }) => {

  const booking_redirect = useNavigate();

  return (
    <div className='main'>
      <div className='card-container'
        onClick={() => {
          localStorage.setItem("bookingData", JSON.stringify(data));
          booking_redirect(`/booking/${data.id}`, { state: data });
        }}
      >

        <img src={data?.image} alt="Car-image" />
        <h2>{data?.name}</h2>
        <p className='seller-loc'><i className="fa-solid fa-location-dot"></i> {data.location}</p>
        <div className='vehicle-info'>
          <div className='vehicle-info-box'>
            <i className="fa-solid fa-car"></i> {data.type}
          </div>

          <div className='vehicle-info-box'>
            <i className="fa-solid fa-gas-pump"></i> {data.fuel}
          </div>

          <div className='vehicle-info-box'>
            <i className="fa-solid fa-person"></i> {data.seats} seats
          </div>

          <div className='vehicle-info-box'>
            <i className="fa-solid fa-gear"></i> {data.transmission}
          </div>
        </div>


      </div>
    </div>
  )
}


export default VehicleCard