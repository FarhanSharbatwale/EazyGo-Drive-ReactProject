import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/Auth.css'

const Auth = () => {

    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true)

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        if (isLogin) {
            const storedUser = JSON.parse(localStorage.getItem("user"));

            if (
                storedUser &&
                storedUser.email === form.email &&
                storedUser.password === form.password
            ) {
                localStorage.setItem("isLoggedIn", "true");

                alert("Login successful!");

                // 🔥 Restore booking data if exists
                const bookingData = localStorage.getItem("bookingData");

                if (bookingData) {
                    navigate("/booking", {
                        state: JSON.parse(bookingData)
                    });
                    localStorage.removeItem("bookingData");
                } else {
                    navigate("/");
                }

            } else {
                alert("Invalid credentials");
            }

        } else {
            localStorage.setItem("user", JSON.stringify(form));
            localStorage.setItem("isLoggedIn", "true");

            alert("Signup successful!");
            navigate("/");
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1>{isLogin ? "Welcome Back" : "Create Account"}</h1>

                {!isLogin && (
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                    />
                )}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />

                <button onClick={handleSubmit}>
                    {isLogin ? "Login" : "Sign Up"}
                </button>

                <p>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? " Sign Up" : " Login"}
                    </span>
                </p>

            </div>

        </div>
    )
}

export default Auth;