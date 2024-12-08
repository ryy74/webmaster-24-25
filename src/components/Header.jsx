import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
  return (
    <>
      <header className="app-header">
        <div className="left-header">
          <Link to="/" className="header-title">
            Green Bites
          </Link>
          <Link to="/menu" className="header-link">
            Menu
          </Link>
          <Link to="/values" className="header-link">
            Our Values
          </Link>
          <Link to="/nutrition" className="header-link">
            Nutrition
          </Link>
        </div>
        <div className="right-header">
          <Link to="/signin" className="header-link">
            Sign In
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;