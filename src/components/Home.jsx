import React, { useState } from 'react'
import '../css/Home.css'
import Car from '../assets/car.png'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const searchredirect = useNavigate();
    const [loading, setLoading] = useState(false);

    return (
        <>
            {loading && (
                <div className='loading-scr'>
                    <div className="spinner"></div>
                </div>
            )}
            <div className='main-container'>
                <div className='hero-container'>
                    <div className="hero-text">
                        <h1>Book Your Dream Ride now!</h1>
                        <p>Book your desired vehicle with resonable prices and offers connect with your nearby Vehicle owners</p>
                        <button id='bookride-btn' onClick={() => {
                            const isLoggedIn = localStorage.getItem("isLoggedIn");

                            if (!isLoggedIn) {
                                alert("Please login first!");
                                searchredirect("/auth");
                                return;
                            }

                            setLoading(true);

                            setTimeout(() => {
                                searchredirect(`/search`);
                            }, 500);
                        }}>Book a Ride</button>

                        <button id='listvehicle-btn' onClick={() => {

                            const isLoggedIn = localStorage.getItem("isLoggedIn");
                            const seller = localStorage.getItem("sellerProfile");

                            if (!isLoggedIn) {
                                alert("Login first!");
                                return searchredirect("/auth");
                            }

                            if (!seller) {
                                return searchredirect("/seller-account"); // 🔥 redirect to create seller
                            }
                            
                            setLoading(true);
                            setTimeout(() => {
                                searchredirect("/seller");
                            }, 500)
                        }}>List a Vehicle</button>
                    </div>
                    <div className="hero-image">
                        <img src={Car} alt="car" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home