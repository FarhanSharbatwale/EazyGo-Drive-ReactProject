import React, { useState, useEffect } from 'react'
import ProfilePic from '../assets/profile.png'
import '../css/SellerDashboard.css'

const SellerDashboard = () => {

    const [vehicles, setVehicles] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [form, setForm] = useState({
        name: "",
        image: "",
        type: "",
        fuel: "",
        seats: "",
        transmission: "",
        contact: "",
        location: "",
        rent: ""
    });

    // LOAD vehicles
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("vehicles")) || [];
        setVehicles(stored);
    }, []);

    // OPEN MODAL ✅
    const openOverlay = () => {
        setShowForm(true);
    };

    // HANDLE INPUT
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ADD VEHICLE
    const addVehicle = () => {

        if (!form.name || !form.type) {
            alert("Fill required fields");
            return;
        }

        const newVehicle = {
            id: Date.now(),
            ...form,
            available: true
        };

        const updated = [...vehicles, newVehicle];

        setVehicles(updated);
        localStorage.setItem("vehicles", JSON.stringify(updated));

        window.dispatchEvent(new Event("storage"));

        setShowForm(false);

        setForm({
            name: "",
            image: "",
            type: "",
            fuel: "",
            seats: "",
            transmission: "",
            contact: "",
            location: "",
            rent: ""
        });
    };

    // TOGGLE
    const toggleAvailability = (id) => {
        const updated = vehicles.map(v =>
            v.id === id ? { ...v, available: !v.available } : v
        );

        setVehicles(updated);
        localStorage.setItem("vehicles", JSON.stringify(updated));

        window.dispatchEvent(new Event("storage"));
    };

    return (
        <div className="dashboard-container">

            <h1 className="dashboard-title">Seller Dashboard</h1>

            {/* SELLER */}
            <div className="seller-box">
                <img src={ProfilePic} alt="profile" />
                <div>
                    <h2>Prakash Patil</h2>
                    <p>Sangli</p>
                </div>

                <button className="primary-btn" onClick={openOverlay}>
                   <span className='add-vehicle'>+</span> Add Vehicle
                </button>
            </div>

            {/* MODAL */}
            {showForm && (
                <div className="overlay">
                    <div className="modal">

                        <h2>Add Vehicle</h2>

                        <div className="form-grid">
                            <input name="name" placeholder="Vehicle Name" value={form.name} onChange={handleChange} />
                            <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />

                            <select name="type" value={form.type} onChange={handleChange}>
                                <option value="">Type</option>
                                <option>Sedan</option>
                                <option>SUV</option>
                                <option>Bike</option>
                            </select>

                            <select name="fuel" value={form.fuel} onChange={handleChange}>
                                <option value="">Fuel</option>
                                <option>Petrol</option>
                                <option>Diesel</option>
                                <option>Electric</option>
                            </select>

                            <input name="seats" placeholder="Seats" value={form.seats} onChange={handleChange} />

                            <select name="transmission" value={form.transmission} onChange={handleChange}>
                                <option value="">Transmission</option>
                                <option>Manual</option>
                                <option>Automatic</option>
                            </select>

                            <input name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} />
                            <input name="location" placeholder="City" value={form.location} onChange={handleChange} />
                            <input name="rent" placeholder="₹/hour" value={form.rent} onChange={handleChange} />
                        </div>

                        <div className="modal-actions">
                            <button onClick={addVehicle}>Add</button>
                            <button onClick={() => setShowForm(false)}>Cancel</button>
                        </div>

                    </div>
                </div>
            )}

            {/* LIST */}
            <h2>Listed Vehicles</h2><br />

            <div className="vehicle-list">
                {vehicles.length > 0 ? vehicles.map(v => (
                    <div key={v.id} className="vehicle-item">

                        <img src={v.image} alt="" />

                        <div>
                            <h3>{v.name}</h3>
                            <p>{v.type} • {v.fuel} • {v.seats} seats</p>
                        </div>

                        <h3 className="price">₹{v.rent} <span className='per-day-price'>/hour(s)</span> </h3>

                        <div className="vehicle-actions">
                            <span className={v.available ? "available" : "unavailable"}>
                                {v.available ? "Available" : "Unavailable"}
                            </span>

                            <button onClick={() => toggleAvailability(v.id)}>
                                Change availability
                            </button>
                        </div>

                    </div>
                )) : <p>No vehicles yet</p>}
            </div>

        </div>
    )
}

export default SellerDashboard