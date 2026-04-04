import React, { useEffect, useState } from 'react'
import '../css/Navbar.css'
import logo from '../assets/logo-text.png'
import profileicon from '../assets/profile.png'
import { data, Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Navbar = () => {

  const [prf_option, setprf_option] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(status === "true");
  }, []);

  const logout = () => {
    const logOutConfirm = confirm("Are you sure you want to log out?");
    if (logOutConfirm) {
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      toast.success("Loged out Successfully")
      navigate("/");
    } else {
      toast.error("Failed to Logout!..")
    }
  };

  return (
    <nav>
      <img src={logo} alt="Logo" onClick={() => { navigate('/') }} />

      <ul>
        <li className="pageNavlinks"><Link to='/'>HOME</Link></li>
        <li className="pageNavlinks"><a href="#">ABOUT</a></li>
        <li className="pageNavlinks"><Link to='/seller'>LIST VEHICLE</Link></li>

        {!isLoggedIn ? (
          <li>
            <Link to='/auth'>
              <button id='auth-btn'>Sign Up</button>
            </Link>
          </li>
        ) : (
          <>
            <li>
              {/* <button id='auth-btn' onClick={logout}>Logout</button> */}
              <img id='profile-icon' src={profileicon} alt="profile" onClick={() => {setprf_option(!prf_option)}} />
            </li>
            {prf_option && (<div className="profile-options-dropdown">
              <div className='profile-option'>
                <p>Farhan Sharbatwale</p>
              </div>
              <div className='profile-option' onClick={logout}>
                <p> <i class="fa-solid fa-arrow-right-from-bracket"></i> Log Out</p>
              </div>
            </div>)}

          </>
        )}
      </ul>

    </nav>
  )
}

export default Navbar