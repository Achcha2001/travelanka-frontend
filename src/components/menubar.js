import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MenuBar.css';

function MenuBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [temperature, setTemperature] = useState('');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const response = await axios.get(
          'https://api.openweathermap.org/data/2.5/weather?q=Colombo,lk&appid=d4368ee9082191872e73fb9d63f20f0e'
        );
        const data = response.data;
        const kelvin = data.main.temp;
        const celsius = kelvin - 273.15;
        setTemperature(celsius.toFixed(1) + '°C');
      } catch (error) {
        console.error('Error fetching temperature:', error);
      }
    };

    fetchTemperature();
  }, []);

  return (
    <nav className={isSticky ? 'menu-bar sticky' : 'menu-bar'} >
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

      <span className="temperature">{temperature} </span>

      <button id="log-button"><a href="/login">Login/Sign-up</a></button>
    </nav>
  );
}

export default MenuBar;
