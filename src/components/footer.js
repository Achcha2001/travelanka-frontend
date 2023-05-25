import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="logo">
          <img src='.\images\logo.jpg' alt="Logo" />
        </div>
        <div className="menu">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Tour Guide</a></li>
            <li><a href="#">Site Maps</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">About Us</a></li>
          </ul>
        </div>
        <div className="terms">
          <p>Terms &amp; Conditions</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
