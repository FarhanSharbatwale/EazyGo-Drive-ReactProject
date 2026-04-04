import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Auth from './components/Auth'
import Search from './components/Search'
import SellerDashboard from './components/SellerDashboard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import Booking from './components/Booking'
import SellerAccount from './components/SellerAccount'

const Layout = () => {
  const location = useLocation();

  // hide navbar on auth page
  const hideNavbar = location.pathname === "/auth";

  return (
    <>
      {!hideNavbar && <Navbar/>}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/search" element={<Search />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/seller-account" element={<SellerAccount />} />
      </Routes>
      <ToastContainer/>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;