import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../css/Booking.css'

const Booking = () => {

    const navigate = useNavigate();
    const location = useLocation();

    // 🔥 Fallback to localStorage
    const data = location.state || JSON.parse(localStorage.getItem("bookingData") || "null");

    if (!data) return <p>No vehicle data found</p>;

    return (
        <>

            <div className="booking-container">

                <button className='back-btn' onClick={() => navigate('/search')}>
                    <i className="fa-solid fa-chevron-left"></i> Back
                </button>

                <div className="booking-card">

                    <div className="booking-left">
                        <div className="booking-image">
                            <img src={data.image} alt="vehicle" />
                        </div>
                    </div>

                    <div className="booking-details">

                        <h1>{data.name}</h1>

                        <div className="booking-info">
                            <span><i className="fa-solid fa-gas-pump"></i> {data.fuel}</span>
                            <span><i className="fa-solid fa-user"></i> {data.seats} seats</span>
                            <span><i className="fa-solid fa-gear"></i> {data.transmission}</span>
                        </div>

                        <p className="description">
                            This vehicle is available for rent. Well maintained and perfect for your trips.
                        </p>

                        <p className='seller-info'>
                            <div className="seller-name">
                                <i className="fa-solid fa-user"></i> {data.sellerName}
                            </div>
                            <div className="seller-contact">
                                <i className="fa-solid fa-phone"></i> {data.contact}
                            </div>
                            <div className="seller-location">
                                <i className="fa-solid fa-location-dot"></i> {data.location}
                            </div>
                        </p>

                        <h3 id='rent-price'>₹{data.rent} / hour</h3>

                        {/* FORM */}
                        <div className="booking-form">
                            <div className="form-row">
                                <input type="text" placeholder="Full Name" />
                                <input type="text" placeholder="Phone Number" />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Pick Up Date</label>
                                    <input type="date" />
                                </div>

                                <div className="form-group">
                                    <label>Return Date</label>
                                    <input type="date" />
                                </div>
                            </div>

                            <div className="form-row">
                                <input type="text" placeholder="Pickup Location" />
                            </div>
                        </div>

                        <button className="book-btn">Confirm Booking</button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Booking;