import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';

import About from './pages/About';
import Product from './pages/Product';
import Orders from './pages/Orders';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Navbar from './components/Navbar';
import Vests from './pages/Vests';
import OversizedTees from './pages/OversizedTees';
import Hoodies from './pages/Hoodies';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import Hero from './pages/Hero';
import SizeChart from './pages/SizeChart';

const App = () => {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === '/';

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />

      {!hideNavAndFooter && <Navbar />}
      {!hideNavAndFooter && <SearchBar />}

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/home" element={<Home />} />
        
        <Route path="/about" element={<About />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/vests" element={<Vests />} />
        <Route path="/oversized-tees" element={<OversizedTees />} />
        <Route path="/hoodies" element={<Hoodies />} />
        <Route path='/sizechart' element={<SizeChart/>}/>
      </Routes>

      {!hideNavAndFooter && <Footer />}
    </div>
  );
};

export default App;



