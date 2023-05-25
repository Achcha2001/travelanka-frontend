//import React from 'react';
import './MenuBar.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MenuBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <nav className="menu-bar">
      <div className="menu-logo">
        <img src='.\images\logo.jpg' alt="Logo" />
      </div>
      <ul className="menu-items">
        <li><Link to='/'>Home</Link></li>
        <li><Link to="/Tour-Guide">Tour Guide</Link></li>
        <li><Link to="/Site-Map">Site Map</Link></li>
        <li><Link to="/Contact-us">Contact Us</Link></li>
        <li><Link to='/aboutus'>About Us</Link></li>
        <li
          className={`dropdown ${isDropdownOpen ? 'open' : ''}`}
          onClick={toggleDropdown}
        >
          <a href="#" className="dropbtn">Register</a>
          <div className="dropdown-content">
            <Link to="/service1">Accomodation</Link>
            <Link to="/service2">Tour Guide</Link>
            
          </div>
        </li>
       
        
        
        </ul>
        <button id='log-button'><a href="/login">Login/Sign-up</a></button>
    </nav>
    
    
  );
}

export default MenuBar;

