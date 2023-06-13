// import React from 'react';
import './MenuBar.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MenuBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="menu-bar">
      <div className="menu-logo">
        <img src="./images/logo.jpg" alt="Logo" />
      </div>

      <div className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="menu-toggle-bar"></div>
        <div className="menu-toggle-bar"></div>
        <div className="menu-toggle-bar"></div>
      </div>

      <ul className={`menu-items ${isMenuOpen ? 'open' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/tourguides">Tour Guide</Link></li>
        <li><Link to="/Site-Map">Site Map</Link></li>
        <li><Link to="/Contact-us">Contact Us</Link></li>
        <li><Link to="/aboutus">About Us</Link></li>
        <li
          className={`dropdown ${isDropdownOpen ? 'open' : ''}`}
          onClick={toggleDropdown}
        >
          <a href="#" className="dropbtn">Register</a>
          <div className={`dropdown-content ${isDropdownOpen ? 'open' : ''}`}>
            <ul>
              <li><Link to="/service1">Accommodation</Link></li>
              <li><Link to="/Tourguide">Tour Guide</Link></li>
            </ul>
          </div>
        </li>
      </ul>

      <button id="log-button"><a href="/login">Login/Sign-up</a></button>
    </nav>
  );
}

export default MenuBar;
