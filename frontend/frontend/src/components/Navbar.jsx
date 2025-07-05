import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faUser,
  faShoppingCart,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { ShopContext } from '../context/ShopContext';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { isCartOpen, setIsCartOpen } = useContext(ShopContext);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    navigate('/login');
  };

  const navLinks = [
    { to: '/home', label: 'HOME' },
    {
      label: 'COLLECTION',
      dropdown: [
        { to: '/oversized-tees', label: 'Oversized Tees' },
        { to: '/Hoodies', label: 'Hoodies & Sweatshirts' },
        { to: '/vests', label: 'Vests' },
      ],
    },
    { to: '/about', label: 'ABOUT' },
  ];

  return (
    <>
      <div className="flex items-center justify-between py-5 px-4 sm:px-8 font-medium relative border-b">
        {/* Logo */}
        <Link to="/home">
          <p className="text-xl font-bold">RUNAWAY</p>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-6 text-sm text-gray-500">
          {navLinks.map((link) =>
            link.dropdown ? (
              <li key={link.label} className="relative group cursor-pointer">
                <p className="hover:text-black">{link.label}</p>
                <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-md py-2 px-4 rounded-md z-20 min-w-[180px]">
                  {link.dropdown.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className="block py-1 text-gray-600 hover:text-black"
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </li>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                className="flex flex-col items-center gap-1 hover:text-black"
              >
                <p>{link.label}</p>
              </NavLink>
            )
          )}
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-5">
          {/* Search Icon */}
          <FontAwesomeIcon
            onClick={() => setShowSearch(true)}
            icon={faSearch}
            className="text-gray-500 w-5 cursor-pointer"
          />

          {/* User Icon */}
          <div className="relative group cursor-pointer">
            {token ? (
              <>
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-gray-500 w-5"
                />
                <div className="absolute right-0 top-full hidden group-hover:block bg-white shadow-md py-2 px-4 rounded-md z-20 min-w-[160px] text-sm text-gray-600">
                  <p className="py-1 hover:text-black cursor-pointer">My Profile</p>
                  <Link to="/orders">
                    <p className="py-1 hover:text-black cursor-pointer">Orders</p>
                  </Link>
                  <p onClick={logout} className="py-1 hover:text-black cursor-pointer">Logout</p>
                </div>
              </>
            ) : (
              <FontAwesomeIcon
                onClick={() => navigate('/login')}
                icon={faUser}
                className="text-gray-500 w-5"
              />
            )}
          </div>

          {/* Cart Icon */}
          <div className="relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
            <FontAwesomeIcon icon={faShoppingCart} className="text-gray-500 w-5" />
            <span className="absolute -top-2 -right-1 bg-black text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              {getCartCount()}
            </span>
          </div>

          {/* Hamburger Icon - Shows on < lg screens */}
          <div className="block lg:hidden">
            <FontAwesomeIcon
              icon={faBars}
              className="w-6 h-6 text-gray-700 cursor-pointer"
              onClick={() => setVisible(true)}
            />
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full bg-white z-50 transition-all duration-300 ease-in-out lg:hidden ${
            visible ? 'w-3/4 px-6 py-6 shadow-lg' : 'w-0 overflow-hidden'
          }`}
        >
          {/* Close Icon */}
          <div className="flex justify-end mb-6">
            <FontAwesomeIcon
              icon={faTimes}
              className="w-6 h-6 text-gray-600 cursor-pointer"
              onClick={() => setVisible(false)}
            />
          </div>

          {/* Sidebar Links */}
          <div className="flex flex-col text-gray-700 gap-4 text-md font-medium">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label}>
                  <p className="text-gray-600">{link.label}</p>
                  <div className="ml-2 mt-1 flex flex-col gap-2">
                    {link.dropdown.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={() => setVisible(false)}
                        className="text-sm text-gray-500 hover:text-black"
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setVisible(false)}
                  className="hover:text-black"
                >
                  {link.label}
                </NavLink>
              )
            )}

            <hr className="my-4" />
            <p className="text-sm text-gray-500 mt-2">Account</p>
            <p className="cursor-pointer hover:text-black">My Profile</p>
            <Link to="/orders">
              <p className="cursor-pointer hover:text-black">Orders</p>
            </Link>
            <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;

