import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo-white.png';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-logo">
        <img src={logo} alt="logo white" />
      </div>
      <div className="rights-links">
        <div className="rights-wrapper">
          <p className="rights">
            @ {new Date().getFullYear()} SOS Animals DZ. All rights reserved.
          </p>
          <p className="love">
            Made with{' '}
            <span role="img" aria-label="heart">
              💙
            </span>{' '}
            in{' '}
            <span role="img" aria-label="flag">
              🇩🇿
            </span>
          </p>
          <ul className="links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
