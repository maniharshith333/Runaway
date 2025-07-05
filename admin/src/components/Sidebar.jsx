import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/admin_assets/assets.js';
import { Menu } from 'lucide-react'; // Optional icon

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button for Mobile */}
      <div className="lg:hidden p-4">
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-100 p-4 shadow-md z-40 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:block`}
      >
        <div className="space-y-4">
          <NavLink
            to="/add"
            className="flex items-center space-x-2 hover:bg-gray-200 p-2 rounded transition"
            onClick={() => setIsOpen(false)}
          >
            <img src={assets.add_icon} alt="Add Icon" className="w-6 h-6" />
            <p className="text-gray-800">Add Products</p>
          </NavLink>

          <NavLink
            to="/list"
            className="flex items-center space-x-2 hover:bg-gray-200 p-2 rounded transition"
            onClick={() => setIsOpen(false)}
          >
            <img src={assets.order_icon} alt="Products Icon" className="w-6 h-6" />
            <p className="text-gray-800">Products List</p>
          </NavLink>

          <NavLink
            to="/orders"
            className="flex items-center space-x-2 hover:bg-gray-200 p-2 rounded transition"
            onClick={() => setIsOpen(false)}
          >
            <img src={assets.order_icon} alt="Orders Icon" className="w-6 h-6" />
            <p className="text-gray-800">Orders</p>
          </NavLink>
        </div>
      </div>

      {/* Optional backdrop for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black opacity-30 z-30 lg:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;

