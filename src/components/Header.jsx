import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 878);

  useEffect(() => {
    const handleResize = () => {
      const currentlyDesktop = window.innerWidth > 878;
      if (currentlyDesktop && !isDesktop) {
        setIsMenuOpen(false);
      }
      setIsDesktop(currentlyDesktop);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isDesktop]);

  return (
    <header className="app-header">
      <div className="left-header">
        <Link to="/" className="header-title">
          Green Bites
        </Link>
      </div>
      <div className="right-header">
        {isDesktop ? (
          <nav className="nav-links-desktop">
            <Link to="/menu" className="header-link">Menu</Link>
            <Link to="/values" className="header-link">Our Values</Link>
            <Link to="/nutrition" className="header-link">Nutrition</Link>
            <Link to="/signin" className="header-link">Sign In</Link>
          </nav>
        ) : (
          <>
            <div
              className={`hamburger ${isMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="bar bar1" />
              <span className="bar bar2" />
              <span className="bar bar3" />
            </div>
            <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
              <Link to="/menu" className="header-link">Menu</Link>
              <Link to="/values" className="header-link">Our Values</Link>
              <Link to="/nutrition" className="header-link">Nutrition</Link>
              <Link to="/signin" className="header-link">Sign In</Link>
            </nav>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
