import React, { useState } from 'react'
import '../css/SellerAccount.css'
import { useNavigate } from 'react-router-dom'

const SellerAccount = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createSeller = () => {
    if (!form.name || !form.phone || !form.city) {
      alert("Please fill all fields");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const sellerData = {
      ...form,
      email: currentUser?.email
    };

    localStorage.setItem("sellerProfile", JSON.stringify(sellerData));

    alert("Seller Account Created ✅");

    navigate("/seller"); // go to dashboard
  };

  return (
    <div className="seller-account-container">

      <div className="seller-card">

        <h1>Create Seller Account</h1>
        <p>Start listing your vehicles and earn money 🚗</p>

        <div className="form-group">
          <input name="name" placeholder="Full Name" onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} />
          <input name="city" placeholder="City" onChange={handleChange} />
        </div>

        <button onClick={createSeller}>
          Create Account
        </button>

      </div>

    </div>
  )
}

export default SellerAccount;